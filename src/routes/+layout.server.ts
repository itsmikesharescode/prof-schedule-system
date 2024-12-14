import type { LayoutServerLoad } from './$types';
import { streamDepartments } from './(auxiliary_calls)/streamDepartments';

export const load: LayoutServerLoad = async ({
  locals: { safeGetSession, supabase, supabaseAdmin },
  cookies
}) => {
  const { session } = await safeGetSession();

  /* const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    '9da98af9-7dbe-4e41-b25c-185af1235ba6',
    {
      user_metadata: {
        role: 'admin',
        email: 'localadmin@gmail.com',
        firstName: 'Mike',
        middleName: 'Local',
        lastName: 'Admin'
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
