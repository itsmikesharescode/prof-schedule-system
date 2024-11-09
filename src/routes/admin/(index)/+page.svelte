<script lang="ts">
  import * as Table from '$lib/components/ui/table/index.js';
  import TableMenu from './components/TableMenu.svelte';
  import AddProgram from './components/AddProgram/AddProgram.svelte';
  import { Skeleton } from '$lib/components/ui/skeleton/index';
  import { page } from '$app/stores';
  import { invalidate } from '$app/navigation';

  const { data } = $props();

  const detectFilter = $derived($page.url.searchParams.get('filter'));

  $effect(() => {
    if (detectFilter) {
      invalidate('admin:filter');
    }
  });
</script>

<div class="flex flex-col gap-4">
  <div class="sticky top-2 z-30 flex justify-end">
    <AddProgram addProgramForm={data.addProgramForm} />
  </div>

  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[50px]"></Table.Head>
        <Table.Head class="w-[100px]">Department</Table.Head>
        <Table.Head class="truncate">Description</Table.Head>
        <Table.Head class="truncate">Program Head</Table.Head>
        <Table.Head class="truncate">Created At</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#await data.streamPrograms}
        {#each Array(5) as _}
          <Table.Row>
            <Table.Cell class="">
              <Skeleton class="h-[20px] rounded-full" />
            </Table.Cell>
            <Table.Cell class="font-medium"><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell class=""><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
          </Table.Row>
        {/each}
      {:then programs}
        {#each programs ?? [] as program}
          <Table.Row>
            <Table.Cell class="">
              <TableMenu {program} updateProgramForm={data.updateProgramForm} />
            </Table.Cell>
            <Table.Cell class="truncate font-medium">{program.name}</Table.Cell>
            <Table.Cell class="truncate">{program.description}</Table.Cell>
            <Table.Cell class="truncate">{program.head}</Table.Cell>
            <Table.Cell class="truncate">
              {new Date(program.created_at).toLocaleDateString()} @
              {new Date(program.created_at).toLocaleTimeString()}
            </Table.Cell>
          </Table.Row>
        {/each}
      {/await}
    </Table.Body>
  </Table.Root>
</div>
