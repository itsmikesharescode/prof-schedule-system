<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import { X, Plus, LoaderCircle } from 'lucide-svelte';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { addYearLevelSchema, type AddYearLevelSchema } from './schema';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';
  import { departments } from '$lib/metadata';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import Label from '$lib/components/ui/label/label.svelte';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import { cubicInOut } from 'svelte/easing';
  import { flip } from 'svelte/animate';
  import { fly } from 'svelte/transition';

  interface Props {
    addSchoolYearForm: SuperValidated<Infer<AddYearLevelSchema>>;
  }

  let { addSchoolYearForm }: Props = $props();

  let open = $state(false);

  const form = superForm(addSchoolYearForm, {
    validators: zodClient(addYearLevelSchema),
    id: crypto.randomUUID(),
    dataType: 'json',
    onUpdate: ({ result, form }) => {
      const { status, data } = result as Result<{ msg: string }>;
      switch (status) {
        case 200:
          open = false;
          reset();
          toast.success(data.msg);
          break;
        case 400:
          if (form.data.yearLevels && form.data.department && !form.valid)
            return toast.error('Please answer the year level details.');
          if (!form.valid) return;
          break;
        case 401:
          toast.error(data.msg);
          break;
      }
    }
  });

  const { form: formData, enhance, submitting, reset } = form;

  let yearLevels = $state([
    {
      id: crypto.randomUUID(),
      yearLevel: ''
    }
  ]);

  let lastYearLevelCard = $state<HTMLElement>();

  const addYearLevel = () => {
    yearLevels.push({
      id: crypto.randomUUID(),
      yearLevel: ''
    });
    setTimeout(() => {
      lastYearLevelCard?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  $effect(() => {
    if (yearLevels.length) {
      $formData.yearLevels = yearLevels;
    }
  });
</script>

<Button size="sm" onclick={() => (open = true)}>
  <Plus class="size-4" />
  Add Year Level
</Button>

<AlertDialog.Root bind:open>
  <AlertDialog.Content class="max-w-[700px] p-0">
    <button
      onclick={() => {
        open = false;
        form.reset();
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <X class="size-4" />
      <span class="sr-only">Close</span>
    </button>

    <AlertDialog.Header class="px-6 pt-6">
      <AlertDialog.Title>New Year Level</AlertDialog.Title>
      <AlertDialog.Description>
        Fill the fields below to create a new year level.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <ScrollArea class="max-h-[70dvh]">
      <form method="POST" action="?/addYearLevelEvent" use:enhance class="px-6 pb-6">
        <input type="hidden" name="yearLevels" bind:value={$formData.yearLevels} />
        <div class="grid grid-cols-2 gap-5 pb-5">
          <div class="">
            <div class="sticky top-0">
              <Form.Field {form} name="department">
                <Form.Control>
                  {#snippet children({ props })}
                    <Form.Label>Department</Form.Label>
                    <SelectPicker
                      {...props}
                      bind:selected={$formData.department}
                      selections={departments}
                      name="Select department"
                    />
                    <input type="hidden" name={props.name} bind:value={$formData.department} />
                  {/snippet}
                </Form.Control>
                <Form.Description />
                <Form.FieldErrors />
              </Form.Field>
            </div>
          </div>

          <div class="flex flex-col gap-2.5 overflow-hidden">
            {#each yearLevels as yearLevel (yearLevel)}
              <div
                class="flex w-full flex-col gap-1.5 rounded-lg border-2 p-4"
                animate:flip={{ duration: 300 }}
                in:fly={{ x: -100, duration: 500, delay: 200, easing: cubicInOut }}
                out:fly={{ x: 100, duration: 500, easing: cubicInOut }}
                bind:this={lastYearLevelCard}
              >
                <Label for={`yearLevel-${yearLevel.id}`}>Year Level</Label>
                <div class="flex items-center gap-5">
                  <Input
                    id={`yearLevel-${yearLevel.id}`}
                    placeholder="Enter year level"
                    bind:value={yearLevel.yearLevel}
                  />
                  {#if yearLevels.length > 1}
                    <Button
                      size="sm"
                      variant="destructive"
                      onclick={() => yearLevels.splice(yearLevels.indexOf(yearLevel), 1)}
                    >
                      Delete
                    </Button>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>

        <div
          class="pointer-events-none sticky bottom-6 left-6 right-6 flex items-center justify-between"
        >
          <div class="">
            <Button size="sm" onclick={addYearLevel} class="pointer-events-auto">
              Add Year Level
            </Button>
            {#if yearLevels.length > 3}
              <Button
                size="sm"
                variant="destructive"
                onclick={() => {
                  yearLevels = yearLevels.slice(0, 1);
                }}
                class="pointer-events-auto"
              >
                Delete All
              </Button>
            {/if}
          </div>

          <Form.Button disabled={$submitting} size="sm" class="pointer-events-auto relative">
            {#if $submitting}
              <div
                class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
              >
                <LoaderCircle class="size-4 animate-spin" />
              </div>
            {/if}
            Create
          </Form.Button>
        </div>
      </form>
    </ScrollArea>
  </AlertDialog.Content>
</AlertDialog.Root>
