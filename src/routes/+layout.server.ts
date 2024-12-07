import type { LayoutServerLoad } from './$types';
import { streamDepartments } from './(auxiliary_calls)/streamDepartments';

export const load: LayoutServerLoad = async ({
  locals: { safeGetSession, supabase, supabaseAdmin },
  cookies
}) => {
  const { session } = await safeGetSession();

  /*  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    '284c593f-0fbf-4798-9781-02d8aab0da3a',
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
