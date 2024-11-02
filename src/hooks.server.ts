import { createServerClient } from '@supabase/ssr';
import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

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

export const handle: Handle = sequence(supabase, authGuard);
