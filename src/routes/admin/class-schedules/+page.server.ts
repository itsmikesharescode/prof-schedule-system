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
  addScheduleEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(addScheduleSchema));
    if (!form.valid) return fail(400, { form });
    const { error } = await supabase.from('class_schedules_tb').insert([
      {
        school_year: form.data.schoolYear,
        department: form.data.department,
        section: form.data.section,
        year_level: form.data.yearLevel,
        semester: form.data.semester,
        subject: form.data.subject,
        room: form.data.room,
        day: form.data.day,
        start_time: form.data.start_time,
        end_time: form.data.end_time
      }
    ]);

    if (error) return fail(401, { form, msg: error.message });

    return { form, msg: 'Schedule added successfully' };
  },

  updateScheduleEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(updateScheduleSchema));

    if (!form.valid) return fail(400, { form });

    const { error } = await supabase
      .from('class_schedules_tb')
      .update({
        school_year: form.data.schoolYear,
        department: form.data.department,
        section: form.data.section,
        year_level: form.data.yearLevel,
        semester: form.data.semester,
        subjects: form.data.subjects
      })
      .eq('id', form.data.id);

    if (error) return fail(401, { form, msg: error.message });

    return { form, msg: 'Schedule updated successfully' };
  },

  deleteScheduleEvent: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    const { error } = await supabase.from('class_schedules_tb').delete().eq('id', Number(id));

    if (error) return fail(401, { msg: error.message });

    return { msg: 'Schedule deleted successfully' };
  }
};
