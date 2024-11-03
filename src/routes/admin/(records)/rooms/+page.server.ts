import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addRoomSchema } from './components/AddRoom/schema';
import { fail } from '@sveltejs/kit';
import { updateRoomSchema } from './components/UpdateRoom/schema';

export const load: PageServerLoad = async () => {
  return {
    addRoomForm: await superValidate(zod(addRoomSchema), { id: crypto.randomUUID() }),
    updateRoomForm: await superValidate(zod(updateRoomSchema), {
      id: crypto.randomUUID()
    })
  };
};

export const actions: Actions = {
  addRoomEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(addRoomSchema));

    if (!form.valid) {
      return fail(400, { form });
    }
  },
  updateRoomEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(updateRoomSchema));

    if (!form.valid) {
      return fail(400, { form });
    }
  }
};
