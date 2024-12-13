<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import { X, Plus } from 'lucide-svelte';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { updateFacultySchema, type UpdateFacultySchema } from './schema';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index';
  import CustomComboBox from '../CustomComboBox.svelte';
  import { streamProfessors } from '../../../(db_calls)/streamProfessors';
  import { streamClassSchedules } from '../../../(db_calls)/streamClassSchedules';
  import LoaderCircle from 'lucide-svelte/icons/loader-circle';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { availableTimes } from '$lib/metadata';
  import { page } from '$app/stores';
  import { useTableState } from '../Table/tableState.svelte';
  import { tick } from 'svelte';
  import Combobox from '$lib/components/general/Combobox.svelte';
  import { convert24HourTo12Hour } from '$lib';

  interface Props {
    updateFacultyForm: SuperValidated<Infer<UpdateFacultySchema>>;
  }

  let { updateFacultyForm }: Props = $props();
  const tableState = useTableState();

  const form = superForm(updateFacultyForm, {
    validators: zodClient(updateFacultySchema),
    id: crypto.randomUUID(),
    onUpdate: ({ result }) => {
      const { status, data } = result as Result<{ msg: string }>;
      switch (status) {
        case 200:
          form.reset();
          tableState.setActiveRow(null);
          tableState.setShowUpdate(false);
          toast.success(data.msg);
          break;
        case 401:
          toast.error(data.msg);
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  let professors = $state<Awaited<ReturnType<typeof streamProfessors>>>(null);
  let schedules = $state<Awaited<ReturnType<typeof streamClassSchedules>>>(null);

  const handleShowUpdateChange = async () => {
    if (!$page.data.supabase) {
      professors = null;
      schedules = null;
      return;
    }
    const [profs, scheds] = await Promise.all([
      streamProfessors($page.data.supabase, null),
      streamClassSchedules($page.data.supabase, null)
    ]);

    professors = profs;
    schedules = scheds;
  };

  $effect(() => {
    if (tableState.getShowUpdate()) {
      $formData.id = tableState.getActiveRow()?.id ?? 0;
      $formData.schedule_id = tableState.getActiveRow()?.schedule_id.toString() ?? '';
      $formData.user_id = tableState.getActiveRow()?.professor_id ?? '';
      $formData.start_time = tableState.getActiveRow()?.start_time ?? '';
      $formData.end_time = tableState.getActiveRow()?.end_time ?? '';
    }
  });

  const open = $derived.by(() => {
    if (tableState.getShowUpdate()) {
      tick().then(async () => {
        await handleShowUpdateChange();
      });
      return true;
    }

    return false;
  });
</script>

<AlertDialog.Root {open}>
  <AlertDialog.Content class="p-0">
    <button
      onclick={() => {
        tableState.setActiveRow(null);
        tableState.setShowUpdate(false);
        professors = null;
        schedules = null;
        form.reset();
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <X class="size-4" />
      <span class="sr-only">Close</span>
    </button>

    <AlertDialog.Header class="px-6 pt-6">
      <AlertDialog.Title>Update Faculty</AlertDialog.Title>
      <AlertDialog.Description>Fill the fields below to update a faculty.</AlertDialog.Description>
    </AlertDialog.Header>

    <ScrollArea class="max-h-[30dvh]">
      <form method="POST" action="?/updateFacultyEvent" use:enhance class="px-6">
        <input type="hidden" name="id" bind:value={$formData.id} />
        <div class="flex flex-col gap-2.5 pb-10">
          <Form.Field {form} name="user_id">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Professor Name</Form.Label>
                <CustomComboBox
                  {...props}
                  name="Select Professor"
                  placeholder="Search for a professor"
                  selections={professors?.map((prof) => ({
                    label: `${prof.user_meta_data.firstName} ${prof.user_meta_data.middleName} ${prof.user_meta_data.lastName}`,
                    value: prof.user_id,
                    photoLink: prof.user_meta_data.avatar
                  })) ?? []}
                  bind:selected={$formData.user_id}
                />
                <input type="hidden" name={props.name} bind:value={$formData.user_id} />
              {/snippet}
            </Form.Control>
            <Form.Description />
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="schedule_id">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Scheduled Class</Form.Label>
                <CustomComboBox
                  {...props}
                  name="Select Schedule"
                  placeholder="Search for a schedule"
                  selections={schedules?.map((sched) => ({
                    label: `${sched.subject} - ${sched.section} - ${sched.day}`,
                    value: sched.id.toString()
                  })) ?? []}
                  bind:selected={$formData.schedule_id}
                />
                <input type="hidden" name={props.name} bind:value={$formData.schedule_id} />
              {/snippet}
            </Form.Control>
            <Form.Description />
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="start_time">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Start Time</Form.Label>
                <Combobox
                  {...props}
                  name="Select Start Time"
                  placeholder="Select start time"
                  selections={availableTimes}
                  bind:selected={$formData.start_time}
                />
                <input type="hidden" name={props.name} bind:value={$formData.start_time} />
              {/snippet}
            </Form.Control>
            <Form.Description />
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="end_time">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>End Time</Form.Label>
                <Combobox
                  {...props}
                  name="Select End Time"
                  placeholder="Select end time"
                  selections={availableTimes}
                  bind:selected={$formData.end_time}
                />
                <input type="hidden" name={props.name} bind:value={$formData.end_time} />
              {/snippet}
            </Form.Control>
            <Form.Description />
            <Form.FieldErrors />
          </Form.Field>
        </div>

        <div class="pointer-events-none sticky bottom-6 left-0 right-0 flex justify-end">
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
