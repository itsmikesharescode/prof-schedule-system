import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import type { LogsPageTable } from '../data/schemas.js';
import { TableColumnHeader } from './index.js';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/render-helpers.js';

export const columns: ColumnDef<LogsPageTable>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<LogsPageTable, unknown>, {
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
    accessorKey: 'user_id',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<LogsPageTable, unknown>, {
        column,
        title: 'User ID'
      });
    },
    cell: ({ row }) => {
      const userIdSnippet = createRawSnippet<[string]>((getUserId) => {
        return {
          render: () => `<div class="w-full">${getUserId()}</div>`
        };
      });

      return renderSnippet(userIdSnippet, row.getValue('user_id'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'type',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<LogsPageTable, unknown>, {
        column,
        title: 'Type'
      });
    },
    cell: ({ row }) => {
      const typeSnippet = createRawSnippet<[string]>((getType) => {
        return {
          render: () => `<div class="w-full">${getType()}</div>`
        };
      });

      return renderSnippet(typeSnippet, row.getValue('type'));
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'location_name',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<LogsPageTable, unknown>, {
        column,
        title: 'Location Name'
      });
    },
    cell: ({ row }) => {
      const locationNameSnippet = createRawSnippet<[string]>((getLocationName) => {
        return {
          render: () => `<div class="w-full">${getLocationName()}</div>`
        };
      });

      return renderSnippet(locationNameSnippet, row.getValue('location_name'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'created_at',
    id: 'created_at',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<LogsPageTable, unknown>, {
        column,
        title: 'Created At'
      });
    },
    cell: ({ row }) => {
      const createdAtSnippet = createRawSnippet<[string]>((getCreatedAt) => {
        return {
          render: () =>
            `<div class="w-[180px]">${new Date(getCreatedAt()).toLocaleDateString()} @ ${new Date(getCreatedAt()).toLocaleTimeString()}</div>`
        };
      });

      return renderSnippet(createdAtSnippet, row.getValue('created_at'));
    },
    enableSorting: true,
    enableHiding: true
  }
];
