<script lang="ts">
  import { page } from '$app/stores';
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
          professor_id: item.professor_id,
          department: item.class_schedules_tb?.department ?? '',
          semester: item.class_schedules_tb?.semester ?? '',
          section: item.class_schedules_tb?.section ?? '',
          school_year: item.class_schedules_tb?.school_year ?? '',
          year_level: item.class_schedules_tb?.year_level ?? '',
          class_schedules_tb: item.class_schedules_tb
        })) ?? []}
        {columns}
      />
    {/await}
  </section>
</main>

<ViewCalendar />
