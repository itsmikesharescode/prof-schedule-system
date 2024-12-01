import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import type { RoomsPageTable } from '../data/schemas.js';
import {
  TableCheckbox,
  TableColumnHeader,
  TablePriorityCell,
  TableRowActions,
  TableStatusCell,
  TableTitleCell
} from './index.js';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/render-helpers.js';

export const columns: ColumnDef<RoomsPageTable>[] = [
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
    accessorKey: 'id',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<RoomsPageTable, unknown>, {
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
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<RoomsPageTable, unknown>, {
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
    accessorKey: 'number',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<RoomsPageTable, unknown>, {
        column,
        title: 'Room Number'
      });
    },
    cell: ({ row }) => {
      const numberSnippet = createRawSnippet<[string]>((getNumber) => {
        return {
          render: () => `<div class="w-full">${getNumber()}</div>`
        };
      });

      return renderSnippet(numberSnippet, row.getValue('number'));
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'code',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<RoomsPageTable, unknown>, {
        column,
        title: 'Room Code'
      });
    },
    cell: ({ row }) => {
      const codeSnippet = createRawSnippet<[string]>((getCode) => {
        return {
          render: () => `<div class="w-full">${getCode()}</div>`
        };
      });

      return renderSnippet(codeSnippet, row.getValue('code'));
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'department',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<RoomsPageTable, unknown>, {
        column,
        title: 'Department'
      });
    },
    cell: ({ row }) => {
      const departmentSnippet = createRawSnippet<[string]>((getDepartment) => {
        return {
          render: () => `<div class="w-full">${getDepartment()}</div>`
        };
      });

      return renderSnippet(departmentSnippet, row.getValue('department'));
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'created_at',
    id: 'created_at',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<RoomsPageTable, unknown>, {
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
    cell: ({ row }) => renderComponent(TableRowActions<RoomsPageTable>, { row })
  }
];
