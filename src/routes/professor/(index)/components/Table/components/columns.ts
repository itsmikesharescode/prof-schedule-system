import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import type { SchedulePageTable } from '../data/schemas.js';
import { TableColumnHeader, TableRowActions } from './index.js';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/render-helpers.js';

export const columns: ColumnDef<SchedulePageTable>[] = [
  {
    accessorKey: 'department',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<SchedulePageTable, unknown>, {
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
    accessorKey: 'subject',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<SchedulePageTable, unknown>, {
        column,
        title: 'Subject'
      });
    },
    cell: ({ row }) => {
      const subjectSnippet = createRawSnippet<[string]>((getSubject) => {
        return {
          render: () => `<div class="w-full">${getSubject()}</div>`
        };
      });

      return renderSnippet(subjectSnippet, row.getValue('subject'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'courseCode',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<SchedulePageTable, unknown>, {
        column,
        title: 'Subject Code'
      });
    },
    cell: ({ row }) => {
      const courseCodeSnippet = createRawSnippet<[string]>((getCourseCode) => {
        return {
          render: () => `<div class="w-full">${getCourseCode()}</div>`
        };
      });

      return renderSnippet(courseCodeSnippet, row.getValue('courseCode'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'room',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<SchedulePageTable, unknown>, {
        column,
        title: 'Room'
      });
    },
    cell: ({ row }) => {
      const roomSnippet = createRawSnippet<[number]>((getRoom) => {
        return {
          render: () => `<div class="w-full">${getRoom()}</div>`
        };
      });

      return renderSnippet(roomSnippet, row.getValue('room'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'time',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<SchedulePageTable, unknown>, {
        column,
        title: 'Time'
      });
    },
    cell: ({ row }) => {
      const timeSnippet = createRawSnippet<[string]>((getTime) => {
        return {
          render: () => `<div class="w-full">${getTime()}</div>`
        };
      });

      return renderSnippet(timeSnippet, row.getValue('time'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'day',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<SchedulePageTable, unknown>, {
        column,
        title: 'Day'
      });
    },
    cell: ({ row }) => {
      const daySnippet = createRawSnippet<[string]>((getDay) => {
        return {
          render: () => `<div class="w-full">${getDay()}</div>`
        };
      });

      return renderSnippet(daySnippet, row.getValue('day'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'units',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<SchedulePageTable, unknown>, {
        column,
        title: 'Units'
      });
    },
    cell: ({ row }) => {
      const unitsSnippet = createRawSnippet<[number]>((getUnits) => {
        return {
          render: () => `<div class="w-full">${getUnits()}</div>`
        };
      });

      return renderSnippet(unitsSnippet, row.getValue('units'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'section',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<SchedulePageTable, unknown>, {
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
      return renderComponent(TableColumnHeader<SchedulePageTable, unknown>, {
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
    cell: ({ row }) => renderComponent(TableRowActions<SchedulePageTable>, { row })
  }
];
