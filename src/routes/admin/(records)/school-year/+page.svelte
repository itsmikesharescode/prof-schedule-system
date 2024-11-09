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

  const supabaseState = useSupabaseState();
  const supabase = supabaseState.get();

  const detectURL = $derived($page.url.searchParams.get('filter'));

  const streamSchoolYear = async () => {
    if (!supabase) return null;
    // add pagination limit to 10 or 50 if needs scalability
    const { data, error } = await supabase
      .from('school_years_tb')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) return null;
    return data;
  };

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
    <Table.Caption>A list of your recent invoices.</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[50px]"></Table.Head>
        <Table.Head class="w-[100px] truncate">School Year</Table.Head>
        <Table.Head class="text-right">Created At</Table.Head>
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
            <Table.Cell class="text-right"><Skeleton class="h-[20px] rounded-full" /></Table.Cell>
          </Table.Row>
        {/each}
      {/if}

      {#each Array(20) as _}
        <Table.Row>
          <Table.Cell class="">
            <TableMenu updateSchoolYearForm={data.updateSchoolYearForm} />
          </Table.Cell>
          <Table.Cell class="font-medium">123123xx2</Table.Cell>
          <Table.Cell class="text-right">{new Date().toLocaleDateString()}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
