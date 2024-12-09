<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import streamFacultyLoad from '../../../../(db_calls)/streamFacultyLoad';
  import { page } from '$app/stores';
  import { useTableState } from '../tableState.svelte';
  import { tick } from 'svelte';
  import { toast } from 'svelte-sonner';

  const tableState = useTableState();

  let toBePrinted = $state<Awaited<ReturnType<typeof streamFacultyLoad>>>(null);

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

    console.log(toBePrinted);
  };

  $effect(() => {
    if (tableState.getShowPrintFacultyLoad()) {
      tick().then(async () => {
        await handlePrintFacultyLoad();
      });
    }
  });
</script>

<AlertDialog.Root open={tableState.getShowPrintFacultyLoad()}>
  <AlertDialog.Content class="flex h-full max-w-full flex-col overflow-auto">
    <!--Professor Header-->
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
          <span class="">2020-2021</span>
        </div>
        <div class="relative flex items-center justify-center p-2">
          <span class="absolute left-2 top-2">Semester</span>
          <span class="">Second Semester</span>
        </div>
      </div>
    </section>
    <!--Regular Load-->
    <section>
      <span class="font-semibold">REGULAR LOAD</span>
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
      <span class="font-semibold">TOTAL REGULAR LOAD: <span class="underline">10</span></span>
    </section>

    <!--Part time Load-->
    <section>
      <span class="font-semibold">PART-TIME LOAD</span>
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
      <span class="font-semibold">TOTAL PART-TIME LOAD: <span class="underline">10</span></span>
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
