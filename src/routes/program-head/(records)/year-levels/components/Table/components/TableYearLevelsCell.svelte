<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import type { Row } from '@tanstack/table-core';
  import { type YearLevelPageTable } from '../data/schemas';
  import * as Popover from '$lib/components/ui/popover/index.js';
  import { Badge } from '$lib/components/ui/badge/index';
  let { row }: { row: Row<YearLevelPageTable> } = $props();
</script>

<Popover.Root>
  <Popover.Trigger class="underline">View</Popover.Trigger>
  <Popover.Content>
    <div class="flex flex-wrap gap-1.5">
      {#each row.original.levels as level}
        <Badge><span class="text-xs font-medium">{level.yearLevel}</span></Badge>
      {/each}
    </div>
  </Popover.Content>
</Popover.Root>
