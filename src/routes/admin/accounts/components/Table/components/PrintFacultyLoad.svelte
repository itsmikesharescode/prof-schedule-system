<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import streamFacultyLoad from '../../../../(db_calls)/streamFacultyLoad';
  import { page } from '$app/stores';
  import { useTableState } from '../tableState.svelte';
  import { tick } from 'svelte';
  import { toast } from 'svelte-sonner';
  import { convert24HourTo12Hour } from '$lib';
  import { onMount, onDestroy } from 'svelte';

  const tableState = useTableState();

  let toBePrinted = $state<Awaited<ReturnType<typeof streamFacultyLoad>>>(null);

  const handleAfterPrint = () => {
    tableState.setShowPrintFacultyLoad(false);
  };

  $effect(() => {
    addEventListener('afterprint', handleAfterPrint);
    return () => {
      removeEventListener('afterprint', handleAfterPrint);
    };
  });

  const handlePrintFacultyLoad = async () => {
    if (!$page.data.supabase) return;

    toBePrinted = await streamFacultyLoad(
      $page.data.supabase,
      tableState.getActiveRow()?.user_id ?? ''
    );

    if (!toBePrinted?.length) {
      toast.error('No faculty load found');
      tableState.setActiveRow(null);
      tableState.setShowPrintFacultyLoad(false);
      return;
    }

    setTimeout(() => {
      print();
    }, 500);
  };

  const open = $derived.by(() => {
    if (tableState.getShowPrintFacultyLoad()) {
      tick().then(async () => {
        await handlePrintFacultyLoad();
      });
      return true;
    }

    return false;
  });
</script>

<AlertDialog.Root {open}>
  <AlertDialog.Content class="flex h-full max-w-full flex-col overflow-auto text-xs">
    <!--Header-->
    <section class="grid grid-cols-[1fr,2fr,2fr] border-2">
      <div class="grid grid-cols-2 items-center gap-2.5 border-r-2 p-2">
        <img src="/favicon.png" class="w-full" alt="logo" />
        <span class="text-xl font-bold">ONE Cainta College</span>
      </div>

      <div class="flex items-center justify-center border-r-2 p-2">
        <span class="text-center text-3xl font-semibold">FACULTY ASSIGNMENT</span>
      </div>

      <div class="grid grid-cols-2">
        <div class="relative flex items-center justify-center border-r-2 p-2">
          <span class="absolute left-2 top-2">School Year</span>
          <span class="">{toBePrinted?.[0]?.school_years_tb?.year}</span>
        </div>
        <div class="relative flex items-center justify-center p-2">
          <span class="absolute left-2 top-2">Semester</span>
          <span class="">{toBePrinted?.[0]?.semester}</span>
        </div>
      </div>
    </section>

    <!--Professor Header-->
    <section>
      <section class="grid grid-cols-[1fr,2fr,1fr,2fr] border-2">
        <div class="flex border-r-2 p-2">
          <span class="">EMP NO</span>
        </div>
        <div class="flex border-r-2 p-2">
          <span class="text-center"></span>
        </div>
        <div class="flex border-r-2 p-2">
          <span class="text-center">COLLEGE</span>
        </div>
        <div class="flex p-2">
          <span class="text-center"></span>
        </div>
      </section>

      <section class="grid grid-cols-[1fr,2fr,1fr,2fr] border-2 border-t-0">
        <div class="flex border-r-2 p-2">
          <span class="">EMP NAME</span>
        </div>
        <div class="flex border-r-2 p-2">
          <span class="text-center"
            >{tableState.getActiveRow()?.firstName.toUpperCase()}
            {tableState.getActiveRow()?.middleName.toUpperCase()[0]}.
            {tableState.getActiveRow()?.lastName.toUpperCase()}</span
          >
        </div>
        <div class="flex border-r-2 p-2">
          <span class="text-center">DEPARTMENT</span>
        </div>
        <div class="flex p-2">
          <span class="text-center">{tableState.getActiveRow()?.department}</span>
        </div>
      </section>

      <section class="grid grid-cols-[1fr,2fr,1fr,2fr] border-2 border-t-0">
        <div class="flex border-r-2 p-2">
          <span class="">EMP STATUS</span>
        </div>
        <div class="flex border-r-2 p-2">
          <span class="text-center"
            >{tableState.getActiveRow()?.schedule.available.toUpperCase()}</span
          >
        </div>
        <div class="flex border-r-2 p-2">
          <span class="text-center"></span>
        </div>
        <div class="flex p-2">
          <span class="text-center"></span>
        </div>
      </section>
    </section>
    <!--Regular Load-->
    <section>
      <span class="font-semibold">
        {tableState.getActiveRow()?.schedule.available === 'Part Time'
          ? 'PART-TIME LOAD'
          : 'REGULAR LOAD'}
      </span>
      <section class="grid grid-cols-[1fr,2fr,1fr,2fr,1fr,1fr,1fr,1fr,1fr] border-2">
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="text-center">Subject Code</span>
        </div>
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="text-center">Subject Description</span>
        </div>
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="text-center">Units</span>
        </div>
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="text-center">Year and Section</span>
        </div>

        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="text-center">Subject Ref</span>
        </div>
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="text-center">Time</span>
        </div>
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="text-center">Days</span>
        </div>
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="text-center">Room</span>
        </div>
        <div class="flex items-center justify-center p-2">
          <span class="text-center">Effectivity</span>
        </div>
      </section>

      {#each toBePrinted ?? [] as load}
        <section class="grid grid-cols-[1fr,2fr,1fr,2fr,1fr,1fr,1fr,1fr,1fr] border-2 border-t-0">
          <div class="flex items-center justify-center border-r-2 p-2">
            <span class="min-h-8 text-center">{load.subjects_tb?.code}</span>
          </div>
          <div class="flex items-center justify-center border-r-2 p-2">
            <span class="min-h-8">{load.subjects_tb?.name}</span>
          </div>
          <div class="flex items-center justify-center border-r-2 p-2">
            <span class="min-h-8 text-center">{load.subjects_tb?.unit}</span>
          </div>
          <div class="flex items-center justify-center border-r-2 p-2">
            <span class="min-h-8 text-center">{load.sections_tb?.section_code}</span>
          </div>

          <div class="flex items-center justify-center border-r-2 p-2">
            <span class="min-h-8 text-center"></span>
          </div>
          <div class="flex items-center justify-center border-r-2 p-2">
            <span class="min-h-8 text-center">
              {convert24HourTo12Hour(load.initial_time)} -
              {convert24HourTo12Hour(load.final_time)}
            </span>
          </div>
          <div class="flex items-center justify-center border-r-2 p-2">
            <span class="min-h-8 text-center">{load.day}</span>
          </div>
          <div class="flex items-center justify-center border-r-2 p-2">
            <span class="min-h-8 text-center">{load.rooms_tb?.number}</span>
          </div>
          <div class="flex items-center justify-center p-2">
            <span class="min-h-8 text-center">{new Date(load.created_at).toLocaleDateString()}</span
            >
          </div>
        </section>
      {/each}

      <span class="font-semibold">
        TOTAL {tableState.getActiveRow()?.schedule.available === 'Part Time'
          ? 'PART-TIME LOAD'
          : 'REGULAR LOAD'}:
        <span class="underline"
          >{toBePrinted
            ?.map((item) => item.subjects_tb?.unit)
            .reduce((a, b) => (a ?? 0) + (b ?? 0), 0)}</span
        >
      </span>
    </section>

    <!--Temporary Substitution Load-->
    <section>
      <span class="font-semibold">TEMPORARY SUBSTITUTION LOAD</span>
      <section class="grid grid-cols-[1fr,2fr,1fr,2fr,1fr,1fr,1fr,1fr,1fr,1fr] border-2">
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="text-center">Subject Code</span>
        </div>
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="text-center">Subject Description</span>
        </div>
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="text-center">Units</span>
        </div>
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="text-center">Year and Section</span>
        </div>
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="text-center">Subject Code</span>
        </div>
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="text-center">Subject Ref</span>
        </div>
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="text-center">Time</span>
        </div>
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="text-center">Days</span>
        </div>
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="text-center">Room</span>
        </div>
        <div class="flex items-center justify-center p-2">
          <span class="text-center">Effectivity</span>
        </div>
      </section>

      <section class="grid grid-cols-[1fr,2fr,1fr,2fr,1fr,1fr,1fr,1fr,1fr,1fr] border-2 border-t-0">
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="min-h-8 text-center"></span>
        </div>
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="min-h-8 text-center"></span>
        </div>
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="min-h-8 text-center"></span>
        </div>
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="min-h-8 text-center"></span>
        </div>
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="min-h-8 text-center"></span>
        </div>
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="min-h-8 text-center"></span>
        </div>
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="min-h-8 text-center"></span>
        </div>
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="min-h-8 text-center"></span>
        </div>
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="min-h-8 text-center"></span>
        </div>
        <div class="flex items-center justify-center p-2">
          <span class="min-h-8 text-center"></span>
        </div>
      </section>
      <span class="font-semibold"
        >TOTAL TEMPORARY SUBSTITUTION LOAD: <span class="underline">10</span></span
      >
    </section>

    <!--Teaching Load per day (hours)-->
    <section class="flex flex-col">
      <span class="text-center font-semibold">TEACHING LOAD PER DAY (HOURS)</span>
      <section class="grid grid-cols-8 border-2">
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center">MON</div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center">TUE</div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center">WED</div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center">THUR</div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center">FRI</div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center">SAT</div>
        <div class="flex min-h-8 items-center justify-center text-center">TOTAL</div>
      </section>

      <section class="grid grid-cols-8 border-2 border-t-0">
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center">REGULAR</div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center text-center"></div>
      </section>

      <section class="grid grid-cols-8 border-2 border-t-0">
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center">PART-TIME</div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center text-center"></div>
      </section>

      <section class="grid grid-cols-8 border-2 border-t-0">
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center">
          TEMPORARY SUBSTITUTION
        </div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center text-center"></div>
      </section>

      <section class="grid grid-cols-8 border-2 border-t-0">
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center">TOTAL</div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center text-center"></div>
      </section>
    </section>

    <!--OFFICIAL TIME / ADVISING TIME-->
    <section class="flex flex-col">
      <span class="text-center font-semibold">OFFICIAL TIME / ADVISING TIME</span>
      <section class="grid grid-cols-8 border-2">
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center">MON</div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center">TUE</div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center">WED</div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center">THUR</div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center">FRI</div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center">SAT</div>
        <div class="flex min-h-8 items-center justify-center text-center">TOTAL</div>
      </section>

      <section class="grid grid-cols-8 border-2 border-t-0">
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center">
          OFFICIAL TIME
        </div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center text-center"></div>
      </section>

      <section class="grid grid-cols-8 border-2 border-t-0">
        <div class="flex min-h-8 items-center justify-center text-center">ADVISING TIME</div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center text-center"></div>
      </section>

      <section class="grid grid-cols-8 border-2 border-t-0">
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center">TOTAL</div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center border-r-2 text-center"></div>
        <div class="flex min-h-8 items-center justify-center text-center"></div>
      </section>
    </section>

    <section class="flex flex-col items-center gap-10 p-2 pb-20">
      <span class="font-semibold">By authority of the Board of Trustees:</span>
      <span class="font-semibold">APPROVED:</span>
    </section>
  </AlertDialog.Content>
</AlertDialog.Root>
