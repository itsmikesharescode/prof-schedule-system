<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import X from 'lucide-svelte/icons/x';
  import type { Table } from '@tanstack/table-core';
  import { priorities, statuses } from '../data/data';
  import { TableViewOptions } from './index';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Input } from '$lib/components/ui/input/index';
  import type { LogsPageTable } from '../data/schemas';

  let { table }: { table: Table<LogsPageTable> } = $props();

  const isFiltered = $derived(table.getState().columnFilters.length > 0);
  const statusCol = $derived(table.getColumn('status'));
  const priorityCol = $derived(table.getColumn('priority'));
</script>

<div class="flex items-center justify-between">
  <div class="flex flex-1 items-center space-x-2">
    <Input
      placeholder="Search user id..."
      value={(table.getColumn('user_id')?.getFilterValue() as string) ?? ''}
      oninput={(e) => {
        table.getColumn('user_id')?.setFilterValue(e.currentTarget.value);
      }}
      onchange={(e) => {
        table.getColumn('user_id')?.setFilterValue(e.currentTarget.value);
      }}
      class="h-8 w-[150px] lg:w-[250px]"
    />

    {#if isFiltered}
      <Button variant="ghost" onclick={() => table.resetColumnFilters()} class="h-8 px-2 lg:px-3">
        Reset
        <X />
      </Button>
    {/if}
  </div>
  <TableViewOptions {table} />
</div>
