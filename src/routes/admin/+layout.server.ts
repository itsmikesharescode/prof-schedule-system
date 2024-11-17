import type { LayoutServerLoad } from './$types';
import { streamRooms } from '../(auxiliary_calls)/streamRooms';
import { streamSchoolYears } from '../(auxiliary_calls)/streamSchoolYears';
import { streamSections } from '../(auxiliary_calls)/streamSections';
import { streamYearLevels } from '../(auxiliary_calls)/streamYearLevels';
import { streamSubjects } from '../(auxiliary_calls)/streamSubjects';

export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {
  return {
    streamRooms: streamRooms(supabase),
    streamSchoolYears: streamSchoolYears(supabase),
    streamSections: streamSections(supabase),
    streamYearLevels: streamYearLevels(supabase),
    streamSubjects: streamSubjects(supabase)
  };
};
