<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import type { Row } from '@tanstack/table-core';
  import { type ClassSchedulesPageTable } from '../data/schemas';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
  import { Badge } from '$lib/components/ui/badge/index';
  let { row }: { row: Row<ClassSchedulesPageTable> } = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger class="underline">View</DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      {#each row.original.subjects as subject}
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>
            <span>{subject.name}</span>
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <div class="flex flex-col gap-1.5 p-4">
              <span class="font-semibold">When:</span>
              <span
                class="text-muted-foreground
              ">{subject.day} {subject.startTime} - {subject.endTime}</span
              >
              <span class="font-semibold">Room:</span>
              <span
                class="text-muted-foreground
              ">{subject.room}</span
              >
            </div>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
      {/each}
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
