import { createServerClient } from '@supabase/ssr';
import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { PRIVATE_SUPABASE_ADMIN_KEY } from '$env/static/private';
import sharp from 'sharp';

const supabase: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),

      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' });
        });
      }
    }
  });

  event.locals.supabaseAdmin = createServerClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_ADMIN_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),

      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' });
        });
      }
    }
  });

  event.locals.safeGetSession = async () => {
    const {
      data: { session }
    } = await event.locals.supabase.auth.getSession();
    if (!session) {
      return { session: null, user: null };
    }

    const {
      data: { user },
      error
    } = await event.locals.supabase.auth.getUser();
    if (error) {
      return { session: null, user: null };
    }

    return { session, user };
  };

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-api-version';
    }
  });
};

const authGuard: Handle = async ({ event, resolve }) => {
  const { session, user } = await event.locals.safeGetSession();
  event.locals.session = session;
  event.locals.user = user;

  const path = event.url.pathname;

  //no auth checks
  if (!user && path.startsWith('/admin')) {
    redirect(303, '/?msg="no-session"');
  }

  if (!user && path.startsWith('/program-head')) {
    redirect(303, '/?msg="no-session"');
  }

  if (!user && path.startsWith('/professor')) {
    redirect(303, '/?msg="no-session"');
  }

  //auth checks
  if (user && path.startsWith('/admin')) {
    const { role } = user.user_metadata;
    if (role !== 'admin') redirect(303, '/');
  }

  if (user && path.startsWith('/program-head')) {
    const { role } = user.user_metadata;
    if (role !== 'program-head') redirect(303, '/');
  }

  if (user && path.startsWith('/professor')) {
    const { role } = user.user_metadata;
    if (role !== 'professor') redirect(303, '/');
  }

  if (user && path === '/') {
    const { role } = user.user_metadata;
    if (role === 'admin') redirect(303, '/admin');
    if (role === 'program-head') redirect(303, '/program-head');
    if (role === 'professor') redirect(303, '/professor');
  }

  return resolve(event);
};

const auxilary: Handle = async ({ event, resolve }) => {
  event.locals.transformImage = async (file, options) => {
    const { maxSizeInMB = 1, maxWidth = 1280, maxHeight = 720, quality = 80 } = options;

    const buffer = Buffer.from(await file.arrayBuffer());
    let processedImage = await sharp(buffer)
      .resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .avif({
        quality,
        effort: 6
      })
      .toBuffer();

    // If image is still larger than maxSize, reduce quality until it fits
    let currentQuality = quality;
    while (processedImage.length > maxSizeInMB * 1024 * 1024 && currentQuality > 20) {
      currentQuality -= 10;
      processedImage = await sharp(buffer)
        .resize(maxWidth, maxHeight, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .avif({
          quality: currentQuality,
          effort: 9
        })
        .toBuffer();
    }

    return new File([processedImage], file.name.replace(/\.[^/.]+$/, '.avif'), {
      type: 'image/avif'
    });
  };

  return resolve(event);
};

export const handle: Handle = sequence(supabase, authGuard, auxilary);
