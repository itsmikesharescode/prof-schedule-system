import { fail, superValidate, withFiles } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { loginSchema, signupSchema } from './components/Nav/components/schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
  return {
    loginForm: await superValidate(zod(loginSchema), { id: crypto.randomUUID() }),
    registerForm: await superValidate(zod(signupSchema), { id: crypto.randomUUID() })
  };
};

export const actions: Actions = {
  loginEvent: async ({ request }) => {
    const form = await superValidate(request, zod(loginSchema));

    if (!form.valid) {
      return fail(400, { form });
    }
  },
  registerEvent: async ({ request, fetch }) => {
    const form = await superValidate(request, zod(signupSchema));

    if (!form.valid) {
      return fail(400, withFiles({ form }));
    }

    const res = await fetch(form.data.photo);
    const blob = await res.blob();
    const file = new File([blob], 'photo.png', { type: 'image/png' });
  }
};
