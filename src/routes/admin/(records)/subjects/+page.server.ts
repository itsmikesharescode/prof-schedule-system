import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addSubjectSchema } from './components/AddSubject/schema';
import { fail } from '@sveltejs/kit';
import { updateSubjectSchema } from './components/UpdateSubject/schema';
import { streamSubjects } from './db_calls/streamSubjects';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  return {
    addSubjectForm: await superValidate(zod(addSubjectSchema), { id: crypto.randomUUID() }),
    updateSubjectForm: await superValidate(zod(updateSubjectSchema), {
      id: crypto.randomUUID()
    }),
    subjects: streamSubjects(supabase)
  };
};

export const actions: Actions = {
  addSubjectEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(addSubjectSchema));
    console.log(form.data);
    if (!form.valid) {
      return fail(400, { form });
    }

    const { error } = await supabase.from('subjects_tb').insert([
      {
        name: form.data.subjectName,
        code: form.data.subjectCode,
        unit: form.data.unit,
        department: form.data.department
      }
    ]);
    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Added successfully' };
  },
  updateSubjectEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(updateSubjectSchema));

    if (!form.valid) {
      return fail(400, { form });
    }
  }
};
