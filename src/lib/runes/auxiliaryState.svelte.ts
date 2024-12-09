import type { Database } from '$lib/database.types';

type Department = Database['public']['Tables']['programs_tb']['Row'];
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
      return proxy.map((v) => ({ value: `${v.code},${v.id}`, label: v.description }));
    }

    return [];
  }
}

export const auxiliaryState = new AuxiliaryState();
