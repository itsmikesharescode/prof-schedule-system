import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addSchoolYearSchema } from './components/AddSchoolYear/schema';
import { fail } from '@sveltejs/kit';
import { updateSchoolYearSchema } from './components/UpdateSchoolYear/schema';

export const load: PageServerLoad = async () => {
  return {
    addSchoolYearForm: await superValidate(zod(addSchoolYearSchema), { id: crypto.randomUUID() }),
    updateSchoolYearForm: await superValidate(zod(updateSchoolYearSchema), {
      id: crypto.randomUUID()
    })
  };
};

export const actions: Actions = {
  addSchoolYearEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(addSchoolYearSchema));

    if (!form.valid) {
      return fail(400, { form });
    }
  },
  updateSchoolYearEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(updateSchoolYearSchema));

    if (!form.valid) {
      return fail(400, { form });
    }
  },

  deleteSchoolYearEvent: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;
  }
};
