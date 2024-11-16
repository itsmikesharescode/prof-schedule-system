<script lang="ts">
  import { Skeleton } from '$lib/components/ui/skeleton/index';
  import Table from './components/Table/components/Table.svelte';
  import { columns } from './components/Table/components/columns';

  import AddSchedule from './components/AddSchedule/AddSchedule.svelte';

  const { data } = $props();
</script>

<div class="sticky top-2 z-30 flex justify-end">
  <AddSchedule addScheduleForm={data.addScheduleForm} />
</div>

<div class="mt-6">
  {#await data.streamDepartments}
    <section class="flex flex-col gap-1.5">
      <Skeleton class="h-[20px] w-[100%] rounded-full" />
      <Skeleton class="h-[20px] w-[80%] rounded-full" />
      <Skeleton class="h-[20px] w-[30%] rounded-full" />
      <Skeleton class="h-[20px] w-[90%] rounded-full" />
    </section>
  {:then professors}
    <!--  <Table
      data={professors?.map((prof) => ({
        created_at: prof.created_at,
        user_id: prof.user_id,
        fullName: `${prof.user_meta_data.lastName}, ${prof.user_meta_data.firstName} ${prof.user_meta_data.middleName}`,
        ...prof.user_meta _data
      })) ?? []}
      {columns}
    /> -->
  {/await}
</div>
