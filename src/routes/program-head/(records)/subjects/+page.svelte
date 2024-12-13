<script lang="ts">
  import AddSubject from './components/AddSubject/AddSubject.svelte';
  import { Skeleton } from '$lib/components/ui/skeleton/index';
  import { initTableState } from './components/Table/tableState.svelte';
  import Table from './components/Table/components/Table.svelte';
  import { columns } from './components/Table/components/columns';
  import UpdateSubject from './components/UpdateSubject/UpdateSubject.svelte';
  import DeleteSubject from './components/DeleteSubject/DeleteSubject.svelte';
  const { data } = $props();

  initTableState();
</script>

<div class="sticky top-2 z-30 flex justify-end">
  <AddSubject addSubjectForm={data.addSubjectForm} />
</div>

<div class="mt-6">
  {#await data.subjects}
    <section class="flex flex-col gap-1.5">
      <Skeleton class="h-[20px] w-[100%] rounded-full" />
      <Skeleton class="h-[20px] w-[80%] rounded-full" />
      <Skeleton class="h-[20px] w-[30%] rounded-full" />
      <Skeleton class="h-[20px] w-[90%] rounded-full" />
    </section>
  {:then subjects}
    <Table
      data={subjects?.map((v) => ({ ...v, department: v.programs_tb?.code ?? '' })) ?? []}
      {columns}
    />
  {/await}
</div>

<UpdateSubject updateSubjectForm={data.updateSubjectForm} />
<DeleteSubject />
