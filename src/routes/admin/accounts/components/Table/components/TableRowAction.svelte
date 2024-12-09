<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import Ellipsis from 'lucide-svelte/icons/ellipsis';
  import FileMinus from 'lucide-svelte/icons/file-minus';
  import PrinterCheck from 'lucide-svelte/icons/printer-check';
  import LoaderCircle from 'lucide-svelte/icons/loader-circle';
  import Pen from 'lucide-svelte/icons/pen';
  import Check from 'lucide-svelte/icons/check';
  import type { Row } from '@tanstack/table-core';
  import { type AccountPageTable } from '../data/schemas';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
  import Button from '$lib/components/ui/button/button.svelte';
  import { useTableState } from '../tableState.svelte';

  let { row }: { row: Row<AccountPageTable> } = $props();

  const tableState = useTableState();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
        <Ellipsis />
        <span class="sr-only">Open Menu</span>
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="max-w-fit" align="end">
    <DropdownMenu.Item
      onclick={() => {
        tableState.setActiveRow(row.original);
        tableState.setShowPrintFacultyLoad(true);
      }}
      class="relative"
    >
      {#if tableState.getShowPrintFacultyLoad()}
        <div
          class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center gap-2 rounded-lg bg-secondary"
        >
          <span>Pls wait...</span>
          <LoaderCircle class="size-4 animate-spin" />
        </div>
      {/if}
      <PrinterCheck />
      Print Subject Load
    </DropdownMenu.Item>
    <DropdownMenu.Item
      onclick={() => {
        tableState.setActiveRow(row.original);
        tableState.setShowUpdateStatus(true);
      }}
    >
      <Check />
      Update Status
    </DropdownMenu.Item>
    <DropdownMenu.Item
      onclick={() => {
        tableState.setActiveRow(row.original);
        tableState.setShowUpdate(true);
      }}
    >
      <Pen />
      Update
    </DropdownMenu.Item>
    <DropdownMenu.Item
      onclick={() => {
        tableState.setActiveRow(row.original);
        tableState.setShowDelete(true);
      }}
    >
      <FileMinus />
      Delete
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
