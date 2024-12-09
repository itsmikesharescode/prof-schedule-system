<script lang="ts">
  import AddProfessor from './components/AddProfessor/AddProfessor.svelte';
  import { Skeleton } from '$lib/components/ui/skeleton/index';
  import Table from './components/Table/components/Table.svelte';
  import { columns } from './components/Table/components/columns';
  import UpdateProfessor from './components/UpdateProfessor/UpdateProfessor.svelte';
  import { initTableState } from './components/Table/tableState.svelte';
  import DeleteProfessor from './components/DeleteProfessor/DeleteProfessor.svelte';
  import UpdateStatus from './components/UpdateStatus/UpdateStatus.svelte';
  import PrintFacultyLoad from './components/Table/components/PrintFacultyLoad.svelte';
  const { data } = $props();

  initTableState();
</script>

<div class="sticky top-2 z-30 flex justify-end">
  <AddProfessor addProfessorForm={data.addProfessorForm} />
</div>

<div class="mt-6">
  {#await data.streamProfessors}
    <section class="flex flex-col gap-1.5">
      <Skeleton class="h-[20px] w-[100%] rounded-full" />
      <Skeleton class="h-[20px] w-[80%] rounded-full" />
      <Skeleton class="h-[20px] w-[30%] rounded-full" />
      <Skeleton class="h-[20px] w-[90%] rounded-full" />
    </section>
  {:then professors}
    <Table
      data={professors?.map((prof) => ({
        user_id: prof.user_id,
        created_at: prof.created_at,
        role: prof.user_meta_data.role,
        email: prof.user_meta_data.email,
        title: prof.user_meta_data.title,
        avatar: prof.user_meta_data.avatar,
        approved: prof.user_meta_data.approved,
        firstName: prof.user_meta_data.firstName,
        middleName: prof.user_meta_data.middleName,
        lastName: prof.user_meta_data.lastName,
        interests: prof.user_meta_data.interests,
        department: prof.user_meta_data.department,
        previousSchool: prof.user_meta_data.previousSchool,
        yearsOfTeaching: prof.user_meta_data.yearsOfTeaching,
        schedule: prof.user_meta_data.schedule
      })) ?? []}
      {columns}
    />
  {/await}
</div>

<PrintFacultyLoad />
<UpdateStatus updateStatusForm={data.updateStatusForm} />
<UpdateProfessor updateProfessorForm={data.updateProfessorForm} />
<DeleteProfessor />
