<script lang="ts">
  import type { ClassSchedulesPageTable } from '../data/schemas';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import PrinterCheck from 'lucide-svelte/icons/printer-check';
  import { buttonVariants } from '$lib/components/ui/button';
  import ChevronDown from 'lucide-svelte/icons/chevron-down';

  interface Props {
    data: ClassSchedulesPageTable[];
  }

  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { tick } from 'svelte';

  const { data }: Props = $props();

  let toBePrinted = $state<ClassSchedulesPageTable[]>([]);
  let open = $state(false);

  const handleAfterPrint = () => {
    open = false;
  };

  $effect(() => {
    addEventListener('afterprint', handleAfterPrint);
    return () => {
      removeEventListener('afterprint', handleAfterPrint);
    };
  });

  const handleMorningPrint = () => {
    toBePrinted = data.filter((schedule) => {
      const initialTime = new Date(`1970-01-01T${schedule.initial_time}`);
      const noonTime = new Date(`1970-01-01T12:00:00`);
      return initialTime < noonTime;
    });
    open = true;
    tick().then(() => {
      setTimeout(() => {
        print();
      }, 2000);
    });
  };

  const handleAfternoonPrint = () => {
    toBePrinted = data.filter((schedule) => {
      const initialTime = new Date(`1970-01-01T${schedule.initial_time}`);
      const noonTime = new Date(`1970-01-01T12:00:00`);
      const eveningTime = new Date(`1970-01-01T18:00:00`);
      return initialTime >= noonTime && initialTime < eveningTime;
    });

    open = true;
    tick().then(() => {
      setTimeout(() => {
        print();
      }, 2000);
    });
  };

  const handleEveningPrint = () => {
    toBePrinted = data.filter((schedule) => {
      const initialTime = new Date(`1970-01-01T${schedule.initial_time}`);
      const eveningTime = new Date(`1970-01-01T18:00:00`);
      return initialTime >= eveningTime;
    });

    open = true;
    tick().then(() => {
      setTimeout(() => {
        print();
      }, 2000);
    });
  };

  const detectMorningAfternoonEvening = (time: string) => {
    if (!(time.length > 1)) return '';
    const initialTime = new Date(`1970-01-01T${time}`);
    const noonTime = new Date(`1970-01-01T12:00:00`);
    const eveningTime = new Date(`1970-01-01T18:00:00`);
    return initialTime < noonTime
      ? 'Morning Classes'
      : initialTime >= noonTime && initialTime < eveningTime
        ? 'Afternoon Classes'
        : 'Evening Classes';
  };

  const groupBySection = (schedules: ClassSchedulesPageTable[]) => {
    return schedules.reduce(
      (acc, schedule) => {
        if (!acc[schedule.section]) {
          acc[schedule.section] = [];
        }
        acc[schedule.section].push(schedule);
        return acc;
      },
      {} as Record<string, ClassSchedulesPageTable[]>
    );
  };
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger class={buttonVariants({ variant: 'outline', size: 'sm' })}>
    Print Class Schedules <ChevronDown />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Item onclick={handleMorningPrint}>
        <PrinterCheck />
        Morning Classes
      </DropdownMenu.Item>
      <DropdownMenu.Item onclick={handleAfternoonPrint}>
        <PrinterCheck />
        Afternoon Classes
      </DropdownMenu.Item>
      <DropdownMenu.Item onclick={handleEveningPrint}>
        <PrinterCheck />
        Evening Classes
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

<AlertDialog.Root {open}>
  <AlertDialog.Content class="flex h-full max-w-full flex-col gap-5 overflow-auto">
    {#each Object.entries(groupBySection(toBePrinted)) as [section, schedules]}
      <!--Header (now shows once per section)-->
      <section class="grid grid-cols-[1fr,2fr] border-2">
        <div class="grid min-h-20 grid-cols-2">
          <div class="grid grid-cols-2 items-center gap-2.5 border-r-2">
            <img src="/favicon.png" class="w-full" alt="logo" />
            <span class="text-xl font-bold">ONE Cainta College</span>
          </div>
          <div class="flex flex-col items-center justify-center">
            <span class="text-center text-xl font-bold">SUBJECT OFFERINGS</span>
            <span class="font-semibold underline"
              >{detectMorningAfternoonEvening(schedules[0].initial_time)}</span
            >
          </div>
        </div>

        <div class="flex flex-col border-l-2">
          <div class="relative flex flex-col items-center justify-center border-b-2 p-2">
            <span class="absolute bottom-0 left-2 top-0 flex items-center font-light">Section</span>
            <span class="text-sm">{schedules[0].subject.split(',')[0]}</span>
            <span class="text-2xl font-semibold">{schedules[0].section.split(',')[0]}</span>
          </div>
          <div class="grid h-full grid-cols-2">
            <div class="flex items-center justify-between border-r-2 p-2">
              <span class="font-light">School Year</span>
              <span class="font-semibold">{schedules[0].school_year.split(',')[0]}</span>
            </div>
            <div class="flex items-center justify-between p-2">
              <span class="font-light">Semister</span>
              <span class="font-semibold">{schedules[0].semester.split(',')[0]}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="flex flex-col border-2">
        <!--SubHeader (now shows once per section)-->
        <div class="grid grid-cols-[1fr,2fr,1fr,1fr,1fr,1fr] border-b-2">
          <div class="flex items-center justify-center border-r-2 p-2">
            <span class="">Course Code</span>
          </div>

          <div class="flex items-center justify-center border-r-2 p-2">
            <span class="">Course Title</span>
          </div>

          <div class="flex items-center justify-center border-r-2 p-2">
            <span class="">Day</span>
          </div>

          <div class="flex items-center justify-center border-r-2 p-2">
            <span class="">Units</span>
          </div>

          <div class="flex items-center justify-center border-r-2 p-2">
            <span class="">Instructor</span>
          </div>

          <div class="flex items-center justify-center border-r-2 p-2">
            <span class="">Room</span>
          </div>
        </div>

        {#each schedules as schedule}
          <div class="grid grid-cols-[1fr,2fr,1fr,1fr,1fr,1fr] border-b-2">
            <div class="flex items-center justify-center border-r-2 p-2">
              <span class="">{schedule.courseCode}</span>
            </div>

            <div class="flex items-center justify-center border-r-2 p-2">
              <span class="">{schedule.subject.split(',')[0]}</span>
            </div>

            <div class="flex items-center justify-center border-r-2 p-2">
              <span class="">{schedule.day}</span>
            </div>

            <div class="flex items-center justify-center border-r-2 p-2">
              <span class="">{schedule.units}</span>
            </div>

            <div class="flex items-center justify-center border-r-2 p-2">
              <span class="">{schedule.professor}</span>
            </div>

            <div class="flex items-center justify-center border-r-2 p-2">
              <span class="">{schedule.room.split(',')[0]}</span>
            </div>
          </div>
        {/each}
      </section>
    {/each}
  </AlertDialog.Content>
</AlertDialog.Root>
