<script lang="ts">
  import { page } from '$app/stores';
  import { Skeleton } from '$lib/components/ui/skeleton/index';
  import Table from './components/Table/components/Table.svelte';
  import { columns } from './components/Table/components/columns';

  const { data } = $props();
</script>

<main class="py-[3rem]">
  <span class="text-3xl font-bold">Request</span>

  <section class="mt-6">
    {#await data.getRequest}
      <Skeleton class="h-[20px] w-[100%] rounded-full" />
    {:then requests}
      <Table data={requests ?? []} {columns} />
    {/await}
  </section>
</main>
