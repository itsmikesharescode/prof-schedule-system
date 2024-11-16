<script lang="ts">
  import AddSchoolYear from './components/AddSchoolYear/AddSchoolYear.svelte';
  import { Skeleton } from '$lib/components/ui/skeleton/index';
  import Table from './components/Table/components/Table.svelte';
  import { columns } from './components/Table/components/columns';

  const { data } = $props();
</script>

<div class="sticky top-2 z-30 flex justify-end">
  <AddSchoolYear addSchoolYearForm={data.addSchoolYearForm} />
</div>

<div class="mt-6">
  {#await data.streamSchoolYear}
    <section class="flex flex-col gap-1.5">
      <Skeleton class="h-[20px] w-[100%] rounded-full" />
      <Skeleton class="h-[20px] w-[80%] rounded-full" />
      <Skeleton class="h-[20px] w-[30%] rounded-full" />
      <Skeleton class="h-[20px] w-[90%] rounded-full" />
    </section>
  {:then schoolYears}
    <Table data={schoolYears ?? []} {columns} />
  {/await}
</div>

<!-- <div class="flex flex-col gap-4">
  <div class="sticky top-2 z-30 flex justify-end">
    <AddSchoolYear addSchoolYearForm={data.addSchoolYearForm} />
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
</div> -->
