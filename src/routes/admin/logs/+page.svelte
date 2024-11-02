<script lang="ts">
  import * as Table from '$lib/components/ui/table/index.js';

  const { data } = $props();
</script>

<div class="flex flex-col gap-4">
  <Table.Root>
    <Table.Caption>A list of your recent invoices.</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[100px]">User ID</Table.Head>
        <Table.Head>Position</Table.Head>
        <Table.Head>Name</Table.Head>
        <Table.Head class="text-right">Timestamp</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each Array(20) as _}
        <Table.Row>
          <Table.Cell class="font-medium">asdssddx</Table.Cell>
          <Table.Cell>Professor</Table.Cell>
          <Table.Cell>Magdalo, Macapagal Magdiwang</Table.Cell>
          <Table.Cell class="text-right">{new Date()}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
