import { getContext, setContext } from 'svelte';
import type { FacultyLoadingPageTable } from './data/schemas';

class TableState {
  #activeRow = $state<FacultyLoadingPageTable | null>(null);

  setActiveRow(row: FacultyLoadingPageTable | null) {
    this.#activeRow = row;
  }

  getActiveRow() {
    return this.#activeRow;
  }

  #showViewCalendar = $state(false);

  setShowViewCalendar(show: boolean) {
    this.#showViewCalendar = show;
  }

  getShowViewCalendar() {
    return this.#showViewCalendar;
  }

  #showUpdate = $state(false);

  setShowUpdate(show: boolean) {
    this.#showUpdate = show;
  }

  getShowUpdate() {
    return this.#showUpdate;
  }

  #showDelete = $state(false);

  setShowDelete(show: boolean) {
    this.#showDelete = show;
  }

  getShowDelete() {
    return this.#showDelete;
  }
}

const TableKey = Symbol('TableState');

export const initTableState = () => {
  return setContext(TableKey, new TableState());
};

export const useTableState = () => {
  return getContext<ReturnType<typeof initTableState>>(TableKey);
};
