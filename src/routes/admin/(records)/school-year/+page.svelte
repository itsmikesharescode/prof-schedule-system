<script lang="ts">
  import * as Table from '$lib/components/ui/table/index.js';
  import AddSchoolYear from './components/AddSchoolYear/AddSchoolYear.svelte';
  import TableMenu from './components/TableMenu.svelte';
  import { departments } from '$lib/metadata';
  import { page } from '$app/stores';
  import { Skeleton } from '$lib/components/ui/skeleton/index';
  import FilterPicker from '$lib/components/general/FilterPicker.svelte';
  import { useSupabaseState } from '$lib/runes/supabaseState.svelte';

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
      <AddSchoolYear addSchoolYearForm={data.addSchoolYearForm} />
    </div>
  </div>

  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[50px]"></Table.Head>
        <Table.Head class="truncate">School Year</Table.Head>
        <Table.Head class="truncate">Department</Table.Head>
        <Table.Head class="truncate">Created At</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#await data.streamSchoolYear}
        {#each Array(5) as _}
          <Table.Row>
            <Table.Cell class="">
              <Skeleton class="h-[20px] rounded-full" />
            </Table.Cell>
            <Table.Cell class="font-medium"><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell class="text-right"><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
            <Table.Cell class="text-right"><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
          </Table.Row>
        {/each}
      {:then schoolYears}
        {#each schoolYears ?? [] as schoolYear}
          <Table.Row>
            <Table.Cell class="">
              <TableMenu {schoolYear} updateSchoolYearForm={data.updateSchoolYearForm} />
            </Table.Cell>
            <Table.Cell class="truncate font-medium">{schoolYear.year}</Table.Cell>
            <Table.Cell class="truncate font-medium">{schoolYear.department}</Table.Cell>
            <Table.Cell class="truncate">
              {new Date(schoolYear.created_at).toLocaleDateString()} @
              {new Date(schoolYear.created_at).toLocaleTimeString()}
            </Table.Cell>
          </Table.Row>
        {/each}
      {/await}
    </Table.Body>
  </Table.Root>
</div>
