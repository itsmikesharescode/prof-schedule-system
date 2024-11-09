<script lang="ts">
  import { cn } from '$lib/utils';
  import * as Select from '$lib/components/ui/select/index';
  import type { ClassNameValue } from 'tailwind-merge';
  import { Label } from '$lib/components/ui/label/index';
  import { navigating, page } from '$app/stores';

  interface Props {
    selections: {
      label: string;
      value: string;
    }[];
    class: ClassNameValue;
    name: string;
  }

  const { selections, ...props }: Props = $props();

  let selected = $state('');

  $effect(() => {
    if ($page.url.searchParams.has('filter')) {
      return;
    }

    selected = 'All';
  });
</script>

<div class="flex items-center gap-2.5">
  <Label>Department Filter</Label>
  <Select.Root type="single" bind:value={selected}>
    <Select.Trigger class={cn('w-full gap-2.5', props.class)}>
      {selected ? selected : props.name}
    </Select.Trigger>
    <Select.Content>
      <a title="Filter by All" href="?">
        <Select.Item value="All">All</Select.Item>
      </a>
      {#each selections as selection}
        <a title="Filter by {selection.label}" href="?filter={selection.value}">
          <Select.Item value={selection.value}>{selection.value}</Select.Item>
        </a>
      {/each}
    </Select.Content>
  </Select.Root>
</div>
