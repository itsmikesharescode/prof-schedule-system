import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addRoomSchema } from './components/AddRoom/schema';
import { fail } from '@sveltejs/kit';
import { updateRoomSchema } from './components/UpdateRoom/schema';
import { streamRooms } from './db_calls/streamRooms';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  return {
    addRoomForm: await superValidate(zod(addRoomSchema), { id: crypto.randomUUID() }),
    updateRoomForm: await superValidate(zod(updateRoomSchema), {
      id: crypto.randomUUID()
    }),
    streamRooms: streamRooms(supabase)
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
        department: form.data.department,
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
  }
};
