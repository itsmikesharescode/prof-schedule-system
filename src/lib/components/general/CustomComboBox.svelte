<script lang="ts">
  import Check from 'lucide-svelte/icons/check';
  import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
  import { tick } from 'svelte';
  import * as Command from '$lib/components/ui/command/index.js';
  import * as Popover from '$lib/components/ui/popover/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { cn } from '$lib/utils.js';
  import { PUBLIC_SUPABASE_STORAGE_URL } from '$env/static/public';
  interface Props {
    selected: string;
    selections: {
      value: string;
      label: string;
      photoLink?: string;
    }[];
    placeholder: string;
    name: string;
    disabled?: boolean;
  }

  let { selected = $bindable(), selections, placeholder, name, disabled }: Props = $props();

  let open = $state(false);
  let triggerRef = $state<HTMLButtonElement>(null!);

  const selectedValue = $derived(selections.find((f) => f.value === selected));

  function closeAndFocusTrigger() {
    open = false;
    tick().then(() => {
      triggerRef.focus();
    });
  }
</script>

<Popover.Root bind:open>
  <Popover.Trigger {disabled} bind:ref={triggerRef}>
    {#snippet child({ props })}
      <Button
        {disabled}
        variant="outline"
        class="w-full justify-between"
        {...props}
        role="combobox"
        aria-expanded={open}
      >
        <section class="flex items-center gap-2">
          {#if selectedValue?.photoLink}
            <img
              src={`${PUBLIC_SUPABASE_STORAGE_URL}${selectedValue.photoLink}?${crypto.randomUUID()}`}
              class="size-8 rounded-full"
              alt="ProfessorPhoto"
            />
          {/if}
          <span class={selectedValue ? '' : 'text-muted-foreground'}
            >{selectedValue?.label || name}</span
          >
        </section>
        <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-full p-0">
    <Command.Root>
      <Command.Input {placeholder} />
      <Command.List>
        <Command.Empty>No found.</Command.Empty>
        <Command.Group>
          {#each selections as selection}
            <Command.Item
              value={selection.label}
              onSelect={() => {
                selected = selection.value;
                closeAndFocusTrigger();
              }}
            >
              <Check
                class={cn('mr-2 size-4', selected !== selection.value && 'text-transparent')}
              />
              <section class="flex items-center gap-2">
                {#if selection.photoLink}
                  <img
                    src={`${PUBLIC_SUPABASE_STORAGE_URL}${selection.photoLink}?${crypto.randomUUID()}`}
                    class="size-8 rounded-full"
                    alt="ProfessorPhoto"
                  />
                {/if}
                {selection.label}
              </section>
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
