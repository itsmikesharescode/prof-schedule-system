import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addSectionSchema } from './components/AddSection/schema';
import { fail } from '@sveltejs/kit';
import { updateSectionSchema } from './components/UpdateSection/schema';
import { streamSections } from './db_calls/streamSchoolYear';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  return {
    addSectionForm: await superValidate(zod(addSectionSchema)),
    updateSectionForm: await superValidate(zod(updateSectionSchema)),
    sections: streamSections(supabase)
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
  }
};
