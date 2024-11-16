<script lang="ts">
  import AddSection from './components/AddSection/AddSection.svelte';
  import { Skeleton } from '$lib/components/ui/skeleton/index';
  import { initTableState } from './components/Table/tableState.svelte';
  import { columns } from './components/Table/components/columns';
  import Table from './components/Table/components/Table.svelte';
  import UpdateSection from './components/UpdateSection/UpdateSection.svelte';
  import DeleteSection from './components/DeleteSection/DeleteSection.svelte';

  const { data } = $props();

  initTableState();
</script>

<div class="sticky top-2 z-30 flex justify-end">
  <AddSection addSectionForm={data.addSectionForm} />
</div>

<div class="mt-6">
  {#await data.sections}
    <section class="flex flex-col gap-1.5">
      <Skeleton class="h-[20px] w-[100%] rounded-full" />
      <Skeleton class="h-[20px] w-[80%] rounded-full" />
      <Skeleton class="h-[20px] w-[30%] rounded-full" />
      <Skeleton class="h-[20px] w-[90%] rounded-full" />
    </section>
  {:then sections}
    <Table data={sections ?? []} {columns} />
  {/await}
</div>

<UpdateSection updateSectionForm={data.updateSectionForm} />
<DeleteSection />
