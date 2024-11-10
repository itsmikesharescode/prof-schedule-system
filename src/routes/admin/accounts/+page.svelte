<script lang="ts">
  import * as Table from '$lib/components/ui/table/index.js';
  import TableMenu from './components/TableMenu.svelte';
  import AddProfessor from './components/AddProfessor/AddProfessor.svelte';
  import { Skeleton } from '$lib/components/ui/skeleton/index';

  const { data } = $props();
</script>

<div class="flex flex-col gap-4">
  <div class="fixed bottom-3 right-3 z-30 flex justify-end">
    <AddProfessor addProfessorForm={data.addProfessorForm} />
  </div>

  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[50px]"></Table.Head>
        <Table.Head class="w-[100px]">User ID</Table.Head>
        <Table.Head>Email</Table.Head>
        <Table.Head>Name</Table.Head>
        <Table.Head class="truncate">Position</Table.Head>
        <Table.Head class="truncate">Department</Table.Head>
        <Table.Head class="truncate">Status</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <!--Display if streaming data-->
      {#await data.streamProfessors}
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
      {:then professors}
        {#each professors ?? [] as professor}
          <Table.Row>
            <Table.Cell class="">
              <TableMenu {professor} updateProfessorForm={data.updateProfessorForm} />
            </Table.Cell>
            <Table.Cell class="truncate font-medium">{professor.user_id}</Table.Cell>
            <Table.Cell class="truncate">{professor.user_meta_data.email}</Table.Cell>
            <Table.Cell class="truncate">
              {professor.user_meta_data.title}
              {' '}
              {professor.user_meta_data.lastName}, {professor.user_meta_data.firstName}{' '}
              {professor.user_meta_data.middleName}
            </Table.Cell>
            <Table.Cell class="truncate">{professor.user_meta_data.role}</Table.Cell>
            <Table.Cell class="truncate">{professor.user_meta_data.department}</Table.Cell>
            <Table.Cell class="truncate">
              {professor.user_meta_data.approved ? 'Active' : 'Inactive'}
            </Table.Cell>
          </Table.Row>
        {/each}
      {/await}
    </Table.Body>
  </Table.Root>
</div>
