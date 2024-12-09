<script lang="ts">
  import AddRoom from './components/AddRoom/AddRoom.svelte';
  import { Skeleton } from '$lib/components/ui/skeleton/index';
  import Table from './components/Table/components/Table.svelte';
  import { columns } from './components/Table/components/columns';
  import UpdateRoom from './components/UpdateRoom/UpdateRoom.svelte';
  import DeleteRoom from './components/DeleteRoom/DeleteRoom.svelte';
  import { initTableState } from './components/Table/tableState.svelte';

  const { data } = $props();

  initTableState();
</script>

<div class="sticky top-2 z-30 flex justify-end">
  <AddRoom addRoomForm={data.addRoomForm} />
</div>

<div class="mt-6">
  {#await data.streamRooms}
    <section class="flex flex-col gap-1.5">
      <Skeleton class="h-[20px] w-[100%] rounded-full" />
      <Skeleton class="h-[20px] w-[80%] rounded-full" />
      <Skeleton class="h-[20px] w-[30%] rounded-full" />
      <Skeleton class="h-[20px] w-[90%] rounded-full" />
    </section>
  {:then rooms}
    <Table
      data={rooms?.map((v) => ({ ...v, department: v.programs_tb?.code ?? '' })) ?? []}
      {columns}
    />
  {/await}
</div>

<UpdateRoom updateRoomForm={data.updateRoomForm} />
<DeleteRoom />
