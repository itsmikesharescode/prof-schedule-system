<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import LoaderCircle from 'lucide-svelte/icons/loader-circle';
  import X from 'lucide-svelte/icons/x';
  import Plus from 'lucide-svelte/icons/plus';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
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
          cleanUp();
          open = false;
          break;

        case 400:
          if (
            form.data.schoolYear &&
            form.data.semester &&
            form.data.yearLevel &&
            form.data.section &&
            !form.valid
          )
            return toast.error('Please answer the schedule details.');
          break;

        case 401:
          toast.error(data.msg);
          break;
      }
    }
  });

  const { form: formData, enhance, submitting, reset } = form;

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

  const addSubject = () => {
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
  };

  $effect(() => {
    if (subjects.length) {
      $formData.subjects = subjects;
    }
  });

  const sb = $page.data.supabase;

  let schoolYearsDropdown = $state<Awaited<ReturnType<typeof getSchoolYears>>>(null);
  let yearLevelsDropdown = $state<Awaited<ReturnType<typeof getYearLevel>>>(null);
  let sectionsDropdown = $state<Awaited<ReturnType<typeof getSections>>>(null);
  let roomsDropdown = $state<Awaited<ReturnType<typeof getRooms>>>(null);
  let subjectsDropdown = $state<Awaited<ReturnType<typeof getSubjects>>>(null);

  const getSchoolYears = async (supa: typeof sb, department: string) => {
    if (!sb) return;
    const { data, error } = await sb
      .from('school_years_tb')
      .select('*')
      .eq('department', department)
      .order('created_at', { ascending: true });

    if (error) return null;

    return data;
  };

  const getYearLevel = async (supa: typeof sb, department: string) => {
    if (!supa) return;
    const { data, error } = await supa
      .from('year_levels_tb')
      .select('*')
      .eq('department', department)
      .single();

    if (error) return null;

    return data;
  };

  const getSections = async (supa: typeof sb, department: string) => {
    if (!supa) return;
    const { data, error } = await supa
      .from('sections_tb')
      .select('*')
      .eq('department', department)
      .order('created_at', { ascending: true });

    if (error) return null;

    return data;
  };

  const getRooms = async (supa: typeof sb, department: string) => {
    if (!supa) return;
    const { data, error } = await supa
      .from('rooms_tb')
      .select('*')
      .eq('department', department)
      .order('created_at', { ascending: true });

    if (error) return null;

    return data;
  };

  const getSubjects = async (supa: typeof sb, department: string) => {
    if (!supa) return;
    const { data, error } = await supa
      .from('subjects_tb')
      .select('*')
      .eq('department', department)
      .order('created_at', { ascending: true });

    if (error) return null;

    return data;
  };

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

  const cleanUp = () => {
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

    schoolYearsDropdown = null;
    yearLevelsDropdown = null;
    sectionsDropdown = null;
    roomsDropdown = null;
    subjectsDropdown = null;
  };
</script>

<Button size="sm" onclick={() => (open = true)}>
  <Plus class="size-4" />
  Add Schedule
</Button>

<AlertDialog.Root bind:open>
  <AlertDialog.Content class="max-w-7xl p-0">
    <button
      onclick={() => {
        open = false;
        form.reset();
        cleanUp();
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
        <div class="grid grid-cols-[1fr,3fr] gap-6 px-6 pb-6">
          <!--Records-->
          <div class="">
            <div class="sticky top-0">
              <div class="mb-6">
                <span class="font-semibold text-muted-foreground underline">Records</span>
              </div>

              <Form.Field {form} name="department">
                <Form.Control>
                  {#snippet children({ props })}
                    <Form.Label>Select Department</Form.Label>
                    <SelectPicker
                      name="Select semester"
                      onValueChange={handleDepartmentChange}
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
                    <SelectPicker
                      disabled={!schoolYearsDropdown?.length}
                      name="Select school year"
                      {props}
                      class=""
                      selections={schoolYearsDropdown?.map((level) => ({
                        label: level.year,
                        value: level.year
                      })) ?? []}
                      bind:selected={$formData.schoolYear}
                    />
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
                    <SelectPicker
                      disabled={!yearLevelsDropdown?.levels.length}
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
                      disabled={!sectionsDropdown?.length}
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
                  {/snippet}
                </Form.Control>
                <Form.Description />
                <Form.FieldErrors />
              </Form.Field>
            </div>
          </div>

          <!--Schedule Details-->
          <input type="hidden" name="subjects" bind:value={$formData.subjects} />
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
                    <SelectPicker
                      disabled={!subjectsDropdown?.length}
                      name="Select subject"
                      selections={subjectsDropdown?.map((subject) => ({
                        label: subject.name,
                        value: subject.name
                      })) ?? []}
                      bind:selected={subject.name}
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
                      disabled={!roomsDropdown?.length}
                      placeholder="Select room"
                      name="Select room"
                      selections={roomsDropdown?.map((room) => ({
                        label: room.code,
                        value: room.code
                      })) ?? []}
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
