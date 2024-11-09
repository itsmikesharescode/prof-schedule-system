import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addYearLevelSchema } from './components/AddYearLevel/schema';
import { fail } from '@sveltejs/kit';
import { updateYearLevelSchema } from './components/UpdateYearLevel/schema';
import { streamYearLevels } from '../../(db_calls)/streamYearLevels';

export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {
  return {
    addYearLevelForm: await superValidate(zod(addYearLevelSchema)),
    updateYearLevelForm: await superValidate(zod(updateYearLevelSchema)),
    yearLevels: streamYearLevels(supabase, url.searchParams.get('filter'))
  };
};

export const actions: Actions = {
  addYearLevelEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(addYearLevelSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { error } = await supabase.from('year_levels_tb').insert([
      {
        levels: form.data.yearLevels,
        department: form.data.department
      }
    ]);

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Successfully added.' };
  },
  updateYearLevelEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(updateYearLevelSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { error } = await supabase
      .from('year_levels_tb')
      .update({
        levels: form.data.yearLevels,
        department: form.data.department
      })
      .eq('id', form.data.id);

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Successfully updated.' };
  },
  deleteYearLevelEvent: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    const { error } = await supabase.from('year_levels_tb').delete().eq('id', id);

    if (error) return fail(401, { msg: error.message });
    return { msg: 'Successfully deleted.' };
  }
};
