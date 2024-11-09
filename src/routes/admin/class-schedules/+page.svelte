<script lang="ts">
  import * as Table from '$lib/components/ui/table/index.js';
  import FilterPicker from '$lib/components/general/FilterPicker.svelte';
  import { departments } from '$lib/metadata';
  import { page } from '$app/stores';
  import { Skeleton } from '$lib/components/ui/skeleton/index';
  import TableMenu from './components/TableMenu.svelte';
  import AddSchedule from './components/AddSchedule/AddSchedule.svelte';

  const { data } = $props();

  const detectURL = $derived($page.url.searchParams.get('filter'));

  $effect(() => {
    if (detectURL) {
      //stream the filter here if there is no filter gather all rows, else filter it
    }
  });
</script>

<div class="flex flex-col gap-4">
  <div class="sticky top-2 z-30 flex justify-end">
    <AddSchedule addScheduleForm={data.addScheduleForm} />
  </div>

  <Table.Root>
    <Table.Caption>A list of your recent invoices.</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[50px]"></Table.Head>
        <Table.Head class="w-[100px] truncate">Subject Code</Table.Head>
        <Table.Head class="truncate">Subject Name</Table.Head>
        <Table.Head class="truncate">Unit</Table.Head>
        <Table.Head class="truncate">Day</Table.Head>
        <Table.Head class="truncate">Time</Table.Head>
        <Table.Head class="truncate">Room</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <!--Display if streaming data-->
      {#if false}
        {#each Array(5) as _}
          <Table.Row>
            <Table.Cell class="">
              <Skeleton class="h-[20px] rounded-full" />
            </Table.Cell>
            <Table.Cell class="font-medium"><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell class="text-right"><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
          </Table.Row>
        {/each}
      {/if}

      {#each Array(20) as _}
        <Table.Row>
          <Table.Cell class="">
            <TableMenu updateScheduleForm={data.updateScheduleForm} />
          </Table.Cell>
          <Table.Cell class="font-medium">ComEng101</Table.Cell>
          <Table.Cell>Computer Engineering</Table.Cell>
          <Table.Cell>3</Table.Cell>
          <Table.Cell class="">Monday</Table.Cell>
          <Table.Cell class="">8:00 AM - 10:00 PM</Table.Cell>
          <Table.Cell class="">ROOM 1</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
