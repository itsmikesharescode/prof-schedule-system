<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import Ellipsis from 'lucide-svelte/icons/ellipsis';
  import FileMinus from 'lucide-svelte/icons/file-minus';
  import Pen from 'lucide-svelte/icons/pen';
  import CalendarSearch from 'lucide-svelte/icons/calendar-search';
  import Calendar from 'lucide-svelte/icons/calendar';
  import type { Row } from '@tanstack/table-core';
  import { type RequestPageTable } from '../data/schemas';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
  import Button from '$lib/components/ui/button/button.svelte';
  import { useTableState } from '../tableState.svelte';

  let { row }: { row: Row<RequestPageTable> } = $props();

  const tableState = useTableState();
</script>

<Button
  variant="ghost"
  onclick={() => {
    tableState.setActiveRow(row.original);
  }}
>
  <CalendarSearch />
  View Calendar
</Button>
