import type { PageServerLoad } from './$types';
import streamRequest from '../(db_calls)/streamRequest';

export const load: PageServerLoad = async ({ locals: { supabase, user } }) => {
  return {
    getRequest: streamRequest(supabase, user?.id ?? '')
  };
};
