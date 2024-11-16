import { getContext, setContext } from 'svelte';
import type { ProgramPageTable } from './data/schemas';

class TableState {
  #activeRow = $state<ProgramPageTable | null>(null);

  setActiveRow(row: ProgramPageTable | null) {
    this.#activeRow = row;
  }

  getActiveRow() {
    return this.#activeRow;
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
