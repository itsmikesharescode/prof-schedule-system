import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addSubjectSchema } from './components/AddSubject/schema';
import { fail } from '@sveltejs/kit';
import { updateSubjectSchema } from './components/UpdateSubject/schema';

export const load: PageServerLoad = async () => {
  return {
    addSubjectForm: await superValidate(zod(addSubjectSchema), { id: crypto.randomUUID() }),
    updateSubjectForm: await superValidate(zod(updateSubjectSchema), {
      id: crypto.randomUUID()
    })
  };
};

export const actions: Actions = {
  addSubjectEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(addSubjectSchema));

    if (!form.valid) {
      return fail(400, { form });
    }
  },
  updateSubjectEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(updateSubjectSchema));

    if (!form.valid) {
      return fail(400, { form });
    }
  }
};
