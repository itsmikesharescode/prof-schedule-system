import type { PageServerLoad } from './$types';
import streamRequest from '../(db_calls)/streamRequest';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createRequestSchema } from './components/CreateRequest/schema';
import { fail, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals: { supabase, user } }) => {
  return {
    createRequestForm: await superValidate(zod(createRequestSchema)),
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
      schedule: {
        day: form.data.day,
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
  }
};
