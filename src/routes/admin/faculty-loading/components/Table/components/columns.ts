import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import type { FacultyLoadingPageTable } from '../data/schemas.js';
import { TableCheckbox, TableColumnHeader, TableRowActions, TableFullnameRow } from './index.js';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/render-helpers.js';

export const columns: ColumnDef<FacultyLoadingPageTable>[] = [
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
    accessorKey: 'fullName',
    id: 'fullName',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<FacultyLoadingPageTable, unknown>, {
        column,
        title: 'Full Name'
      });
    },
    cell: ({ row }) => renderComponent(TableFullnameRow<FacultyLoadingPageTable>, { row }),
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'department',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<FacultyLoadingPageTable, unknown>, {
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
    accessorKey: 'school_year',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<FacultyLoadingPageTable, unknown>, {
        column,
        title: 'School Year'
      });
    },
    cell: ({ row }) => {
      const schoolYearSnippet = createRawSnippet<[string]>((getSchoolYear) => {
        return {
          render: () => `<div class="w-full">${getSchoolYear()}</div>`
        };
      });

      return renderSnippet(schoolYearSnippet, row.getValue('school_year'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'year_level',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<FacultyLoadingPageTable, unknown>, {
        column,
        title: 'Year Level'
      });
    },
    cell: ({ row }) => {
      const yearLevelSnippet = createRawSnippet<[string]>((getYearLevel) => {
        return {
          render: () => `<div class="w-full">${getYearLevel()}</div>`
        };
      });

      return renderSnippet(yearLevelSnippet, row.getValue('year_level'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'semester',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<FacultyLoadingPageTable, unknown>, {
        column,
        title: 'Semester'
      });
    },
    cell: ({ row }) => {
      const semesterSnippet = createRawSnippet<[string]>((getSemester) => {
        return {
          render: () => `<div class="w-full">${getSemester()}</div>`
        };
      });

      return renderSnippet(semesterSnippet, row.getValue('semester'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'section',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<FacultyLoadingPageTable, unknown>, {
        column,
        title: 'Section'
      });
    },
    cell: ({ row }) => {
      const sectionSnippet = createRawSnippet<[string]>((getSection) => {
        return {
          render: () => `<div class="w-full">${getSection()}</div>`
        };
      });

      return renderSnippet(sectionSnippet, row.getValue('section'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'created_at',
    id: 'created_at',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<FacultyLoadingPageTable, unknown>, {
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
    cell: ({ row }) => renderComponent(TableRowActions<FacultyLoadingPageTable>, { row })
  }
];
