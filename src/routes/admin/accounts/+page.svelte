<script lang="ts">
  import * as Table from '$lib/components/ui/table/index.js';
  import TableMenu from './components/TableMenu.svelte';
  import AddProfessor from './components/AddProfessor/AddProfessor.svelte';

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
        <Table.Head class="w-[100px]">Department</Table.Head>
        <Table.Head>Description</Table.Head>
        <Table.Head>Program Head</Table.Head>
        <Table.Head class="text-right">Created At</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each Array(20) as _}
        <Table.Row>
          <Table.Cell class="">
            <TableMenu updateProfessorForm={data.updateProfessorForm} />
          </Table.Cell>
          <Table.Cell class="font-medium">BSIS</Table.Cell>
          <Table.Cell>Bachelor of Science in Information System</Table.Cell>
          <Table.Cell>Magdiwang, Magdalo Macapagal</Table.Cell>
          <Table.Cell class="text-right">{new Date().toLocaleDateString()}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
