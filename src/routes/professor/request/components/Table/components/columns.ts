import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import type { RequestPageTable } from '../data/schemas.js';
import { TableColumnHeader, TableRowActions } from './index.js';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/render-helpers.js';

export const columns: ColumnDef<RequestPageTable>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<RequestPageTable, unknown>, {
        column,
        title: 'ID'
      });
    },
    cell: ({ row }) => {
      const idSnippet = createRawSnippet<[string]>((getId) => {
        return {
          render: () => `<div class="w-full">${getId()}</div>`
        };
      });

      return renderSnippet(idSnippet, row.getValue('id'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'status',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<RequestPageTable, unknown>, {
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
    accessorKey: 'date',
    accessorFn: (row) => `${row.day} ${row.start_time} - ${row.end_time}`,
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<RequestPageTable, unknown>, {
        column,
        title: 'Preferred Date'
      });
    },
    cell: ({ row }) => {
      const dateSnippet = createRawSnippet<[string]>((getDate) => {
        return {
          render: () => `<div class="w-full">${getDate()}</div>`
        };
      });

      return renderSnippet(dateSnippet, row.getValue('date'));
    },
    enableSorting: false,
    enableHiding: true
  },

  {
    accessorKey: 'reason',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<RequestPageTable, unknown>, {
        column,
        title: 'Reason'
      });
    },
    cell: ({ row }) => {
      const reasonSnippet = createRawSnippet<[string]>((getReason) => {
        return {
          render: () => `<div class="w-full">${getReason()}</div>`
        };
      });

      return renderSnippet(reasonSnippet, row.getValue('reason'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'created_at',
    id: 'created_at',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<RequestPageTable, unknown>, {
        column,
        title: 'Created At'
      });
    },
    cell: ({ row }) => {
      const createdAtSnippet = createRawSnippet<[string]>((getCreatedAt) => {
        return {
          render: () =>
            `<div class="w-[180px]">${new Date(getCreatedAt()).toLocaleDateString()} @ ${new Date(
              getCreatedAt()
            ).toLocaleTimeString()} </div>`
        };
      });

      return renderSnippet(createdAtSnippet, row.getValue('created_at'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    id: 'actions',
    cell: ({ row }) => renderComponent(TableRowActions<RequestPageTable>, { row })
  }
];
