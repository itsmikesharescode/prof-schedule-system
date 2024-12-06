import type { Database } from '$lib/database.types';

type Department = Database['public']['Tables']['programs_tb']['Row'];
type Room = Database['public']['Tables']['rooms_tb']['Row'];
type SchoolYear = Database['public']['Tables']['school_years_tb']['Row'];
type Section = Database['public']['Tables']['sections_tb']['Row'];
type Subject = Database['public']['Tables']['subjects_tb']['Row'];
type YearLevel = Database['public']['Tables']['year_levels_tb']['Row'];
class AuxiliaryState {
  //populate here in the future use, if it needs more dynamic fields
  #departments = $state<Department[] | null>(null);

  setDepartments(p: Department[] | null) {
    this.#departments = p;
  }

  getDepartments() {
    return this.#departments;
  }

  formatDepartments() {
    const proxy = this.getDepartments();

    if (proxy) {
      return proxy.map((v) => ({ value: v.code, label: v.description }));
    }

    return [];
  }
}

export const auxiliaryState = new AuxiliaryState();
