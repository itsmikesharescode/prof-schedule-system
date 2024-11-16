import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import type { AccountPageTable } from '../data/schemas';
import {
  DataTableCheckbox,
  DataTableColumnHeader,
  DataTablePriorityCell,
  DataTableRowActions,
  DataTableStatusCell,
  DataTableTitleCell
} from './index.js';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/render-helpers.js';

export const columns: ColumnDef<AccountPageTable, unknown>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      renderComponent(DataTableCheckbox, {
        checked: table.getIsAllPageRowsSelected(),
        onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
        'aria-label': 'Select all',
        class: 'translate-y-[2px]'
      }),
    cell: ({ row }) =>
      renderComponent(DataTableCheckbox, {
        checked: row.getIsSelected(),
        onCheckedChange: (value) => row.toggleSelected(!!value),
        'aria-label': 'Select row',
        class: 'translate-y-[2px]'
      }),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<AccountPageTable, unknown>, {
        column,
        title: 'ID'
      });
    },
    cell: ({ row }) => {
      const idSnippet = createRawSnippet<[string]>((getId) => {
        const id = getId();
        return {
          render: () => `<div class="w-[80px]">${id}</div>`
        };
      });

      return renderSnippet(idSnippet, row.getValue('id'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'code',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<AccountPageTable, unknown>, {
        column,
        title: 'Department'
      });
    },
    cell: ({ row }) => {
      const codeSnippet = createRawSnippet<[string]>((getCode) => {
        return {
          render: () => `<div class="w-[80px]">${getCode()}</div>`
        };
      });

      return renderSnippet(codeSnippet, row.getValue('code'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'description',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<AccountPageTable, unknown>, {
        column,
        title: 'Description'
      });
    },
    cell: ({ row }) => {
      const descriptionSnippet = createRawSnippet<[string]>((getDescription) => {
        return {
          render: () => `<div class="w-full">${getDescription()}</div>`
        };
      });

      return renderSnippet(descriptionSnippet, row.getValue('description'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'head',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<AccountPageTable, unknown>, {
        column,
        title: 'Program Head'
      });
    },
    cell: ({ row }) => {
      const headSnippet = createRawSnippet<[string]>((getHead) => {
        return {
          render: () => `<div class="w-full">${getHead()}</div>`
        };
      });

      return renderSnippet(headSnippet, row.getValue('head'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<AccountPageTable, unknown>, {
        column,
        title: 'Created At'
      });
    },
    cell: ({ row }) => {
      const createdAtSnippet = createRawSnippet<[string]>((getCreatedAt) => {
        return {
          render: () => `<div class="w-full">${new Date(getCreatedAt()).toLocaleDateString()}</div>`
        };
      });

      return renderSnippet(createdAtSnippet, row.getValue('created_at'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    id: 'actions',
    cell: ({ row }) => renderComponent(DataTableRowActions<AccountPageTable>, { row })
  }
];
