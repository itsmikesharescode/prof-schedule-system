<script lang="ts">
  import Schedules from '$lib/components/general/Schedules.svelte';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { useTableState } from '../Table/tableState.svelte';
  import X from 'lucide-svelte/icons/x';

  const tableState = useTableState();
</script>

<AlertDialog.Root open={tableState.getShowViewCalendar()}>
  <AlertDialog.Content class="max-h-[80dvh] max-w-[1400px] overflow-auto">
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
      <AlertDialog.Title>Viewing Calendar</AlertDialog.Title>
    </AlertDialog.Header>

    <Schedules subjects={tableState.getActiveRow()?.subjects ?? []} />
  </AlertDialog.Content>
</AlertDialog.Root>
