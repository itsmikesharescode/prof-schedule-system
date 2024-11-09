import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addSchoolYearSchema } from './components/AddSchoolYear/schema';
import { fail } from '@sveltejs/kit';
import { updateSchoolYearSchema } from './components/UpdateSchoolYear/schema';
import { streamSchoolYear } from './db_calls/streamSchoolYear';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  return {
    addSchoolYearForm: await superValidate(zod(addSchoolYearSchema), { id: crypto.randomUUID() }),
    updateSchoolYearForm: await superValidate(zod(updateSchoolYearSchema), {
      id: crypto.randomUUID()
    }),
    streamSchoolYear: streamSchoolYear(supabase)
  };
};

export const actions: Actions = {
  addSchoolYearEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(addSchoolYearSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { error } = await supabase.from('school_years_tb').insert([
      {
        year: form.data.schoolYear,
        department: form.data.department
      }
    ]);

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Successfully added.' };
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

    const { error } = await supabase.from('school_years_tb').delete().eq('id', id);

    if (error) return fail(401, { msg: error.message });
    return { msg: 'Successfully deleted.' };
  }
};
