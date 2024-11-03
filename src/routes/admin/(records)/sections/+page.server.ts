import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addSectionSchema } from './components/AddSection/schema';
import { fail } from '@sveltejs/kit';
import { updateSectionSchema } from './components/UpdateSection/schema';

export const load: PageServerLoad = async () => {
  return {
    addSectionForm: await superValidate(zod(addSectionSchema), { id: crypto.randomUUID() }),
    updateSectionForm: await superValidate(zod(updateSectionSchema), {
      id: crypto.randomUUID()
    })
  };
};

export const actions: Actions = {
  addSectionEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(addSectionSchema));

    if (!form.valid) {
      return fail(400, { form });
    }
  },
  updateSectionEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(updateSectionSchema));

    if (!form.valid) {
      return fail(400, { form });
    }
  }
};
