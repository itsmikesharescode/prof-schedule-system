import { fail, superValidate, withFiles } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';

import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from './components/Nav/components/Login/schema';
import { registerSchema } from './components/Nav/components/Register/schema';

export const load: PageServerLoad = async () => {
  return {
    loginForm: await superValidate(zod(loginSchema), { id: crypto.randomUUID() }),
    registerForm: await superValidate(zod(registerSchema), { id: crypto.randomUUID() })
  };
};

export const actions: Actions = {
  loginEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(loginSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.data.email,
      password: form.data.password
    });

    if (error) {
      return fail(401, { form, msg: error.message });
    } else if (data.user) {
      return { form, msg: `Welcome back! ${data.user.user_metadata.firstName}` };
    }

    return fail(401, { form, msg: 'Something went wrong' });
  },

  registerEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(registerSchema));

    if (!form.valid) {
      return fail(400, withFiles({ form }));
    }

    const { data: uploadRes, error: uploadError } = await supabase.storage
      .from('user_photos')
      .upload(crypto.randomUUID(), form.data.photo);

    if (uploadError) {
      return withFiles({ form, msg: uploadError.message });
    }

    const {
      data: { user },
      error
    } = await supabase.auth.signUp({
      email: form.data.email,
      password: form.data.password,
      options: {
        data: {
          approve: false,
          role: 'professor',
          photo: uploadRes.fullPath,
          email: form.data.email,
          title: form.data.title,
          firstName: form.data.firstName,
          middleName: form.data.middleName,
          lastName: form.data.lastName,
          previousSchool: form.data.previousSchool,
          yearsOfTeaching: form.data.yearsOfTeaching,
          department: form.data.department,
          availability: form.data.availability,
          interests: form.data.interests,
          schedule: {
            day: form.data.day,
            startTime: form.data.startTime,
            endTime: form.data.endTime
          }
        }
      }
    });

    if (error) return fail(401, withFiles({ form, msg: error.message }));
    else if (user) return withFiles({ form, msg: `Welcome! ${user.user_metadata.firstName}` });
    return fail(401, withFiles({ form, msg: 'Something went wrong' }));
  }
};
