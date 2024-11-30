<script lang="ts">
  import { page } from '$app/stores';
  import { Skeleton } from '$lib/components/ui/skeleton/index';
  import Table from './components/Table/components/Table.svelte';
  import { columns } from './components/Table/components/columns';
  import CreateRequest from './components/CreateRequest/CreateRequest.svelte';
  import UpdateRequest from './components/UpdateRequest/UpdateRequest.svelte';
  import DeleteRequest from './components/DeleteRequest/DeleteRequest.svelte';
  import { initTableState } from './components/Table/tableState.svelte';

  const { data } = $props();

  initTableState();
</script>

<main class="py-[3rem]">
  <span class="text-3xl font-bold">Request</span>

  <div class="sticky top-2 z-30 flex justify-end">
    <CreateRequest createRequestForm={data.createRequestForm} />
  </div>
  <section class="mt-6">
    {#await data.getRequest}
      <Skeleton class="h-[20px] w-[100%] rounded-full" />
    {:then requests}
      <Table
        data={requests?.map((item) => ({
          id: item.id,
          reference_id: item.reference_id,
          created_at: item.created_at,
          professor_id: item.professor_id,
          status: item.status,
          day: item.schedule.day,
          start_time: item.schedule.startTime,
          end_time: item.schedule.endTime,
          schedule: item.schedule,
          reason: item.reason
        })) ?? []}
        {columns}
      />
    {/await}
  </section>
</main>

<UpdateRequest updateRequestForm={data.updateRequestForm} />
<DeleteRequest />
