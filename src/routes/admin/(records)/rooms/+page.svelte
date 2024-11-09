<script lang="ts">
  import * as Table from '$lib/components/ui/table/index.js';
  import AddRoom from './components/AddRoom/AddRoom.svelte';
  import TableMenu from './components/TableMenu.svelte';
  import { Skeleton } from '$lib/components/ui/skeleton/index';
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
        <Table.Head class="truncate">Department</Table.Head>
        <Table.Head class="truncate">Room Type</Table.Head>
        <Table.Head class="truncate">Room Number</Table.Head>
        <Table.Head class="truncate">Room Code</Table.Head>
        <Table.Head class="truncate">Created At</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#await data.streamRooms}
        {#each Array(5) as _}
          <Table.Row>
            <Table.Cell class="">
              <Skeleton class="h-[20px] rounded-full" />
            </Table.Cell>
            <Table.Cell class="truncate font-medium"
              ><Skeleton class="h-[20px] rounded-full" /></Table.Cell
            >
            <Table.Cell class="truncate font-medium">
              <Skeleton class="h-[20px] rounded-full" />
            </Table.Cell>
            <Table.Cell class="truncate"><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell class="truncate"><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell class="truncate"><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
          </Table.Row>
        {/each}
      {:then rooms}
        {#each rooms ?? [] as room}
          <Table.Row>
            <Table.Cell class="">
              <TableMenu {room} updateRoomForm={data.updateRoomForm} />
            </Table.Cell>
            <Table.Cell class="truncate font-medium">{room.department}</Table.Cell>
            <Table.Cell class="truncate font-medium">{room.type}</Table.Cell>
            <Table.Cell class="truncate">{room.number}</Table.Cell>
            <Table.Cell class="truncate">{room.code}</Table.Cell>
            <Table.Cell class="truncate ">
              {new Date(room.created_at).toLocaleDateString()} @
              {new Date(room.created_at).toLocaleTimeString()}
            </Table.Cell>
          </Table.Row>
        {/each}
      {/await}
    </Table.Body>
  </Table.Root>
</div>
