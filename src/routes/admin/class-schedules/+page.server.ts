import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { addScheduleSchema } from './components/AddSchedule/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { updateScheduleSchema } from './components/UpdateSchedule/schema';

export const load: PageServerLoad = async () => {
  return {
    addScheduleForm: await superValidate(zod(addScheduleSchema), { id: crypto.randomUUID() }),
    updateScheduleForm: await superValidate(zod(updateScheduleSchema), {
      id: crypto.randomUUID()
    })
  };
};

export const actions: Actions = {
  addScheduleEvent: async ({ request }) => {
    const form = await superValidate(request, zod(addScheduleSchema));

    if (!form.valid) return fail(400, { form });
    console.log(form.data);
  },

  updateScheduleEvent: async ({ request }) => {
    const form = await superValidate(request, zod(updateScheduleSchema));

    if (!form.valid) return fail(400, { form });
    console.log(form.data);
  },

  deleteScheduleEvent: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    console.log(id);
  }
};
