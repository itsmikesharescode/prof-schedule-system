import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import type { SubjectsPageTable } from '../data/schemas.js';
import {
  TableCheckbox,
  TableColumnHeader,
  TablePriorityCell,
  TableRowActions,
  TableStatusCell,
  TableTitleCell
} from './index.js';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/render-helpers.js';

export const columns: ColumnDef<SubjectsPageTable>[] = [
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
      return renderComponent(TableColumnHeader<SubjectsPageTable, unknown>, {
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
    accessorKey: 'name',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<SubjectsPageTable, unknown>, {
        column,
        title: 'Subject Name'
      });
    },
    cell: ({ row }) => {
      const subjectNameSnippet = createRawSnippet<[string]>((getSubjectName) => {
        return {
          render: () => `<div class="w-full">${getSubjectName()}</div>`
        };
      });

      return renderSnippet(subjectNameSnippet, row.getValue('name'));
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'code',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<SubjectsPageTable, unknown>, {
        column,
        title: 'Subject Code'
      });
    },
    cell: ({ row }) => {
      const subjectCodeSnippet = createRawSnippet<[string]>((getSubjectCode) => {
        return {
          render: () => `<div class="w-full">${getSubjectCode()}</div>`
        };
      });

      return renderSnippet(subjectCodeSnippet, row.getValue('code'));
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'unit',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<SubjectsPageTable, unknown>, {
        column,
        title: 'Unit'
      });
    },
    cell: ({ row }) => {
      const subjectUnitSnippet = createRawSnippet<[number]>((getSubjectUnit) => {
        return {
          render: () => `<div class="w-full">${getSubjectUnit()}</div>`
        };
      });

      return renderSnippet(subjectUnitSnippet, row.getValue('unit'));
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'department',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<SubjectsPageTable, unknown>, {
        column,
        title: 'Department'
      });
    },
    cell: ({ row }) => {
      const subjectDepartmentSnippet = createRawSnippet<[string]>((getSubjectDepartment) => {
        return {
          render: () => `<div class="w-full">${getSubjectDepartment()}</div>`
        };
      });

      return renderSnippet(subjectDepartmentSnippet, row.getValue('department'));
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'created_at',
    id: 'created_at',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<SubjectsPageTable, unknown>, {
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
    cell: ({ row }) => renderComponent(TableRowActions<SubjectsPageTable>, { row })
  }
];
