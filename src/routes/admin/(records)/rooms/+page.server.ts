import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addRoomSchema } from './components/AddRoom/schema';
import { fail } from '@sveltejs/kit';
import { updateRoomSchema } from './components/UpdateRoom/schema';
import { streamRooms } from '../../(db_calls)/streamRooms';

export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {
  return {
    addRoomForm: await superValidate(zod(addRoomSchema), { id: crypto.randomUUID() }),
    updateRoomForm: await superValidate(zod(updateRoomSchema), {
      id: crypto.randomUUID()
    }),
    streamRooms: streamRooms(supabase, url.searchParams.get('filter'))
  };
};

export const actions: Actions = {
  addRoomEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(addRoomSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { error } = await supabase.from('rooms_tb').insert([
      {
        code: form.data.roomCode,
        type: form.data.roomType,
        department_id: parseInt(form.data.department.split(',')[1]), // hacky way to get the department id
        number: form.data.roomNumber
      }
    ]);
    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Added successfully' };
  },
  updateRoomEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(updateRoomSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { error } = await supabase
      .from('rooms_tb')
      .update({
        department_id: parseInt(form.data.department.split(',')[1]), // hacky way to get the department id
        type: form.data.roomType,
        number: form.data.roomNumber,
        code: form.data.roomCode
      })
      .eq('id', form.data.id);
    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Updated successfully' };
  },

  deleteRoomEvent: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    const { error } = await supabase.from('rooms_tb').delete().eq('id', Number(id));
    if (error) return fail(401, { msg: error.message });
    return { msg: 'Deleted successfully' };
  }
};
