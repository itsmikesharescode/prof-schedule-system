<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import { X, Plus } from 'lucide-svelte';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { updateScheduleSchema, type UpdateScheduleSchema } from './schema';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index';
  import Combobox from '$lib/components/general/Combobox.svelte';
  import { availableTimes, days } from '$lib/metadata';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';
  import { Label } from '$lib/components/ui/label/index.js';
  import { flip } from 'svelte/animate';
  import { fly } from 'svelte/transition';
  import { toast } from 'svelte-sonner';
  import { cubicInOut } from 'svelte/easing';

  interface Props {
    showUpdate: boolean;
    updateScheduleForm: SuperValidated<Infer<UpdateScheduleSchema>>;
  }

  let { showUpdate = $bindable(), updateScheduleForm }: Props = $props();

  const form = superForm(updateScheduleForm, {
    validators: zodClient(updateScheduleSchema),
    dataType: 'json',
    onUpdate: ({ form }) => {
      if (
        form.data.schoolYear &&
        form.data.semester &&
        form.data.yearLevel &&
        form.data.section &&
        !form.valid
      )
        return toast.error('Please answer the schedule details.');

      if (!form.valid) return;

      subjects = [
        {
          id: crypto.randomUUID(),
          name: '',
          startTime: '',
          endTime: '',
          day: '',
          room: ''
        }
      ];
    }
  });

  const { form: formData, enhance, submitting } = form;

  let subjects = $state([
    {
      id: crypto.randomUUID(),
      name: '',
      startTime: '',
      endTime: '',
      day: '',
      room: ''
    }
  ]);

  let lastSubjectCard = $state<HTMLElement>();

  function addSubject() {
    subjects.push({
      id: crypto.randomUUID(),
      name: '',
      startTime: '',
      endTime: '',
      day: '',
      room: ''
    });
    setTimeout(() => {
      lastSubjectCard?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  $effect(() => {
    if (showUpdate) {
      $formData.subjects = subjects;
    }
  });
</script>

<AlertDialog.Root bind:open={showUpdate}>
  <AlertDialog.Content class="max-w-7xl p-0">
    <button
      onclick={() => {
        showUpdate = false;
        form.reset();
        subjects = [
          {
            id: crypto.randomUUID(),
            name: '',
            startTime: '',
            endTime: '',
            day: '',
            room: ''
          }
        ];
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <X class="size-4" />
      <span class="sr-only">Close</span>
    </button>

    <AlertDialog.Header class="px-6 pt-6">
      <AlertDialog.Title>Update Schedule</AlertDialog.Title>
      <AlertDialog.Description>
        Fill the fields below to update the schedule.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <ScrollArea class="max-h-[70dvh]">
      <form method="POST" action="?/updateScheduleEvent" use:enhance class="">
        <div class="grid grid-cols-[1fr,3fr] gap-6 px-6 pb-6">
          <!--Records-->
          <div class="">
            <div class="sticky top-0">
              <div class="mb-6">
                <span class="font-semibold text-muted-foreground underline">Records</span>
              </div>

              <Form.Field {form} name="schoolYear">
                <Form.Control>
                  {#snippet children({ props })}
                    <Form.Label>School Year</Form.Label>
                    <SelectPicker
                      name="Select school year"
                      {props}
                      class=""
                      selections={[
                        { label: '2026-2027', value: '2026-2027' },
                        { label: '2025-2026', value: '2025-2026' },
                        { label: '2024-2025', value: '2024-2025' },
                        { label: '2023-2024', value: '2023-2024' },
                        { label: '2022-2023', value: '2022-2023' },
                        { label: '2021-2022', value: '2021-2022' }
                      ]}
                      bind:selected={$formData.schoolYear}
                    />
                    <input type="hidden" {...props} bind:value={$formData.schoolYear} />
                  {/snippet}
                </Form.Control>
                <Form.Description />
                <Form.FieldErrors />
              </Form.Field>

              <Form.Field {form} name="semester">
                <Form.Control>
                  {#snippet children({ props })}
                    <Form.Label>Select Semester</Form.Label>
                    <SelectPicker
                      name="Select semester"
                      {props}
                      class=""
                      selections={[
                        { label: 'First Semester', value: 'First Semester' },
                        { label: 'Second Semester', value: 'Second Semester' },
                        { label: 'Third Semester', value: 'Third Semester' }
                      ]}
                      bind:selected={$formData.semester}
                    />
                    <input type="hidden" {...props} bind:value={$formData.semester} />
                  {/snippet}
                </Form.Control>
                <Form.Description />
                <Form.FieldErrors />
              </Form.Field>

              <Form.Field {form} name="yearLevel">
                <Form.Control>
                  {#snippet children({ props })}
                    <Form.Label>Select Year Level</Form.Label>
                    <SelectPicker
                      name="Select year level"
                      {props}
                      class=""
                      selections={[
                        { label: 'First Year', value: 'First Year' },
                        { label: 'Second Year', value: 'Second Year' },
                        { label: 'Third Year', value: 'Third Year' },
                        { label: 'Fourth Year', value: 'Fourth Year' }
                      ]}
                      bind:selected={$formData.yearLevel}
                    />
                    <input type="hidden" {...props} bind:value={$formData.yearLevel} />
                  {/snippet}
                </Form.Control>
                <Form.Description />
                <Form.FieldErrors />
              </Form.Field>

              <Form.Field {form} name="section">
                <Form.Control>
                  {#snippet children({ props })}
                    <Form.Label>Select Section</Form.Label>
                    <SelectPicker
                      name="Select section"
                      {props}
                      class=""
                      selections={[
                        { label: 'Section A', value: 'Section A' },
                        { label: 'Section B', value: 'Section B' },
                        { label: 'Section C', value: 'Section C' },
                        { label: 'Section D', value: 'Section D' }
                      ]}
                      bind:selected={$formData.section}
                    />
                    <input type="hidden" {...props} bind:value={$formData.section} />
                  {/snippet}
                </Form.Control>
                <Form.Description />
                <Form.FieldErrors />
              </Form.Field>
            </div>
          </div>

          <!--Schedule Details-->
          <div class="overflow-hidden">
            <div class="pointer-events-none absolute left-0 right-6 top-0 z-10 flex justify-end">
              <div class="flex items-center gap-2">
                {#if subjects.length > 3}
                  <Button
                    size="sm"
                    class="pointer-events-auto"
                    variant="destructive"
                    onclick={() => {
                      subjects = subjects.slice(0, 1);
                    }}
                    >Delete All
                  </Button>
                {/if}
                <Button size="sm" class="pointer-events-auto" onclick={addSubject}>
                  <Plus class="size-4" />
                  Add Subject
                </Button>
              </div>
            </div>

            <Form.Field {form} name="subjects" class="hidden">
              <Form.Control>
                {#snippet children({ props })}
                  <input type="hidden" {...props} bind:value={$formData.subjects} />
                {/snippet}
              </Form.Control>
              <Form.Description />
              <Form.FieldErrors />
            </Form.Field>

            <div class="mb-6 flex">
              <span class="font-semibold text-muted-foreground underline">Schedule Details</span>
            </div>

            <div class="flex flex-col gap-6">
              {#each subjects as subject (subject)}
                <div
                  animate:flip={{ duration: 300 }}
                  in:fly={{ x: -100, duration: 500, delay: 200, easing: cubicInOut }}
                  out:fly={{ x: 100, duration: 500, easing: cubicInOut }}
                  bind:this={lastSubjectCard}
                  class="relative grid grid-cols-3 gap-6 rounded-lg border-2 p-6"
                >
                  <div class="flex w-full max-w-sm flex-col gap-1.5">
                    <Label for="name">Subject Name</Label>
                    <Input
                      type="name"
                      id="name"
                      placeholder="Enter subject name"
                      bind:value={subject.name}
                    />
                  </div>

                  <div class="flex w-full max-w-sm flex-col gap-1.5">
                    <Label for="name">Start Time</Label>
                    <Combobox
                      placeholder="Select start time"
                      name="Select start time"
                      selections={availableTimes}
                      bind:selected={subject.startTime}
                    />
                  </div>

                  <div class="flex w-full max-w-sm flex-col gap-1.5">
                    <Label for="name">End Time</Label>
                    <Combobox
                      placeholder="Select end time"
                      name="Select end time"
                      selections={availableTimes}
                      bind:selected={subject.endTime}
                    />
                  </div>

                  <div class="flex w-full max-w-sm flex-col gap-1.5">
                    <Label for="name">Day</Label>
                    <Combobox
                      placeholder="Select day"
                      name="Select day"
                      selections={days}
                      bind:selected={subject.day}
                    />
                  </div>

                  <div class="flex w-full max-w-sm flex-col gap-1.5">
                    <Label for="name">Room</Label>
                    <Combobox
                      placeholder="Select room"
                      name="Select room"
                      selections={[
                        { label: 'Room 1', value: 'Room 1' },
                        { label: 'Room 2', value: 'Room 2' },
                        { label: 'Room 3', value: 'Room 3' },
                        { label: 'Room 4', value: 'Room 4' }
                      ]}
                      bind:selected={subject.room}
                    />
                  </div>

                  <div
                    class="pointer-events-none absolute bottom-3 left-0 right-3 flex justify-end"
                  >
                    {#if subjects.length > 1}
                      <Button
                        size="sm"
                        variant="destructive"
                        class="pointer-events-auto"
                        onclick={() => subjects.splice(subjects.indexOf(subject), 1)}
                      >
                        Delete
                      </Button>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>

        <div class="pointer-events-none sticky bottom-6 left-0 right-0 flex justify-end px-6">
          <Form.Button size="sm" class="pointer-events-auto">Update</Form.Button>
        </div>
      </form>
    </ScrollArea>
  </AlertDialog.Content>
</AlertDialog.Root>
