import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { addScheduleSchema } from './components/AddSchedule/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { updateScheduleSchema } from './components/UpdateSchedule/schema';
import { streamClassSchedules } from '../(db_calls)/streamClassSchedules';

export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {
  return {
    addScheduleForm: await superValidate(zod(addScheduleSchema)),
    updateScheduleForm: await superValidate(zod(updateScheduleSchema)),
    streamClassSchedules: streamClassSchedules(supabase, url.searchParams.get('filter'))
  };
};

export const actions: Actions = {
  addScheduleEvent: async ({ request }) => {
    const form = await superValidate(request, zod(addScheduleSchema));
    console.log(form.data);
    if (!form.valid) return fail(400, { form });

    return { form };
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
