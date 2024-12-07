<script lang="ts">
  import * as Select from '$lib/components/ui/select/index.js';
  import Badge from '../ui/badge/badge.svelte';

  interface Props {
    selections: string[];
    selected: string[];
    placeholder: string;
  }
  let { selected = $bindable(), ...restProps }: Props = $props();
</script>

<Select.Root
  type="multiple"
  onValueChange={(v) => {
    selected = v;
  }}
>
  <section
    class="relative flex h-fit w-full flex-wrap gap-1.5 rounded-lg border border-input bg-background p-2 px-3 py-2 pr-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  >
    <Select.Trigger class="absolute right-2 w-fit"></Select.Trigger>

    {#if selected.length > 0}
      {#each selected as selection}
        <Badge variant="outline" class="h-fit text-xs">
          {selection}
        </Badge>
      {/each}
    {:else}
      <span class="text-muted-foreground">{restProps.placeholder}</span>
    {/if}
  </section>
  <Select.Content>
    {#each restProps.selections as selection}
      <Select.Item value={selection}>{selection}</Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
