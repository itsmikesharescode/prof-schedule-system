import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addSectionSchema } from './components/AddSection/schema';
import { fail } from '@sveltejs/kit';
import { updateSectionSchema } from './components/UpdateSection/schema';
import { streamSections } from '../../(db_calls)/streamSections';

export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {
  return {
    addSectionForm: await superValidate(zod(addSectionSchema)),
    updateSectionForm: await superValidate(zod(updateSectionSchema)),
    sections: streamSections(supabase, url.searchParams.get('filter'))
  };
};

export const actions: Actions = {
  addSectionEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(addSectionSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { error } = await supabase.from('sections_tb').insert([
      {
        class: form.data.class,
        section_code: form.data.sectionCode,
        department: form.data.department
      }
    ]);

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Created successfully' };
  },
  updateSectionEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(updateSectionSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { error } = await supabase
      .from('sections_tb')
      .update({
        department: form.data.department,
        class: form.data.class,
        section_code: form.data.sectionCode
      })
      .eq('id', form.data.id);

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Updated successfully' };
  },

  deleteSectionEvent: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const id = formData.get('id');

    const { error } = await supabase.from('sections_tb').delete().eq('id', id);

    if (error) return fail(401, { msg: error.message });
    return { msg: 'Deleted successfully' };
  }
};
