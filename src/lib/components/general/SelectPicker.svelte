<script lang="ts">
  import * as Select from '$lib/components/ui/select/index.js';
  import { cn } from '$lib/utils';
  import type { ClassNameValue } from 'tailwind-merge';

  interface Props {
    props?: {
      name: string;
      id: string;
      'data-fs-error': string | undefined;
      'aria-describedby': string | undefined;
      'aria-invalid': 'true' | undefined;
      'aria-required': 'true' | undefined;
      'data-fs-control': string;
    };
    selections: {
      label: string;
      value: string;
    }[];
    selected: string;
    class?: ClassNameValue;
    name: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
  }

  let { selected = $bindable(), ...props }: Props = $props();
</script>

<Select.Root {...props} type="single" bind:value={selected}>
  <Select.Trigger class={cn('', props.class)}>
    {selected ? selected : props.name}
  </Select.Trigger>
  <Select.Content>
    {#each props.selections as selection}
      <Select.Item value={selection.value}>{selection.label}</Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
