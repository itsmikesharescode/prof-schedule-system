import type { LayoutServerLoad } from './$types';
import { streamDepartments } from './(auxiliary_calls)/streamDepartments';

export const load: LayoutServerLoad = async ({
  locals: { safeGetSession, supabase, supabaseAdmin },
  cookies
}) => {
  const { session } = await safeGetSession();

  /* const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    'e854cfe2-280c-43f7-94e8-f5b9f9356d6b',
    {
      user_metadata: {
        role: 'admin',
        email: 'admin@gmail.com',
        firstName: 'Admin',
        middleName: 'Admin',
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
