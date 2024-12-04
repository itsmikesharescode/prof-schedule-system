import type { LayoutServerLoad } from './$types';
import { streamDepartments } from './(auxiliary_calls)/streamDepartments';

export const load: LayoutServerLoad = async ({
  locals: { safeGetSession, supabase, supabaseAdmin },
  cookies
}) => {
  const { session } = await safeGetSession();

  /* const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    '9b1851f4-004f-44f2-9951-2ea7fc36d9a7',
    {
      user_metadata: {
        role: 'admin',
        email: 'systemadmin@gmail.com',
        firstName: 'March Alexis',
        middleName: '',
        lastName: 'Floralde'
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
