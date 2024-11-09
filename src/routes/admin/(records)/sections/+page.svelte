<script lang="ts">
  import * as Table from '$lib/components/ui/table/index.js';
  import AddSection from './components/AddSection/AddSection.svelte';
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
      <AddSection addSectionForm={data.addSectionForm} />
    </div>
  </div>

  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[50px]"></Table.Head>
        <Table.Head class="w-full truncate">Class</Table.Head>
        <Table.Head class="w-[100px] truncate">Department</Table.Head>
        <Table.Head class="w-[100px] truncate">Section Code</Table.Head>
        <Table.Head class="truncate">Created At</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#await data.sections}
        {#each Array(5) as _}
          <Table.Row>
            <Table.Cell class="">
              <Skeleton class="h-[20px] rounded-full" />
            </Table.Cell>
            <Table.Cell class="truncate font-medium"
              ><Skeleton class="h-[20px] rounded-full" /></Table.Cell
            >
            <Table.Cell class=""><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell class="text-right"><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell class="text-right"><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
          </Table.Row>
        {/each}
      {:then sections}
        {#each sections ?? [] as section}
          <Table.Row>
            <Table.Cell class="">
              <TableMenu {section} updateSectionForm={data.updateSectionForm} />
            </Table.Cell>
            <Table.Cell class="truncate font-medium">{section.class}</Table.Cell>
            <Table.Cell class="truncate">{section.department}</Table.Cell>
            <Table.Cell class="truncate">{section.section_code}</Table.Cell>
            <Table.Cell class="truncate">
              {new Date(section.created_at).toLocaleDateString()} @
              {new Date(section.created_at).toLocaleTimeString()}
            </Table.Cell>
          </Table.Row>
        {/each}
      {/await}
    </Table.Body>
  </Table.Root>
</div>
