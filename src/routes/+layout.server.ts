import type { LayoutServerLoad } from './$types';
import { streamDepartments } from './(auxiliary_calls)/streamDepartments';

export const load: LayoutServerLoad = async ({
  locals: { safeGetSession, supabase, supabaseAdmin },
  cookies
}) => {
  const { session } = await safeGetSession();

  /*  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    '01ffc919-7bb5-4a32-95be-22b868d55a54',
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
