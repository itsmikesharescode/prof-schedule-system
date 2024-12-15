import type { Actions, PageServerLoad } from './$types';
import streamRequests from '../(db_calls)/streamRequest';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { updateRequestStatusSchema } from './components/UpdateRequestStatus/schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	return {
		updateRequestStatusForm: await superValidate(zod(updateRequestStatusSchema)),
		getRequests: streamRequests(supabase)
	};
};

export const actions: Actions = {
	updateRequestStatusEvent: async ({ locals: { supabaseAdmin }, request }) => {
		const form = await superValidate(request, zod(updateRequestStatusSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { error } = await supabaseAdmin
			.from('requests_tb')
			.update({
				status: form.data.status
			})
			.eq('id', form.data.id);

		if (error) return fail(401, { form, msg: error.message });

		const { error: updateUserErr } = await supabaseAdmin.auth.admin.updateUserById(
			form.data.user_id,
			{
				user_metadata: {
					schedule: form.data.newSched
				}
			}
		);

		if (updateUserErr) return fail(401, { form, msg: updateUserErr.message });

		return { form, msg: 'Request approved successfully' };
	},
	deleteRequestEvent: async ({ locals: { supabase }, request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		const { error } = await supabase.from('requests_tb').delete().eq('id', Number(id));

		if (error) return fail(401, { msg: error.message });
		return { msg: 'Request deleted successfully' };
	}
};
