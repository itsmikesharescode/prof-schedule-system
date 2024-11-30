import type { Actions, PageServerLoad } from './$types';
import streamRequests from '../(db_calls)/streamRequest';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  return {
    getRequests: streamRequests(supabase)
  };
};

export const actions: Actions = {
  updateRequestEvent: async ({ locals: { supabase } }) => {},
  deleteRequestEvent: async ({ locals: { supabase } }) => {}
};
