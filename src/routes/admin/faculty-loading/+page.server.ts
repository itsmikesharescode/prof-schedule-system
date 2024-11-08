import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addFacultySchema } from './components/AddFaculty/schema';
import { fail } from '@sveltejs/kit';
import { updateFacultySchema } from './components/UpdateFaculty/schema';

export const load: PageServerLoad = async () => {
  return {
    addFacultyForm: await superValidate(zod(addFacultySchema), { id: crypto.randomUUID() }),
    updateFacultyForm: await superValidate(zod(updateFacultySchema), { id: crypto.randomUUID() })
  };
};

export const actions: Actions = {
  addProgramEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(addFacultySchema));

    if (!form.valid) {
      return fail(400, { form });
    }
  },
  updateProgramEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(updateFacultySchema));

    if (!form.valid) {
      return fail(400, { form });
    }
  }
};
