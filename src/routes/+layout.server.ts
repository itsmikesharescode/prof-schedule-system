import type { LayoutServerLoad } from './$types';
import { streamDepartments } from './(auxiliary_calls)/streamDepartments';

export const load: LayoutServerLoad = async ({
  locals: { safeGetSession, supabase, supabaseAdmin },
  cookies
}) => {
  const { session } = await safeGetSession();

  /* const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    '3862b89e-96b0-4820-a7ce-7c1cd9df5c91',
    {
      user_metadata: {
        role: 'admin',
        email: 'localadmin@gmail.com',
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
