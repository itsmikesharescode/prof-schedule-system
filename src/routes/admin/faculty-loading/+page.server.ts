import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addFacultySchema } from './components/AddFaculty/schema';
import { fail } from '@sveltejs/kit';
import { updateFacultySchema } from './components/UpdateFaculty/schema';
import { streamClassSchedules } from '../(db_calls)/streamClassSchedules';
import { streamProfessors } from '../(db_calls)/streamProfessors';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  return {
    addFacultyForm: await superValidate(zod(addFacultySchema), { id: crypto.randomUUID() }),
    updateFacultyForm: await superValidate(zod(updateFacultySchema), { id: crypto.randomUUID() }),
    getClassSchedules: await streamClassSchedules(supabase, null),
    getProfessors: await streamProfessors(supabase, null)
  };
};

export const actions: Actions = {
  addFaculty: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(addFacultySchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { error } = await supabase.from('faculties_tb').insert([
      {
        professor_id: form.data.user_id,
        schedule_id: Number(form.data.schedule_id)
      }
    ]);

    if (error) {
      return fail(401, { form, msg: error.message });
    }

    return { form, msg: 'Faculty added successfully' };
  },
  updateFaculty: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(updateFacultySchema));

    if (!form.valid) {
      return fail(400, { form });
    }
  }
};
