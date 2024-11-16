<script lang="ts">
  import TableMenu from './components/TableMenu.svelte';
  import AddProgram from './components/AddProgram/AddProgram.svelte';
  import { Skeleton } from '$lib/components/ui/skeleton/index';
  import Table from './components/Table/components/Table.svelte';
  import { columns } from './components/Table/components/columns';
  const { data } = $props();
</script>

<div class="sticky top-2 z-30 flex justify-end">
  <AddProgram addProgramForm={data.addProgramForm} />
</div>

<div class="mt-6">
  {#await data.streamPrograms}
    <section class="flex flex-col gap-1.5">
      <Skeleton class="h-[20px] w-[100%] rounded-full" />
      <Skeleton class="h-[20px] w-[80%] rounded-full" />
      <Skeleton class="h-[20px] w-[30%] rounded-full" />
      <Skeleton class="h-[20px] w-[90%] rounded-full" />
    </section>
  {:then programs}
    <Table data={programs ?? []} {columns} />
  {/await}
</div>
