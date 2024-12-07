<script lang="ts">
  import * as Select from '$lib/components/ui/select/index.js';
  import { cn } from '$lib/utils';
  import type { ClassNameValue } from 'tailwind-merge';

  interface Props {
    selections: {
      label: string;
      value: string;
    }[];
    selected: string;
    class?: ClassNameValue;
    placeholder?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    noDescription?: boolean;
  }

  let { selected = $bindable(), ...props }: Props = $props();
</script>

<Select.Root onValueChange={props.onValueChange} type="single" bind:value={selected}>
  <Select.Trigger class={cn('', props.class)}>
    {selected ? selected : props.placeholder}
  </Select.Trigger>
  <Select.Content>
    {#if !props.selections.length}
      <div class="flex min-h-[50px] items-center justify-center">
        <span class="text-xs text-muted-foreground">There is no uploaded data</span>
      </div>
    {/if}
    {#each props.selections as selection}
      <Select.Item value={selection.value}>
        <section class="flex flex-col">
          <span>{selection.value}</span>
          {#if !props.noDescription}
            <span class="text-xs text-muted-foreground">{selection.label}</span>
          {/if}
        </section>
      </Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
