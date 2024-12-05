<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import * as XLSX from 'xlsx';
  import ArrowRightUp from 'lucide-svelte/icons/arrow-up-right';

  interface Props {
    classSchedules: Promise<any[]>;
  }

  let { classSchedules }: Props = $props();

  async function fetchMe() {
    let sample = await classSchedules;
    console.log(sample);
  }

  $effect(() => {
    fetchMe();
  });

  const downloadExcel = async () => {
    const schedules = await classSchedules;
    const data = schedules
      .map((schedule) => {
        return schedule.subjects.map((subject) => ({
          'School Year': schedule.school_year,
          Semester: schedule.semester,
          'Year Level': schedule.year_level,
          Section: schedule.section,
          Department: schedule.department,
          'Subject Name': subject.name,
          Day: subject.day,
          Room: subject.room,
          'Start Time': subject.startTime,
          'End Time': subject.endTime
        }));
      })
      .flat();

    const worksheet = XLSX.utils.json_to_sheet(data);

    // Adjust column widths for better readability
    const cols = [
      { wch: 15 }, // School Year
      { wch: 15 }, // Semester
      { wch: 15 }, // Year Level
      { wch: 10 }, // Section
      { wch: 10 }, // Department
      { wch: 20 }, // Subject Name
      { wch: 10 }, // Day
      { wch: 10 }, // Room
      { wch: 10 }, // Start Time
      { wch: 10 } // End Time
    ];
    worksheet['!cols'] = cols;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Class Schedules');
    XLSX.writeFile(workbook, 'class_schedules.xlsx');
  };
</script>

<Button size="sm" variant="secondary" onclick={downloadExcel}>
  <ArrowRightUp class="size-4" />
  Export via Excel
</Button>
