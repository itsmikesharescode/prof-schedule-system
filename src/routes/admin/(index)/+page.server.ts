import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addProgramSchema } from './components/AddProgram/schema';
import { fail } from '@sveltejs/kit';
import { updateProgramSchema } from './components/UpdateProgram/schema';

export const load: PageServerLoad = async () => {
  return {
    addProgramForm: await superValidate(zod(addProgramSchema)),
    updateProgramForm: await superValidate(zod(updateProgramSchema))
  };
};

export const actions: Actions = {
  addProgramEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(addProgramSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { error } = await supabase.from('programs_tb').insert([
      {
        name: form.data.department,
        description: form.data.description,
        head: form.data.programHead
      }
    ]);

    if (error) {
      return fail(401, { form, msg: error.message });
    }
    return { form, msg: 'Program added successfully' };
  },
  updateProgramEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(updateProgramSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { error } = await supabase
      .from('programs_tb')
      .update({
        name: form.data.department,
        description: form.data.description,
        head: form.data.programHead
      })
      .eq('id', form.data.id);

    if (error) {
      return fail(401, { form, msg: error.message });
    }
    return { form, msg: 'Program updated successfully' };
  },
  deleteProgramEvent: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    const { error } = await supabase.from('programs_tb').delete().eq('id', id);

    if (error) {
      return fail(401, { msg: error.message });
    }
    return { msg: 'Program deleted successfully' };
  }
};
