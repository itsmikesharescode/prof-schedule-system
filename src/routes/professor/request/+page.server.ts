import type { PageServerLoad } from './$types';
import streamRequest from '../(db_calls)/streamRequest';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createRequestSchema } from './components/CreateRequest/schema';
import { fail, type Actions } from '@sveltejs/kit';
import { updateRequestSchema } from './components/UpdateRequest/schema';
import { generateReferenceId } from '$lib';

export const load: PageServerLoad = async ({ locals: { supabase, user } }) => {
  return {
    createRequestForm: await superValidate(zod(createRequestSchema)),
    updateRequestForm: await superValidate(zod(updateRequestSchema)),
    getRequest: streamRequest(supabase, user?.id ?? '')
  };
};

export const actions: Actions = {
  addRequestEvent: async ({ request, locals: { supabase, user } }) => {
    const form = await superValidate(request, zod(createRequestSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { error } = await supabase.from('requests_tb').insert({
      professor_id: user?.id ?? '',
      reference_id: generateReferenceId(),
      schedule: {
        days: form.data.days[0].split(','),
        startTime: form.data.start_time,
        endTime: form.data.end_time,
        available: form.data.availability
      },
      reason: form.data.reason
    });

    if (error) {
      return fail(401, { form, msg: error.message });
    }

    return { form, msg: 'Request created successfully' };
  },

  updateRequestEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(updateRequestSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { error } = await supabase
      .from('requests_tb')
      .update({
        schedule: {
          days: form.data.days[0].split(','),
          startTime: form.data.start_time,
          endTime: form.data.end_time,
          available: form.data.availability
        },
        reason: form.data.reason
      })
      .eq('id', form.data.id);

    if (error) {
      return fail(401, { form, msg: error.message });
    }

    return { form, msg: 'Request updated successfully' };
  },

  deleteRequestEvent: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    const { error } = await supabase.from('requests_tb').delete().eq('id', Number(id));

    if (error) {
      return fail(401, { msg: error.message });
    }

    return { msg: 'Request deleted successfully' };
  }
};
