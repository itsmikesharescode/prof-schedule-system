import type { LayoutServerLoad } from './$types';
import { streamDepartments } from './(auxiliary_calls)/streamDepartments';

export const load: LayoutServerLoad = async ({
  locals: { safeGetSession, supabase, supabaseAdmin },
  cookies
}) => {
  const { session } = await safeGetSession();

  /* const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    'bba5a482-7415-483d-b8cf-e919008c9b01',
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
