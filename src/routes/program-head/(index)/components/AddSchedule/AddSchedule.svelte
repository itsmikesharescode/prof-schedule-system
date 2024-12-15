<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import LoaderCircle from 'lucide-svelte/icons/loader-circle';
  import X from 'lucide-svelte/icons/x';
  import Plus from 'lucide-svelte/icons/plus';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { addScheduleSchema, type AddScheduleSchema } from './schema';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index';
  import Combobox from '$lib/components/general/Combobox.svelte';
  import { availableTimes, days } from '$lib/metadata';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';
  import { Label } from '$lib/components/ui/label/index.js';
  import { flip } from 'svelte/animate';
  import { fly } from 'svelte/transition';
  import { toast } from 'svelte-sonner';
  import { cubicInOut } from 'svelte/easing';
  import { auxiliaryState } from '$lib/runes/auxiliaryState.svelte';
  import { page } from '$app/stores';
  import type { Result } from '$lib/types';
  import {
    getSchoolYears,
    getRooms,
    getSections,
    getSubjects,
    getYearLevel
  } from '../../(db_calls)/getDropDowns';
  import CustomComboBox from '$lib/components/general/CustomComboBox.svelte';
  import { streamProfessors } from '../../../(db_calls)/streamProfessors';
  import { tick } from 'svelte';

  interface Props {
    addScheduleForm: SuperValidated<Infer<AddScheduleSchema>>;
  }

  let { addScheduleForm }: Props = $props();

  let open = $state(false);

  const form = superForm(addScheduleForm, {
    validators: zodClient(addScheduleSchema),
    dataType: 'json',
    onUpdate: ({ form, result }) => {
      const { status, data } = result as Result<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success(data.msg);
          reset();

          open = false;
          break;

        case 401:
          toast.error(data.msg);
          break;
      }
    }
  });

  const { form: formData, enhance, submitting, reset } = form;

  let schoolYearsDropdown = $state<Awaited<ReturnType<typeof getSchoolYears>>>(null);
  let yearLevelsDropdown = $state<Awaited<ReturnType<typeof getYearLevel>>>(null);
  let sectionsDropdown = $state<Awaited<ReturnType<typeof getSections>>>(null);
  let roomsDropdown = $state<Awaited<ReturnType<typeof getRooms>>>(null);
  let subjectsDropdown = $state<Awaited<ReturnType<typeof getSubjects>>>(null);
  let professors = $state<Awaited<ReturnType<typeof streamProfessors>>>(null);

  const handleDepartmentChange = async () => {
    if (!$page.data.supabase) return;
    [
      schoolYearsDropdown,
      yearLevelsDropdown,
      sectionsDropdown,
      roomsDropdown,
      subjectsDropdown,
      professors
    ] = await Promise.all([
      getSchoolYears($page.data.supabase, parseInt($formData.department.split(',')[1])),
      getYearLevel($page.data.supabase, parseInt($formData.department.split(',')[1])),
      getSections($page.data.supabase, parseInt($formData.department.split(',')[1])),
      getRooms($page.data.supabase, parseInt($formData.department.split(',')[1])),
      getSubjects($page.data.supabase, parseInt($formData.department.split(',')[1])),
      streamProfessors($page.data.supabase, null)
    ]);
  };

  $effect(() => {
    if ($formData.department) {
      tick().then(async () => {
        await handleDepartmentChange();
      });
    }
  });

  const filterProgramHead = () => {
    return professors?.filter((prof) => prof.user_meta_data.role !== 'program head');
  };
</script>

<Button
  size="sm"
  onclick={() => {
    open = true;
  }}
>
  <Plus class="size-4" />
  Add Schedule
</Button>

{#snippet Checkings()}
  <div
    class="flex h-10 w-full cursor-not-allowed rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  >
    <span class="text-sm text-muted-foreground">Please select a department first.</span>
  </div>
{/snippet}
<AlertDialog.Root {open}>
  <AlertDialog.Content class="max-w-3xl p-0">
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
      <AlertDialog.Title>New Schedule</AlertDialog.Title>
      <AlertDialog.Description>
        Fill the fields below to create a new schedule.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <ScrollArea class="max-h-[70dvh]">
      <form method="POST" action="?/addScheduleEvent" use:enhance class="">
        <div class="grid gap-5 px-6 pb-6 md:grid-cols-2">
          <!--Records-->
          <div class="">
            <Form.Field {form} name="department">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Select Department</Form.Label>
                  <SelectPicker
                    placeholder="Select department"
                    selections={auxiliaryState.formatDepartments()}
                    bind:selected={$formData.department}
                  />
                  <input type="hidden" {...props} bind:value={$formData.semester} />
                {/snippet}
              </Form.Control>
              <Form.Description />
              <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="professor_id">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Professor Name</Form.Label>
                  {#if $formData.department}
                    <CustomComboBox
                      {...props}
                      name="Select Professor"
                      placeholder="Search for a professor"
                      selections={filterProgramHead()?.map((prof) => ({
                        label: `${prof.user_meta_data.firstName} ${prof.user_meta_data.middleName} ${prof.user_meta_data.lastName}`,
                        value: prof.user_id,
                        photoLink: prof.user_meta_data.avatar
                      })) ?? []}
                      bind:selected={$formData.professor_id}
                    />
                    <input type="hidden" name={props.name} bind:value={$formData.professor_id} />
                  {:else}
                    {@render Checkings()}
                  {/if}
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
                    placeholder="Select semester"
                    noDescription
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
            <Form.Field {form} name="schoolYear">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>School Year</Form.Label>
                  {#if $formData.department}
                    <SelectPicker
                      placeholder="Select school year"
                      noDescription
                      selections={schoolYearsDropdown?.map((level) => ({
                        label: level.year,
                        value: `${level.year}, ${level.id}`
                      })) ?? []}
                      bind:selected={$formData.schoolYear}
                    />
                  {:else}
                    {@render Checkings()}
                  {/if}
                  <input type="hidden" {...props} bind:value={$formData.schoolYear} />
                {/snippet}
              </Form.Control>
              <Form.Description />
              <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="yearLevel">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Select Year Level</Form.Label>
                  {#if $formData.department}
                    <SelectPicker
                      placeholder="Select year level"
                      noDescription
                      selections={yearLevelsDropdown?.levels.map((level) => ({
                        label: level.yearLevel,
                        value: `${level.yearLevel}, ${yearLevelsDropdown?.id}`
                      })) ?? []}
                      bind:selected={$formData.yearLevel}
                    />
                    <input type="hidden" {...props} bind:value={$formData.yearLevel} />
                  {:else}
                    {@render Checkings()}
                  {/if}
                {/snippet}
              </Form.Control>
              <Form.Description />
              <Form.FieldErrors />
            </Form.Field>
          </div>

          <!--Schedule-->
          <div class="">
            <div class="grid grid-cols-2 gap-2.5">
              <Form.Field {form} name="initial_time">
                <Form.Control>
                  {#snippet children({ props })}
                    <Form.Label>Select Initial Time</Form.Label>
                    <Combobox
                      name="Select time"
                      placeholder="Search initial time"
                      selections={availableTimes}
                      bind:selected={$formData.initial_time}
                    />
                  {/snippet}
                </Form.Control>
                <Form.Description />
                <Form.FieldErrors />
              </Form.Field>

              <Form.Field {form} name="final_time">
                <Form.Control>
                  {#snippet children({ props })}
                    <Form.Label>Select Final Time</Form.Label>
                    <Combobox
                      name="Select time"
                      placeholder="Search initial time"
                      selections={availableTimes}
                      bind:selected={$formData.final_time}
                    />
                  {/snippet}
                </Form.Control>
                <Form.Description />
                <Form.FieldErrors />
              </Form.Field>
            </div>

            <Form.Field {form} name="section">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Select Section</Form.Label>
                  {#if $formData.department}
                    <SelectPicker
                      placeholder="Select section"
                      selections={sectionsDropdown?.map((section) => ({
                        label: section.class,
                        value: `${section.section_code}, ${section.id}`
                      })) ?? []}
                      bind:selected={$formData.section}
                    />
                    <input type="hidden" {...props} bind:value={$formData.section} />
                  {:else}
                    {@render Checkings()}
                  {/if}
                {/snippet}
              </Form.Control>
              <Form.Description />
              <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="subject">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Select Subject</Form.Label>
                  {#if $formData.department}
                    <SelectPicker
                      placeholder="Select subject"
                      onValueChange={handleDepartmentChange}
                      selections={subjectsDropdown?.map((subject) => ({
                        label: subject.name,
                        value: `${subject.code}, ${subject.id}`
                      })) ?? []}
                      bind:selected={$formData.subject}
                    />
                    <input type="hidden" {...props} bind:value={$formData.subject} />
                  {:else}
                    {@render Checkings()}
                  {/if}
                {/snippet}
              </Form.Control>
              <Form.Description />
              <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="day">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Select Day</Form.Label>
                  <Combobox
                    name="Select day"
                    placeholder="Search day"
                    selections={days}
                    bind:selected={$formData.day}
                  />
                  <input type="hidden" {...props} bind:value={$formData.day} />
                {/snippet}
              </Form.Control>
              <Form.Description />
              <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="room">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Select Room</Form.Label>
                  {#if $formData.department}
                    <SelectPicker
                      placeholder="Select room"
                      selections={roomsDropdown?.map((room) => ({
                        label: room.type,
                        value: `${room.code}, ${room.id}`
                      })) ?? []}
                      bind:selected={$formData.room}
                    />
                    <input type="hidden" {...props} bind:value={$formData.room} />
                  {:else}
                    {@render Checkings()}
                  {/if}
                {/snippet}
              </Form.Control>
              <Form.Description />
              <Form.FieldErrors />
            </Form.Field>
          </div>
        </div>

        <div class="pointer-events-none sticky bottom-6 left-0 right-0 flex justify-end px-6">
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
