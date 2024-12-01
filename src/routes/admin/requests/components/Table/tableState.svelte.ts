import { getContext, setContext } from 'svelte';
import type { RequestsPageTable } from './data/schemas';

class TableState {
  #activeRow = $state<RequestsPageTable | null>(null);

  setActiveRow(row: RequestsPageTable | null) {
    this.#activeRow = row;
  }

  getActiveRow() {
    return this.#activeRow;
  }

  #showViewComparison = $state(false);

  setShowViewComparison(show: boolean) {
    this.#showViewComparison = show;
  }

  getShowViewComparison() {
    return this.#showViewComparison;
  }

  #showUpdateStatus = $state(false);

  setShowUpdateStatus(show: boolean) {
    this.#showUpdateStatus = show;
  }

  getShowUpdateStatus() {
    return this.#showUpdateStatus;
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
