import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addProfessorSchema } from './components/AddProfessor/schema';
import { fail } from '@sveltejs/kit';
import { updateProfessorSchema } from './components/UpdateProfessor/schema';

export const load: PageServerLoad = async () => {
  return {
    addProfessorForm: await superValidate(zod(addProfessorSchema)),
    updateProfessorForm: await superValidate(zod(updateProfessorSchema))
  };
};

export const actions: Actions = {
  addProfessorEvent: async ({ request, locals: { supabaseAdmin } }) => {
    const form = await superValidate(request, zod(addProfessorSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    console.log(form.data);
  },
  updateProfessorEvent: async ({ request, locals: { supabaseAdmin } }) => {
    const form = await superValidate(request, zod(updateProfessorSchema));

    if (!form.valid) {
      return fail(400, { form });
    }
  }
};
