<script lang="ts">
  import * as Table from '$lib/components/ui/table/index.js';
  import TableMenu from './components/TableMenu.svelte';
  import AddProfessor from './components/AddProfessor/AddProfessor.svelte';
  import { departments } from '$lib/metadata';
  import { page } from '$app/stores';
  import { Skeleton } from '$lib/components/ui/skeleton/index';
  import FilterPicker from '$lib/components/general/FilterPicker.svelte';

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
        <Table.Head class="text-right">Prof ID</Table.Head>
        <Table.Head class="text-right">Position</Table.Head>
        <Table.Head class="text-right">Department</Table.Head>
        <Table.Head class="text-right">Status</Table.Head>
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
            <Table.Cell class="text-right"><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell class="text-right"><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell class="text-right"><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
          </Table.Row>
        {/each}
      {/if}

      {#each Array(20) as _}
        <Table.Row>
          <Table.Cell class="">
            <TableMenu updateProfessorForm={data.updateProfessorForm} />
          </Table.Cell>
          <Table.Cell class="font-medium">123123xx2</Table.Cell>
          <Table.Cell>sample@gmail.com</Table.Cell>
          <Table.Cell>Magdiwang, Magdalo Macapagal</Table.Cell>
          <Table.Cell class="text-right">25436x</Table.Cell>
          <Table.Cell class="text-right">Professor</Table.Cell>
          <Table.Cell class="text-right">IT</Table.Cell>
          <Table.Cell class="text-right">Active</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
