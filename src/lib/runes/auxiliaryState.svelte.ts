type Department = { code: string; description: string };

class AuxiliaryState {
  //populate here in the future use if it needs more dynamic fields
  #departments = $state<Department[] | null>(null);

  setDepartments(p: Department[] | null) {
    this.#departments = p;
  }

  getDepartments() {
    return this.#departments;
  }
}

export const auxiliaryState = new AuxiliaryState();
