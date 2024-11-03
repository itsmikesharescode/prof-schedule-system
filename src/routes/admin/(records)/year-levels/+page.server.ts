import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addYearLevelSchema } from './components/AddYearLevel/schema';
import { fail } from '@sveltejs/kit';
import { updateYearLevelSchema } from './components/UpdateYearLevel/schema';

export const load: PageServerLoad = async () => {
  return {
    addYearLevelForm: await superValidate(zod(addYearLevelSchema), { id: crypto.randomUUID() }),
    updateYearLevelForm: await superValidate(zod(updateYearLevelSchema), {
      id: crypto.randomUUID()
    })
  };
};

export const actions: Actions = {
  addSchoolYearEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(addYearLevelSchema));

    if (!form.valid) {
      return fail(400, { form });
    }
  },
  updateSchoolYearEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(updateYearLevelSchema));

    if (!form.valid) {
      return fail(400, { form });
    }
  }
};
