<script lang="ts">
  import { Skeleton } from '$lib/components/ui/skeleton/index';
  import Table from './components/Table/components/Table.svelte';
  import { columns } from './components/Table/components/columns';

  import AddSchedule from './components/AddSchedule/AddSchedule.svelte';
  import { initTableState } from './components/Table/tableState.svelte';
  import DeleteSchedule from './components/DeleteSchedule/DeleteSchedule.svelte';
  import UpdateSchedule from './components/UpdateSchedule/UpdateSchedule.svelte';
  import ViewCalendar from './components/ViewCalendar/ViewCalendar.svelte';
  const { data } = $props();

  initTableState();
</script>

<div class="sticky top-2 z-30 flex justify-end">
  <AddSchedule addScheduleForm={data.addScheduleForm} />
</div>

<div class="mt-6">
  {#await data.streamClassSchedules}
    <section class="flex flex-col gap-1.5">
      <Skeleton class="h-[20px] w-[100%] rounded-full" />
      <Skeleton class="h-[20px] w-[80%] rounded-full" />
      <Skeleton class="h-[20px] w-[30%] rounded-full" />
      <Skeleton class="h-[20px] w-[90%] rounded-full" />
    </section>
  {:then classSchedules}
    <Table data={classSchedules ?? []} {columns} />
  {/await}
</div>

<DeleteSchedule />
<UpdateSchedule updateScheduleForm={data.updateScheduleForm} />
<ViewCalendar />
