<script lang="ts">
  import * as Table from '$lib/components/ui/table/index.js';
  import AddSubject from './components/AddSubject/AddSubject.svelte';
  import TableMenu from './components/TableMenu.svelte';
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
    <div class="flex w-full items-center justify-between">
      <FilterPicker name="Select filter" class="max-w-fit" selections={departments} />
      <AddSubject addSubjectForm={data.addSubjectForm} />
    </div>
  </div>

  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[50px]"></Table.Head>
        <Table.Head class="w-full truncate">Subject Name</Table.Head>
        <Table.Head class="w-[100px] truncate">Department</Table.Head>
        <Table.Head class="w-[100px] truncate">Subject Code</Table.Head>
        <Table.Head class="w-[100px] truncate">Unit</Table.Head>
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
              <TableMenu updateSubjectForm={data.updateSubjectForm} />
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
