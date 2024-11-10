import type { LayoutServerLoad } from './$types';
import { streamDepartments } from './(auxiliary_calls)/streamDepartments';

export const load: LayoutServerLoad = async ({ locals: { safeGetSession, supabase }, cookies }) => {
  const { session } = await safeGetSession();
  return {
    session,
    cookies: cookies.getAll(),
    streamDepartments: streamDepartments(supabase)
  };
};
