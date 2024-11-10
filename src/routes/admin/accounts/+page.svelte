<script lang="ts">
  import * as Table from '$lib/components/ui/table/index.js';
  import TableMenu from './components/TableMenu.svelte';
  import AddProfessor from './components/AddProfessor/AddProfessor.svelte';
  import { departments } from '$lib/metadata';
  import { page } from '$app/stores';
  import { Skeleton } from '$lib/components/ui/skeleton/index';

  const { data } = $props();
</script>

<div class="flex flex-col gap-4">
  <div class="sticky top-2 z-30 flex justify-end">
    <AddProfessor addProfessorForm={data.addProfessorForm} />
  </div>

  <Table.Root>
    <Table.Caption>A list of your recent invoices.</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[50px]"></Table.Head>
        <Table.Head class="w-[100px]">User ID</Table.Head>
        <Table.Head>Email</Table.Head>
        <Table.Head>Name</Table.Head>
        <Table.Head class="truncate">Prof ID</Table.Head>
        <Table.Head class="truncate">Position</Table.Head>
        <Table.Head class="truncate">Department</Table.Head>
        <Table.Head class="truncate">Status</Table.Head>
        <Table.Head class="truncate">Approved</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <!--Display if streaming data-->
      {#await data.streamProfessors}
        {#each Array(5) as _}
          <Table.Row>
            <Table.Cell class="">
              <Skeleton class="h-[20px] rounded-full" />
            </Table.Cell>
            <Table.Cell class="font-medium"><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell class="text-right"><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell class="text-right"><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell class="text-right"><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell class="text-right"><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell class="text-right"><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
          </Table.Row>
        {/each}
      {:then professors}
        {#each professors ?? [] as professor}
          <Table.Row>
            <Table.Cell class="">
              <TableMenu updateProfessorForm={data.updateProfessorForm} />
            </Table.Cell>
            <Table.Cell class="truncate font-medium">123123xx2</Table.Cell>
            <Table.Cell class="truncate">sample@gmail.com</Table.Cell>
            <Table.Cell class="truncate">Magdiwang, Magdalo Macapagal</Table.Cell>
            <Table.Cell class="truncate">25436x</Table.Cell>
            <Table.Cell class="truncate">Professor</Table.Cell>
            <Table.Cell class="truncate">IT</Table.Cell>
            <Table.Cell class="truncate">Active</Table.Cell>
            <Table.Cell class="truncate">False</Table.Cell>
          </Table.Row>
        {/each}
      {/await}
    </Table.Body>
  </Table.Root>
</div>
