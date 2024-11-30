import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import type { RequestsPageTable } from '../data/schemas.js';
import {
  TableCheckbox,
  TableColumnHeader,
  TableRowActions,
  TableSubjectsCell,
  TableFullnameRow
} from './index.js';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/render-helpers.js';

export const columns: ColumnDef<RequestsPageTable>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      renderComponent(TableCheckbox, {
        checked: table.getIsAllPageRowsSelected(),
        onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
        'aria-label': 'Select all',
        class: 'translate-y-[2px]'
      }),
    cell: ({ row }) =>
      renderComponent(TableCheckbox, {
        checked: row.getIsSelected(),
        onCheckedChange: (value) => row.toggleSelected(!!value),
        'aria-label': 'Select row',
        class: 'translate-y-[2px]'
      }),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'reference_id',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<RequestsPageTable, unknown>, {
        column,
        title: 'Reference ID'
      });
    },
    cell: ({ row }) => {
      const idSnippet = createRawSnippet<[string]>((getReferenceId) => {
        return {
          render: () => `<div class="w-[80px]">${getReferenceId()}</div>`
        };
      });

      return renderSnippet(idSnippet, row.getValue('reference_id'));
    },
    enableSorting: false,
    enableHiding: false
  },

  {
    accessorKey: 'full_name',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<RequestsPageTable, unknown>, {
        column,
        title: 'Full Name'
      });
    },
    cell: ({ row }) => renderComponent(TableFullnameRow, { row }),
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'reason',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<RequestsPageTable, unknown>, {
        column,
        title: 'Reason'
      });
    },
    cell: ({ row }) => {
      const reasonSnippet = createRawSnippet<[string]>((getReason) => {
        return {
          render: () => `<div class="w-full line-clamp-3">${getReason()}</div>`
        };
      });

      return renderSnippet(reasonSnippet, row.getValue('reason'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'status',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<RequestsPageTable, unknown>, {
        column,
        title: 'Status'
      });
    },
    cell: ({ row }) => {
      const statusSnippet = createRawSnippet<[string]>((getStatus) => {
        return {
          render: () => `<div class="w-full">${getStatus()}</div>`
        };
      });

      return renderSnippet(statusSnippet, row.getValue('status'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'created_at',
    id: 'created_at',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<RequestsPageTable, unknown>, {
        column,
        title: 'Created At'
      });
    },
    cell: ({ row }) => {
      const createdAtSnippet = createRawSnippet<[string]>((getCreatedAt) => {
        return {
          render: () =>
            `<div class="w-[80px]">${new Date(getCreatedAt()).toLocaleDateString()}</div>`
        };
      });

      return renderSnippet(createdAtSnippet, row.getValue('created_at'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    id: 'actions',
    cell: ({ row }) => renderComponent(TableRowActions<RequestsPageTable>, { row })
  }
];
