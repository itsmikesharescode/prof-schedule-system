import type { PageServerLoad } from './$types';
import streamSchedules from '../(db_calls)/streamSchedules';

export const load: PageServerLoad = async ({ locals: { supabase, user } }) => {
  return {
    getSchedules: streamSchedules(supabase, user?.id ?? '')
  };
};
