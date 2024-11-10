import { superValidate, withFiles } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addProfessorSchema } from './components/AddProfessor/schema';
import { fail } from '@sveltejs/kit';
import { updateProfessorSchema } from './components/UpdateProfessor/schema';
import { streamProfessors } from '../(db_calls)/streamProfessors';
export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {
  return {
    addProfessorForm: await superValidate(zod(addProfessorSchema)),
    updateProfessorForm: await superValidate(zod(updateProfessorSchema)),
    streamProfessors: streamProfessors(supabase, url.searchParams.get('filter'))
  };
};

export const actions: Actions = {
  addProfessorEvent: async ({ request, locals: { supabaseAdmin, transformImage } }) => {
    const form = await superValidate(request, zod(addProfessorSchema));

    if (!form.valid) {
      return fail(400, withFiles({ form }));
    }

    const res = await transformImage(form.data.photo, {});

    if (!res) return fail(401, { form, msg: 'There is a problem processing your photo.' });
    const uuid = crypto.randomUUID();
    const { data: storageRes, error: uploadErr } = await supabaseAdmin.storage
      .from('profile_bucket')
      .upload(uuid, res);

    if (uploadErr) return fail(401, withFiles({ form, msg: uploadErr.message }));

    const { error: insertErr } = await supabaseAdmin.auth.admin.createUser({
      email: form.data.email,
      password: form.data.password,
      email_confirm: true,
      user_metadata: {
        approved: true,
        email: form.data.email,
        role: form.data.position,
        avatar: storageRes.fullPath,
        firstName: form.data.firstName,
        middleName: form.data.middleName,
        lastName: form.data.lastName,
        department: form.data.department,
        preferredSchedule: {
          day: form.data.day,
          startTime: form.data.startTime,
          endTime: form.data.endTime,
          available: form.data.availability
        },
        interests: form.data.interests
      }
    });

    if (insertErr) return fail(401, withFiles({ form, msg: insertErr.message }));
    return withFiles({ form, msg: 'Professor added successfully' });
  },
  updateProfessorEvent: async ({ request, locals: { supabaseAdmin } }) => {
    const form = await superValidate(request, zod(updateProfessorSchema));

    if (!form.valid) {
      return fail(400, { form });
    }
  }
};
