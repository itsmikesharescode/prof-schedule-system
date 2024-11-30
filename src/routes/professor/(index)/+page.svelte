<script lang="ts">
  import { page } from '$app/stores';
  import { Skeleton } from '$lib/components/ui/skeleton/index';
  import Table from './components/Table/components/Table.svelte';
  import { columns } from './components/Table/components/columns';

  const { data } = $props();
</script>

<main class="py-[3rem]">
  <span class="text-3xl font-bold">Schedule</span>

  <section class="mt-6">
    {#await data.getSchedules}
      <Skeleton class="h-[20px] w-[100%] rounded-full" />
    {:then schedules}
      <Table data={[]} {columns} />
    {/await}
  </section>
</main>
