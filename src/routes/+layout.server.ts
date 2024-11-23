import type { LayoutServerLoad } from './$types';
import { streamDepartments } from './(auxiliary_calls)/streamDepartments';

export const load: LayoutServerLoad = async ({
  locals: { safeGetSession, supabase, supabaseAdmin },
  cookies
}) => {
  const { session } = await safeGetSession();

  /* const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    '2e909eeb-ad01-4078-80b8-c3eea939b4ed',
    {
      user_metadata: {
        role: 'admin',
        email: 'localadmin@gmail.com'
      }
    }
  );
  console.log(data, error?.message); */
  return {
    session,
    cookies: cookies.getAll(),
    streamDepartments: streamDepartments(supabase)
  };
};
