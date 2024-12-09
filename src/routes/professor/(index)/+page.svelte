<script lang="ts">
  import { page } from '$app/stores';
  import { convert24HourTo12Hour } from '$lib';
  import { Skeleton } from '$lib/components/ui/skeleton/index';
  import Table from './components/Table/components/Table.svelte';
  import { columns } from './components/Table/components/columns';
  import { initTableState } from './components/Table/tableState.svelte';
  import ViewCalendar from './components/ViewCalendar/ViewCalendar.svelte';
  const { data } = $props();

  initTableState();
</script>

<main class="py-[3rem]">
  <span class="text-3xl font-bold">Schedule</span>

  <section class="mt-6">
    {#await data.getSchedules}
      <Skeleton class="h-[20px] w-[100%] rounded-full" />
    {:then schedules}
      <Table
        data={schedules?.map((item) => ({
          id: item.id,
          created_at: item.created_at,
          department: item.programs_tb?.code ?? '',
          school_year: item.school_years_tb?.year ?? '',
          year_level: item.year_levels_tb?.levels?.[0]?.yearLevel ?? '',
          section: item.sections_tb?.section_code ?? '',
          subject: item.subjects_tb?.name ?? '',
          courseCode: item.subjects_tb?.code ?? '',
          room: item.rooms_tb?.number ?? 0,
          semester: item.semester ?? '',
          day: item.day ?? '',
          units: item.subjects_tb?.unit ?? 0,
          time: `${convert24HourTo12Hour(item.initial_time)} - ${convert24HourTo12Hour(item.final_time)}`
        })) ?? []}
        {columns}
      />
    {/await}
  </section>
</main>

<ViewCalendar />
