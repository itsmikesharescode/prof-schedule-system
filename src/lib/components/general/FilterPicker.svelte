<script lang="ts">
  import { cn } from '$lib/utils';
  import * as Select from '$lib/components/ui/select/index.js';
  import type { ClassNameValue } from 'tailwind-merge';

  interface Props {
    selections: {
      label: string;
      value: string;
    }[];
    class: ClassNameValue;
  }

  const { selections, ...props }: Props = $props();
</script>

<Select.Root type="single">
  <Select.Trigger class={cn('w-full', props.class)}></Select.Trigger>
  <Select.Content>
    {#each selections as selection}
      <a href={selection.value}>
        <Select.Item value={selection.value}>{selection.label}</Select.Item>
      </a>
    {/each}
  </Select.Content>
</Select.Root>
