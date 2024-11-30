import { superValidate, withFiles } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { updateProfileSchema } from './components/UpdateProfile/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    updateProfileForm: await superValidate(zod(updateProfileSchema))
  };
};

export const actions: Actions = {
  updateProfileEvent: async ({ request, locals: { supabase, user, transformImage } }) => {
    const form = await superValidate(request, zod(updateProfileSchema));

    const res = await transformImage(form.data.photo, {});

    if (!res)
      return fail(401, withFiles({ form, msg: 'There is a problem processing your photo.' }));

    if (!form.valid) {
      return fail(400, withFiles(form));
    }

    const { data: storageRes, error: updateErr } = await supabase.storage
      .from('profile_bucket')
      .update(form.data.photoPath.split('/')[1], res, {
        upsert: true
      });

    if (updateErr) return fail(401, withFiles({ form, msg: updateErr.message }));

    const { error: updateUserErr } = await supabase.auth.updateUser({
      data: {
        avatar: storageRes.fullPath
      }
    });

    if (updateUserErr) return fail(401, withFiles({ form, msg: updateUserErr.message }));

    return withFiles({ form, msg: 'Profile updated successfully.' });
  }
};
