<script lang="ts">
  import * as Table from '$lib/components/ui/table/index.js';
  import AddRoom from './components/AddRoom/AddRoom.svelte';
  import TableMenu from './components/TableMenu.svelte';

  const { data } = $props();
</script>

<div class="flex flex-col gap-4">
  <div class="sticky top-2 z-30 flex justify-end">
    <AddRoom addRoomForm={data.addRoomForm} />
  </div>

  <Table.Root>
    <Table.Caption>A list of your recent invoices.</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[50px]"></Table.Head>
        <Table.Head class="w-[100px] truncate">Room Type</Table.Head>
        <Table.Head class="w-[100px] truncate">Room Number</Table.Head>
        <Table.Head class="w-[100px] truncate">Room Code</Table.Head>
        <Table.Head class="text-right">Created At</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each Array(20) as _}
        <Table.Row>
          <Table.Cell class="">
            <TableMenu updateRoomForm={data.updateRoomForm} />
          </Table.Cell>
          <Table.Cell class="truncate font-medium">Lecture Room</Table.Cell>
          <Table.Cell class="">2</Table.Cell>
          <Table.Cell class="">Comlab2</Table.Cell>
          <Table.Cell class="text-right">{new Date().toLocaleDateString()}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
