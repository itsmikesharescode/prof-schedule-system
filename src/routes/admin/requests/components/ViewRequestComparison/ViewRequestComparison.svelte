<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { useTableState } from '../Table/tableState.svelte';
  import X from 'lucide-svelte/icons/x';
  import ArrowRightLeft from 'lucide-svelte/icons/arrow-right-left';
  import * as Card from '$lib/components/ui/card/index.js';
  import type { PreferredSchedule } from '$lib/types';
  import Button from '$lib/components/ui/button/button.svelte';
  import { fade, scale } from 'svelte/transition';

  const tableState = useTableState();

  let selectedSchedule = $state<PreferredSchedule | null | undefined>(null);
</script>

{#snippet content(title: string, description: string)}
  <section class="flex flex-col">
    <span class="font-medium">{title}</span>
    <span class="text-sm text-muted-foreground">{description}</span>
  </section>
{/snippet}

<AlertDialog.Root open={tableState.getShowViewComparison()}>
  <AlertDialog.Content class="max-w-[1200px]">
    <button
      onclick={() => {
        tableState.setActiveRow(null);
        tableState.setShowViewComparison(false);
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <X class="size-4" />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header>
      <AlertDialog.Title>
        View Comparison daily schedule for {tableState.getActiveRow()?.full_name}
      </AlertDialog.Title>
    </AlertDialog.Header>

    <section class="grid grid-cols-[1fr,30px,1fr] items-center gap-2">
      <Card.Root
        onclick={() => {
          selectedSchedule = tableState.getActiveRow()?.professors_tb?.user_meta_data.schedule;
        }}
        class="{selectedSchedule ===
        tableState.getActiveRow()?.professors_tb?.user_meta_data.schedule
          ? 'ring-2 ring-primary'
          : 'scale-95'} cursor-pointer transition-all"
      >
        <Card.Header>
          <Card.Title>Current Schedule</Card.Title>
        </Card.Header>
        <Card.Content class="relative flex flex-col gap-2">
          {@render content(
            'Day:',
            tableState.getActiveRow()?.professors_tb?.user_meta_data.schedule.day ?? ''
          )}
          {@render content(
            'Start Time:',
            tableState.getActiveRow()?.professors_tb?.user_meta_data.schedule.startTime ?? ''
          )}

          {@render content(
            'End Time:',
            tableState.getActiveRow()?.professors_tb?.user_meta_data.schedule.endTime ?? ''
          )}

          {@render content(
            'Availability:',
            tableState.getActiveRow()?.professors_tb?.user_meta_data.schedule.available ?? ''
          )}

          {#if selectedSchedule === tableState.getActiveRow()?.professors_tb?.user_meta_data.schedule}
            <section
              transition:fade={{ duration: 600 }}
              class="absolute bottom-2 right-2 text-xs text-muted-foreground"
            >
              Current Schedule
            </section>
          {/if}
        </Card.Content>
      </Card.Root>

      <ArrowRightLeft />

      <Card.Root
        onclick={() => {
          selectedSchedule = tableState.getActiveRow()?.schedule;
        }}
        class="{selectedSchedule === tableState.getActiveRow()?.schedule
          ? 'ring-2 ring-primary'
          : 'scale-95'} cursor-pointer transition-all"
      >
        <Card.Header>
          <Card.Title>Requested Schedule</Card.Title>
        </Card.Header>
        <Card.Content class="relative flex flex-col gap-2">
          {@render content('Day:', tableState.getActiveRow()?.schedule.day ?? '')}
          {@render content('Start Time:', tableState.getActiveRow()?.schedule.startTime ?? '')}

          {@render content('End Time:', tableState.getActiveRow()?.schedule.endTime ?? '')}

          {@render content('Availability:', tableState.getActiveRow()?.schedule.available ?? '')}

          {#if selectedSchedule === tableState.getActiveRow()?.schedule}
            <section
              transition:fade={{ duration: 600 }}
              class="absolute bottom-2 right-2 text-xs text-muted-foreground"
            >
              Requested Schedule
            </section>
          {/if}
        </Card.Content>
      </Card.Root>
    </section>
  </AlertDialog.Content>
</AlertDialog.Root>
