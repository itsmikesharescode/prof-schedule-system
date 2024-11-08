<script lang="ts">
  import * as Table from '$lib/components/ui/table/index.js';
  import TableMenu from './components/TableMenu.svelte';
  import FilterPicker from '$lib/components/general/FilterPicker.svelte';
  import { departments } from '$lib/metadata';
  import { page } from '$app/stores';
  import { Skeleton } from '$lib/components/ui/skeleton/index';
  import AddFaculty from './components/AddFaculty/AddFaculty.svelte';

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
    <div class="flex w-full items-center justify-between">
      <FilterPicker name="Select filter" class="max-w-fit" selections={departments} />
      <AddFaculty addFacultyForm={data.addFacultyForm} />
    </div>
  </div>

  <Table.Root>
    <Table.Caption>A list of your recent invoices.</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[50px]"></Table.Head>
        <Table.Head class="w-[100px]">Year Level</Table.Head>
        <Table.Head>Section</Table.Head>
        <Table.Head>Subject Name</Table.Head>
        <Table.Head class="truncate">Subject Code</Table.Head>
        <Table.Head>Units</Table.Head>
        <Table.Head>Professor</Table.Head>
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
            <TableMenu />
          </Table.Cell>
          <Table.Cell class="font-medium">3rd Year</Table.Cell>
          <Table.Cell>1M</Table.Cell>
          <Table.Cell>Capstone Project 1</Table.Cell>
          <Table.Cell class="">Caps01</Table.Cell>
          <Table.Cell class="">3</Table.Cell>
          <Table.Cell class="">Juan Dela Cruz</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
