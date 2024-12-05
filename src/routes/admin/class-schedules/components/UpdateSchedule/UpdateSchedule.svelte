<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import LoaderCircle from 'lucide-svelte/icons/loader-circle';
  import X from 'lucide-svelte/icons/x';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { updateScheduleSchema, type UpdateScheduleSchema } from './schema';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index';
  import Combobox from '$lib/components/general/Combobox.svelte';
  import { availableTimes, days } from '$lib/metadata';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';
  import { toast } from 'svelte-sonner';
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
  import { useTableState } from '../Table/tableState.svelte';

  interface Props {
    updateScheduleForm: SuperValidated<Infer<UpdateScheduleSchema>>;
  }

  let { updateScheduleForm }: Props = $props();
  const tableState = useTableState();

  const form = superForm(updateScheduleForm, {
    validators: zodClient(updateScheduleSchema),
    dataType: 'json',
    onUpdate: ({ form, result }) => {
      const { status, data } = result as Result<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success(data.msg);
          reset();
          tableState.setActiveRow(null);
          tableState.setShowUpdate(false);
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

  const handleDepartmentChange = async () => {
    [schoolYearsDropdown, yearLevelsDropdown, sectionsDropdown, roomsDropdown, subjectsDropdown] =
      await Promise.all([
        getSchoolYears($page.data.supabase, $formData.department),
        getYearLevel($page.data.supabase, $formData.department),
        getSections($page.data.supabase, $formData.department),
        getRooms($page.data.supabase, $formData.department),
        getSubjects($page.data.supabase, $formData.department)
      ]);
  };
</script>

{#snippet Checkings()}
  <div
    class="flex h-10 w-full cursor-not-allowed rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  >
    <span class="text-sm text-muted-foreground">Please select a department first.</span>
  </div>
{/snippet}

<AlertDialog.Root open={tableState.getShowUpdate()}>
  <AlertDialog.Content class="max-w-3xl p-0">
    <button
      onclick={() => {
        tableState.setShowUpdate(false);
        tableState.setActiveRow(null);
        form.reset();
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <X class="size-4" />
      <span class="sr-only">Close</span>
    </button>

    <AlertDialog.Header class="px-6 pt-6">
      <AlertDialog.Title>Update Schedule</AlertDialog.Title>
      <AlertDialog.Description>Fill the fields below to update a schedule.</AlertDialog.Description>
    </AlertDialog.Header>

    <ScrollArea class="max-h-[70dvh]">
      <form method="POST" action="?/updateScheduleEvent" use:enhance class="">
        <input name="id" type="hidden" bind:value={$formData.id} />
        <div class="grid gap-5 px-6 pb-6 md:grid-cols-2">
          <!--Records-->
          <div class="">
            <Form.Field {form} name="department">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Select Department</Form.Label>
                  <SelectPicker
                    onValueChange={handleDepartmentChange}
                    name="Select department"
                    {props}
                    class=""
                    selections={auxiliaryState.formatDepartments()}
                    bind:selected={$formData.department}
                  />
                  <input type="hidden" {...props} bind:value={$formData.semester} />
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

            <Form.Field {form} name="schoolYear">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>School Year</Form.Label>
                  {#if $formData.department}
                    <SelectPicker
                      name="Select school year"
                      {props}
                      class=""
                      selections={schoolYearsDropdown?.map((level) => ({
                        label: level.year,
                        value: level.year
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
                      name="Select year level"
                      {props}
                      class=""
                      selections={yearLevelsDropdown?.levels.map((level) => ({
                        label: level.yearLevel,
                        value: level.yearLevel
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

            <Form.Field {form} name="section">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Select Section</Form.Label>
                  {#if $formData.department}
                    <SelectPicker
                      name="Select section"
                      {props}
                      class=""
                      selections={sectionsDropdown?.map((section) => ({
                        label: section.section_code,
                        value: section.section_code
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
          </div>

          <!--Schedule-->
          <div class="">
            <Form.Field {form} name="subject">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Select Subject</Form.Label>
                  {#if $formData.department}
                    <SelectPicker
                      name="Select subject"
                      onValueChange={handleDepartmentChange}
                      {props}
                      class=""
                      selections={subjectsDropdown?.map((subject) => ({
                        label: subject.name,
                        value: subject.name
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

            <Form.Field {form} name="start_time">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Select Start Time</Form.Label>
                  <Combobox
                    name="Select start time"
                    placeholder="Search start time"
                    selections={availableTimes}
                    bind:selected={$formData.start_time}
                  />
                  <input type="hidden" {...props} bind:value={$formData.start_time} />
                {/snippet}
              </Form.Control>
              <Form.Description />
              <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="end_time">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Select End Time</Form.Label>
                  <Combobox
                    name="Select end time"
                    placeholder="Search end time"
                    selections={availableTimes}
                    bind:selected={$formData.end_time}
                  />
                  <input type="hidden" {...props} bind:value={$formData.end_time} />
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
                      name="Select room"
                      selections={roomsDropdown?.map((room) => ({
                        label: room.code,
                        value: room.code
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

            Update
          </Form.Button>
        </div>
      </form>
    </ScrollArea>
  </AlertDialog.Content>
</AlertDialog.Root>
