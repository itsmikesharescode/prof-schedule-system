<script lang="ts">
  import AddYearLevel from './components/AddYearLevel/AddYearLevel.svelte';
  import { Skeleton } from '$lib/components/ui/skeleton/index';
  import { columns } from './components/Table/components/columns';
  import Table from './components/Table/components/Table.svelte';
  import { initTableState } from './components/Table/tableState.svelte';
  import UpdateYearLevel from './components/UpdateYearLevel/UpdateYearLevel.svelte';
  import DeleteYearLevel from './components/DeleteYearLevel/DeleteYearLevel.svelte';

  const { data } = $props();

  initTableState();
</script>

<div class="sticky top-2 z-30 flex justify-end">
  <AddYearLevel addSchoolYearForm={data.addYearLevelForm} />
</div>

<div class="mt-6">
  {#await data.yearLevels}
    <section class="flex flex-col gap-1.5">
      <Skeleton class="h-[20px] w-[100%] rounded-full" />
      <Skeleton class="h-[20px] w-[80%] rounded-full" />
      <Skeleton class="h-[20px] w-[30%] rounded-full" />
      <Skeleton class="h-[20px] w-[90%] rounded-full" />
    </section>
  {:then yearLevels}
    <Table
      data={yearLevels?.map((v) => ({ ...v, department: v.programs_tb?.code ?? '' })) ?? []}
      {columns}
    />
  {/await}
</div>

<UpdateYearLevel updateYearLevelForm={data.updateYearLevelForm} />
<DeleteYearLevel />
