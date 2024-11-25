<script lang="ts">
  import { Skeleton } from '$lib/components/ui/skeleton/index';
  import Table from './components/Table/components/Table.svelte';
  import { columns } from './components/Table/components/columns';
  import AddFaculty from './components/AddFaculty/AddFaculty.svelte';
  import { initTableState } from './components/Table/tableState.svelte';

  const { data } = $props();

  initTableState();

  let professors = $state<Awaited<typeof data.getProfessors>>(null);
  let schedules = $state<Awaited<typeof data.getClassSchedules>>(null);

  const fetchData = async () => {
    const [profs, scheds] = await Promise.all([data.getProfessors, data.getClassSchedules]);

    professors = profs;
    schedules = scheds;
  };

  $effect(() => {
    fetchData();

    return () => {
      professors = null;
      schedules = null;
    };
  });
</script>

<div class="sticky top-2 z-30 flex justify-end">
  <AddFaculty addFacultyForm={data.addFacultyForm} {professors} {schedules} />
</div>

<div class="mt-6">
  {#await null}
    <section class="flex flex-col gap-1.5">
      <Skeleton class="h-[20px] w-[100%] rounded-full" />
      <Skeleton class="h-[20px] w-[80%] rounded-full" />
      <Skeleton class="h-[20px] w-[30%] rounded-full" />
      <Skeleton class="h-[20px] w-[90%] rounded-full" />
    </section>
  {:then faculties}
    <Table data={faculties ?? []} {columns} />
  {/await}
</div>
