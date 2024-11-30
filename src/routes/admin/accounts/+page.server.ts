import { superValidate, withFiles } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addProfessorSchema } from './components/AddProfessor/schema';
import { fail } from '@sveltejs/kit';
import { updateProfessorSchema } from './components/UpdateProfessor/schema';
import { streamProfessors } from '../(db_calls)/streamProfessors';
import { updateStatusSchema } from './components/UpdateStatus/schema';

export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {
  return {
    addProfessorForm: await superValidate(zod(addProfessorSchema)),
    updateProfessorStatusForm: await superValidate(zod(updateStatusSchema)),
    updateProfessorForm: await superValidate(zod(updateProfessorSchema)),
    updateStatusForm: await superValidate(zod(updateStatusSchema)),
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
        title: form.data.title,
        firstName: form.data.firstName,
        middleName: form.data.middleName,
        lastName: form.data.lastName,
        department: form.data.department,
        previousSchool: form.data.previousSchool,
        yearsInService: form.data.yearsOfTeaching,
        schedule: {
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
  updateProfessorEvent: async ({ request, locals: { supabaseAdmin, transformImage } }) => {
    const form = await superValidate(request, zod(updateProfessorSchema));

    if (!form.valid) {
      return fail(400, withFiles({ form }));
    }

    const res = await transformImage(form.data.photo, {});

    if (!res)
      return fail(401, withFiles({ form, msg: 'There is a problem processing your photo.' }));

    const { data: storageRes, error: updateErr } = await supabaseAdmin.storage
      .from('profile_bucket')
      .update(form.data.photoPath.split('/')[1], res, {
        upsert: true
      });

    if (updateErr) return fail(401, withFiles({ form, msg: updateErr.message }));

    const { error: updateUserErr } = await supabaseAdmin.auth.admin.updateUserById(
      form.data.userId,
      {
        email: form.data.email,
        password: form.data.password,
        user_metadata: {
          avatar: storageRes.fullPath,
          email: form.data.email,
          role: form.data.position,
          title: form.data.title,
          firstName: form.data.firstName,
          middleName: form.data.middleName,
          lastName: form.data.lastName,
          department: form.data.department,
          previousSchool: form.data.previousSchool,
          yearsInService: form.data.yearsOfTeaching,
          preferredSchedule: {
            day: form.data.day,
            startTime: form.data.startTime,
            endTime: form.data.endTime,
            available: form.data.availability
          },
          interests: form.data.interests
        }
      }
    );

    if (updateUserErr) return fail(401, withFiles({ form, msg: updateUserErr.message }));
    return withFiles({ form, msg: 'Professor updated successfully' });
  },

  updateProfessorStatusEvent: async ({ request, locals: { supabaseAdmin } }) => {
    const form = await superValidate(request, zod(updateStatusSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { error } = await supabaseAdmin.auth.admin.updateUserById(form.data.userId, {
      user_metadata: {
        approved: form.data.status === 'Active' ? true : false
      }
    });

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Status updated successfully' };
  },

  updateStatusEvent: async ({ request, locals: { supabaseAdmin } }) => {
    const form = await superValidate(request, zod(updateStatusSchema));

    if (!form.valid) {
      return fail(400, withFiles({ form }));
    }

    const { error } = await supabaseAdmin.auth.admin.updateUserById(form.data.userId, {
      user_metadata: {
        approved: form.data.status === 'Active' ? true : false
      }
    });

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Status updated successfully' };
  },

  deleteProfessorEvent: async ({ request, locals: { supabaseAdmin } }) => {
    const formData = await request.formData();
    const userId = formData.get('userId') as string;
    const photoPath = formData.get('photoPath') as string;

    const { error: deleteErr } = await supabaseAdmin.storage
      .from('profile_bucket')
      .remove([photoPath.split('/')[1]]);

    if (deleteErr) return fail(401, { msg: deleteErr.message });

    const { error: deleteUserErr } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteUserErr) return fail(401, { msg: deleteUserErr.message });
    return { msg: 'Professor deleted successfully' };
  }
};
