<script lang="ts">
  import { cn } from '$lib/utils';
  import * as Select from '$lib/components/ui/select/index';
  import type { ClassNameValue } from 'tailwind-merge';
  import { Label } from '$lib/components/ui/label/index';
  import { page } from '$app/stores';
  import type { Database } from '$lib/database.types';
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';

  type Program = Database['public']['Tables']['programs_tb']['Row'];

  interface Props {
    streamPrograms: Promise<Program[] | null>;
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
      <a title="Filter by All" href="?reset=true">
        <Select.Item value="All">All</Select.Item>
      </a>

      {#await props.streamPrograms}
        <div class="mt-1 flex flex-col gap-1">
          <Skeleton class="h-[2rem]" />
          <Skeleton class="h-[2rem]" />
          <Skeleton class="h-[2rem]" />
          <Skeleton class="h-[2rem]" />
        </div>
      {:then programs}
        {#each programs ?? [] as program}
          <a title="Filter by {program.description}" href="?filter={program.code}">
            <Select.Item value={program.code}>{program.code}</Select.Item>
          </a>
        {/each}
      {/await}
    </Select.Content>
  </Select.Root>
</div>
