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
    /* const { error } = await supabase.from('class_schedules_tb').insert([
      {
        professor_id: form.data.professor_id,
        school_year_id: parseInt(form.data.schoolYear.split(',')[1]),
        department_id: parseInt(form.data.department.split(',')[1]),
        section_id: parseInt(form.data.section.split(',')[1]),
        year_level_id: parseInt(form.data.yearLevel.split(',')[1]),
        subject_id: parseInt(form.data.subject.split(',')[1]),
        room_id: parseInt(form.data.room.split(',')[1]),
        semester: form.data.semester,
        day: form.data.day,
        initial_time: form.data.initial_time,
        final_time: form.data.final_time
      }
    ]); */

    const { error } = await supabase.rpc('add_class_schedules', {
      professor_id: form.data.professor_id,
      school_year_id: parseInt(form.data.schoolYear.split(',')[1]),
      department_id: parseInt(form.data.department.split(',')[1]),
      section_id: parseInt(form.data.section.split(',')[1]),
      year_level_id: parseInt(form.data.yearLevel.split(',')[1]),
      subject_id: parseInt(form.data.subject.split(',')[1]),
      room_id: parseInt(form.data.room.split(',')[1]),
      semester: form.data.semester,
      day: form.data.day,
      initial_time: form.data.initial_time,
      final_time: form.data.final_time
    });

    if (error) return fail(401, { form, msg: error.message });

    return { form, msg: 'Schedule added successfully' };
  },

  updateScheduleEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(updateScheduleSchema));

    if (!form.valid) return fail(400, { form });

    const { error } = await supabase
      .from('class_schedules_tb')
      .update({
        professor_id: form.data.professor_id,
        school_year_id: parseInt(form.data.schoolYear.split(',')[1]),
        department_id: parseInt(form.data.department.split(',')[1]),
        section_id: parseInt(form.data.section.split(',')[1]),
        year_level_id: parseInt(form.data.yearLevel.split(',')[1]),
        subject_id: parseInt(form.data.subject.split(',')[1]),
        room_id: parseInt(form.data.room.split(',')[1]),
        semester: form.data.semester,
        day: form.data.day,
        initial_time: form.data.initial_time,
        final_time: form.data.final_time
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
