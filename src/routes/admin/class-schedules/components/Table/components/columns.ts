import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import type { ClassSchedulesPageTable } from '../data/schemas.js';
import { TableCheckbox, TableColumnHeader, TableRowActions } from './index.js';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/render-helpers.js';

export const columns: ColumnDef<ClassSchedulesPageTable>[] = [
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
    accessorKey: 'subject',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<ClassSchedulesPageTable, unknown>, {
        column,
        title: 'Subject'
      });
    },
    cell: ({ row }) => {
      const subjectSnippet = createRawSnippet<[string]>((getSubject) => {
        return {
          render: () => `<div class="w-full line-clamp-2">${getSubject()}</div>`
        };
      });

      return renderSnippet(subjectSnippet, row.getValue('subject'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'department',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<ClassSchedulesPageTable, unknown>, {
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
    accessorKey: 'day',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<ClassSchedulesPageTable, unknown>, {
        column,
        title: 'Day'
      });
    },
    cell: ({ row }) => {
      const daySnippet = createRawSnippet<[string]>((getDay) => {
        return {
          render: () => `<div class="w-full truncate">${getDay()}</div>`
        };
      });

      return renderSnippet(daySnippet, row.getValue('day'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'school_year',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<ClassSchedulesPageTable, unknown>, {
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
    accessorKey: 'semester',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<ClassSchedulesPageTable, unknown>, {
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
    accessorKey: 'year_level',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<ClassSchedulesPageTable, unknown>, {
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
    accessorKey: 'section',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<ClassSchedulesPageTable, unknown>, {
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
      return renderComponent(TableColumnHeader<ClassSchedulesPageTable, unknown>, {
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
    cell: ({ row }) => renderComponent(TableRowActions<ClassSchedulesPageTable>, { row })
  }
];
