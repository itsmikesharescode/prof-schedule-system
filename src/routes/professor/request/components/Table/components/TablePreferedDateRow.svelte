<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import type { Row } from '@tanstack/table-core';
  import { type RequestPageTable } from '../data/schemas';
  import * as Popover from '$lib/components/ui/popover/index.js';
  import { useTableState } from '../tableState.svelte';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import { convert24HourTo12Hour } from '$lib';

  let { row }: { row: Row<RequestPageTable> } = $props();

  const tableState = useTableState();
</script>

<Popover.Root>
  <Popover.Trigger>
    <span class="underline">View Preferred Date</span>
  </Popover.Trigger>
  <Popover.Content>
    <section class="flex flex-col gap-2 text-xs">
      <div class="flex flex-wrap items-center gap-1.5">
        {#each row.original.days as day}
          <Badge>{day}</Badge>
        {/each}
      </div>
      <Badge class="max-w-fit">
        {convert24HourTo12Hour(row.original.start_time)} - {convert24HourTo12Hour(
          row.original.end_time
        )}</Badge
      >
    </section>
  </Popover.Content>
</Popover.Root>
