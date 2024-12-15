<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton/index';
	import Table from './components/Table/components/Table.svelte';
	import { columns } from './components/Table/components/columns';

	import { initTableState } from './components/Table/tableState.svelte';
	import DeleteSchedule from './components/DeleteSchedule/DeleteSchedule.svelte';
	import UpdateSchedule from './components/UpdateSchedule/UpdateSchedule.svelte';
	import ViewCalendar from './components/ViewCalendar/ViewCalendar.svelte';
	import { convert24HourTo12Hour } from '$lib/index';
	const { data } = $props();

	initTableState();
</script>

<div class="mt-6">
	{#await data.streamClassSchedules}
		<section class="flex flex-col gap-1.5">
			<Skeleton class="h-[20px] w-[100%] rounded-full" />
			<Skeleton class="h-[20px] w-[80%] rounded-full" />
			<Skeleton class="h-[20px] w-[30%] rounded-full" />
			<Skeleton class="h-[20px] w-[90%] rounded-full" />
		</section>
	{:then classSchedules}
		<!--Typescript error from supabase in year_level it must not be array-->
		<Table
			addScheduleForm={data.addScheduleForm}
			data={classSchedules?.map((cSched) => ({
				...cSched,
				professor: `${cSched.professors_tb?.user_meta_data.lastName}, ${cSched.professors_tb?.user_meta_data.firstName} ${cSched.professors_tb?.user_meta_data.middleName}`,
				time: `${convert24HourTo12Hour(cSched.initial_time)} - ${convert24HourTo12Hour(cSched.final_time)}`,
				courseCode: cSched.subjects_tb?.code ?? '',
				units: cSched.subjects_tb?.unit ?? 0,
				department: `${cSched.programs_tb?.code},${cSched.programs_tb?.id}`,
				school_year: `${cSched.school_years_tb?.year},${cSched.school_years_tb?.id}`,
				year_level: `${cSched.year_levels_tb?.levels[0].yearLevel},${cSched.year_levels_tb?.id}`,
				section: `${cSched.sections_tb?.section_code},${cSched.sections_tb?.id}`,
				section_class: cSched.sections_tb?.class ?? '',
				subject: `${cSched.subjects_tb?.name},${cSched.subjects_tb?.id}`,
				room: `${cSched.rooms_tb?.code},${cSched.rooms_tb?.id}`
			})) ?? []}
			{columns}
		/>
	{/await}
</div>

<DeleteSchedule />
<UpdateSchedule updateScheduleForm={data.updateScheduleForm} />
<ViewCalendar />
