<script lang="ts">
  import { Skeleton } from '$lib/components/ui/skeleton/index';
  import Table from './components/Table/components/Table.svelte';
  import { columns } from './components/Table/components/columns';
  import { initTableState } from './components/Table/tableState.svelte';
  import ViewRequestComparison from './components/ViewRequestComparison/ViewRequestComparison.svelte';
  import UpdateRequestStatus from './components/UpdateRequestStatus/UpdateRequestStatus.svelte';
  import DeleteRequest from './components/DeleteRequest/DeleteRequest.svelte';

  const { data } = $props();

  initTableState();
</script>

<div class="mt-6">
  {#await data.getRequests}
    <section class="flex flex-col gap-1.5">
      <Skeleton class="h-[20px] w-[100%] rounded-full" />
      <Skeleton class="h-[20px] w-[80%] rounded-full" />
      <Skeleton class="h-[20px] w-[30%] rounded-full" />
      <Skeleton class="h-[20px] w-[90%] rounded-full" />
    </section>
  {:then requests}
    <Table
      data={requests?.map((req) => ({
        full_name: `${req.professors_tb?.user_meta_data.lastName} ${req.professors_tb?.user_meta_data.firstName} ${req.professors_tb?.user_meta_data.middleName}`,
        ...req
      })) ?? []}
      {columns}
    />
  {/await}
</div>

<ViewRequestComparison />
<UpdateRequestStatus updateRequestStatusForm={data.updateRequestStatusForm} />
<DeleteRequest />
