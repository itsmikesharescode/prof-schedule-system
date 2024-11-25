<script lang="ts">
  import { onMount } from 'svelte';
  import Schedules from '$lib/components/general/Schedules.svelte';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { useTableState } from '../Table/tableState.svelte';
  import X from 'lucide-svelte/icons/x';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  const tableState = useTableState();
  let showSchedules = $state(false);

  $effect(() => {
    if (tableState.getShowViewCalendar()) {
      setTimeout(() => {
        showSchedules = true;
      }, 300);
    }

    return () => {
      showSchedules = false;
    };
  });
</script>

<AlertDialog.Root open={tableState.getShowViewCalendar()}>
  <AlertDialog.Content class="max-w-[1400px]">
    <button
      onclick={() => {
        tableState.setActiveRow(null);
        tableState.setShowViewCalendar(false);
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <X class="size-4" />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header>
      <AlertDialog.Title
        >Viewing Calendar for {tableState.getActiveRow()?.fullName}</AlertDialog.Title
      >
      >
    </AlertDialog.Header>

    <ScrollArea class="h-[80dvh]">
      {#if showSchedules}
        <Schedules subjects={tableState.getActiveRow()?.class_schedules_tb?.subjects ?? []} />
      {/if}
    </ScrollArea>
  </AlertDialog.Content>
</AlertDialog.Root>
