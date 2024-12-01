<script lang="ts">
  import AddSchoolYear from './components/AddSchoolYear/AddSchoolYear.svelte';
  import { Skeleton } from '$lib/components/ui/skeleton/index';
  import Table from './components/Table/components/Table.svelte';
  import { columns } from './components/Table/components/columns';
  import UpdateSchoolYear from './components/UpdateSchoolYear/UpdateSchoolYear.svelte';
  import DeleteSchoolYear from './components/DeleteSchoolYear/DeleteSchoolYear.svelte';
  import { initTableState } from './components/Table/tableState.svelte';

  const { data } = $props();

  initTableState();
</script>

<div class="sticky top-2 z-30 flex justify-end">
  <AddSchoolYear addSchoolYearForm={data.addSchoolYearForm} />
</div>

<div class="mt-6">
  {#await data.streamSchoolYear}
    <section class="flex flex-col gap-1.5">
      <Skeleton class="h-[20px] w-[100%] rounded-full" />
      <Skeleton class="h-[20px] w-[80%] rounded-full" />
      <Skeleton class="h-[20px] w-[30%] rounded-full" />
      <Skeleton class="h-[20px] w-[90%] rounded-full" />
    </section>
  {:then schoolYears}
    <Table data={schoolYears ?? []} {columns} />
  {/await}
</div>

<UpdateSchoolYear updateSchoolYearForm={data.updateSchoolYearForm} />
<DeleteSchoolYear />
