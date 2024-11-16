import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import type { AccountPageTable } from '../data/schemas';
import {
  DataTableCheckbox,
  DataTableColumnHeader,
  DataTablePriorityCell,
  DataTableRowActions,
  DataTableStatusCell,
  DataTableTitleCell,
  TableFullnameRow,
  TableInterestRow
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
    accessorKey: 'user_id',
    id: 'user_id',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<AccountPageTable, unknown>, {
        column,
        title: 'User ID'
      });
    },
    cell: ({ row }) => {
      const idSnippet = createRawSnippet<[string]>((getUserID) => {
        return {
          render: () => `<div class="w-full">${getUserID()}</div>`
        };
      });

      return renderSnippet(idSnippet, row.getValue('user_id'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'department',
    id: 'department',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<AccountPageTable, unknown>, {
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
    accessorKey: 'fullName',
    id: 'fullName',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<AccountPageTable, unknown>, {
        column,
        title: 'Full Name'
      });
    },
    cell: ({ row }) => renderComponent(TableFullnameRow<AccountPageTable>, { row }),
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'email',
    id: 'email',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<AccountPageTable, unknown>, {
        column,
        title: 'Email'
      });
    },
    cell: ({ row }) => {
      const emailSnippet = createRawSnippet<[string]>((getEmail) => {
        return {
          render: () => `<div class="w-full">${getEmail()}</div>`
        };
      });

      return renderSnippet(emailSnippet, row.getValue('email'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'role',
    id: 'role',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<AccountPageTable, unknown>, {
        column,
        title: 'Role'
      });
    },
    cell: ({ row }) => {
      const roleSnippet = createRawSnippet<[string]>((getRole) => {
        return {
          render: () => `<div class="w-full">${getRole()}</div>`
        };
      });

      return renderSnippet(roleSnippet, row.getValue('role'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'approved',
    id: 'approved',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<AccountPageTable, unknown>, {
        column,
        title: 'Status'
      });
    },
    cell: ({ row }) => {
      const statusSnippet = createRawSnippet<[boolean]>((getStatus) => {
        return {
          render: () => `<div class="w-full">${getStatus() ? 'Active' : 'Inactive'}</div>`
        };
      });

      return renderSnippet(statusSnippet, row.getValue('approved'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'interests',
    id: 'interests',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<AccountPageTable, unknown>, {
        column,
        title: 'Interests'
      });
    },
    cell: ({ row }) => renderComponent(TableInterestRow<AccountPageTable>, { row }),
    enableSorting: false,
    enableHiding: true
  },

  {
    accessorKey: 'created_at',
    id: 'created_at',
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
