import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addProgramSchema } from './components/AddProgram/schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    addProgramForm: await superValidate(zod(addProgramSchema))
  };
};

export const actions: Actions = {
  addProgramEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(addProgramSchema));

    if (!form.valid) {
      return fail(400, { form });
    }
  }
};
