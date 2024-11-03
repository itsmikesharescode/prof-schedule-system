<script lang="ts">
  import * as Table from '$lib/components/ui/table/index.js';
  import AddSection from './components/AddSection/AddSection.svelte';
  import AddSchoolYear from './components/AddSection/AddSection.svelte';
  import TableMenu from './components/TableMenu.svelte';

  const { data } = $props();
</script>

<div class="flex flex-col gap-4">
  <div class="sticky top-2 z-30 flex justify-end">
    <AddSection addSectionForm={data.addSectionForm} />
  </div>

  <Table.Root>
    <Table.Caption>A list of your recent invoices.</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[50px]"></Table.Head>
        <Table.Head class="w-[100px] truncate">Class</Table.Head>
        <Table.Head class="w-[100px] truncate">Section Code</Table.Head>
        <Table.Head class="text-right">Created At</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each Array(20) as _}
        <Table.Row>
          <Table.Cell class="">
            <TableMenu updateSectionForm={data.updateSectionForm} />
          </Table.Cell>
          <Table.Cell class="truncate font-medium">Morning Class</Table.Cell>
          <Table.Cell class="">2M</Table.Cell>
          <Table.Cell class="text-right">{new Date().toLocaleDateString()}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
