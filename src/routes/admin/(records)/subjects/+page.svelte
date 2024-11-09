<script lang="ts">
  import * as Table from '$lib/components/ui/table/index.js';
  import AddSubject from './components/AddSubject/AddSubject.svelte';
  import TableMenu from './components/TableMenu.svelte';
  import { departments } from '$lib/metadata';
  import { Skeleton } from '$lib/components/ui/skeleton/index';
  import FilterPicker from '$lib/components/general/FilterPicker.svelte';

  const { data } = $props();
</script>

<div class="flex flex-col gap-4">
  <div class="sticky top-2 z-30 flex justify-end">
    <AddSubject addSubjectForm={data.addSubjectForm} />
  </div>

  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[50px]"></Table.Head>
        <Table.Head class="truncate">Subject Name</Table.Head>
        <Table.Head class="truncate">Department</Table.Head>
        <Table.Head class="truncate">Subject Code</Table.Head>
        <Table.Head class="truncate">Unit</Table.Head>
        <Table.Head class="truncate">Created At</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#await data.subjects}
        {#each Array(5) as _}
          <Table.Row>
            <Table.Cell class="">
              <Skeleton class="h-[20px] rounded-full" />
            </Table.Cell>
            <Table.Cell class="truncate font-medium"
              ><Skeleton class="h-[20px] rounded-full" /></Table.Cell
            >
            <Table.Cell class=""><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell class=""><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell class=""><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell class=""><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
          </Table.Row>
        {/each}
      {:then subjects}
        {#each subjects ?? [] as subject}
          <Table.Row>
            <Table.Cell class="">
              <TableMenu {subject} updateSubjectForm={data.updateSubjectForm} />
            </Table.Cell>
            <Table.Cell class="truncate font-medium">{subject.name}</Table.Cell>
            <Table.Cell class="truncate font-medium">{subject.department}</Table.Cell>
            <Table.Cell class="truncate font-medium">{subject.code}</Table.Cell>
            <Table.Cell class="truncate font-medium">{subject.unit}</Table.Cell>
            <Table.Cell class="truncate">
              {@html new Date(subject.created_at).toLocaleDateString()} @
              {@html new Date(subject.created_at).toLocaleTimeString()}
            </Table.Cell>
          </Table.Row>
        {/each}
      {/await}
    </Table.Body>
  </Table.Root>
</div>
