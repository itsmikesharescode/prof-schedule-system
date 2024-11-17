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

  #rooms = $state<Room[] | null>(null);

  setRooms(p: Room[] | null) {
    this.#rooms = p;
  }

  getRooms() {
    return this.#rooms;
  }

  formatRooms() {
    const proxy = this.getRooms();
  }

  #schoolYears = $state<SchoolYear[] | null>(null);

  setSchoolYears(p: SchoolYear[] | null) {
    this.#schoolYears = p;
  }

  getSchoolYears() {
    return this.#schoolYears;
  }

  formatSchoolYears() {
    const proxy = this.getSchoolYears();
  }

  #sections = $state<Section[] | null>(null);

  setSections(p: Section[] | null) {
    this.#sections = p;
  }

  getSections() {
    return this.#sections;
  }

  formatSections() {
    const proxy = this.getSections();
  }

  #subjects = $state<Subject[] | null>(null);

  setSubjects(p: Subject[] | null) {
    this.#subjects = p;
  }

  getSubjects() {
    return this.#subjects;
  }

  formatSubjects() {
    const proxy = this.getSubjects();
  }

  #yearLevels = $state<YearLevel[] | null>(null);

  setYearLevels(p: YearLevel[] | null) {
    this.#yearLevels = p;
  }

  getYearLevels() {
    return this.#yearLevels;
  }

  formatYearLevels() {
    const proxy = this.getYearLevels();
  }
}

export const auxiliaryState = new AuxiliaryState();
