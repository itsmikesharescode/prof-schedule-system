<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import { X, LoaderCircle } from 'lucide-svelte';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { updateRequestSchema, type UpdateRequestSchema } from './schema';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index';
  import Combobox from '$lib/components/general/Combobox.svelte';
  import { availableTimes, days } from '$lib/metadata';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';
  import { toast } from 'svelte-sonner';
  import Textarea from '$lib/components/ui/textarea/textarea.svelte';
  import MultiSelect from '$lib/components/general/MultiSelect.svelte';
  import { useTableState } from '../Table/tableState.svelte';

  interface Props {
    updateRequestForm: SuperValidated<Infer<UpdateRequestSchema>>;
  }

  let { updateRequestForm }: Props = $props();

  const tableState = useTableState();

  const form = superForm(updateRequestForm, {
    validators: zodClient(updateRequestSchema),
    id: 'updateRequestEvent',
    onUpdate({ result }) {
      const { status, data } = result;
      switch (status) {
        case 200:
          toast.success(data.msg);
          form.reset();
          tableState.setActiveRow(null);
          tableState.setShowUpdate(false);
          break;
        case 401:
          toast.error(data.msg);
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  $effect(() => {
    if (tableState.getShowUpdate()) {
      $formData.id = tableState.getActiveRow()?.id ?? 0;
      $formData.start_time = tableState.getActiveRow()?.start_time ?? '';
      $formData.end_time = tableState.getActiveRow()?.end_time ?? '';
      $formData.days = tableState.getActiveRow()?.days ?? [];
      $formData.availability = tableState.getActiveRow()?.schedule.available ?? '';
      $formData.reason = tableState.getActiveRow()?.reason ?? '';
    }
  });
</script>

<AlertDialog.Root open={tableState.getShowUpdate()}>
  <AlertDialog.Content class="p-0">
    <button
      onclick={async () => {
        tableState.setActiveRow(null);
        tableState.setShowUpdate(false);
        form.reset();
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <X class="size-4" />
      <span class="sr-only">Close</span>
    </button>

    <AlertDialog.Header class="px-6 pt-6">
      <AlertDialog.Title>Update Request</AlertDialog.Title>
      <AlertDialog.Description>
        Fill the fields below to update your request.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <ScrollArea class="">
      <form
        method="POST"
        action="?/updateRequestEvent"
        use:enhance
        class="flex flex-col gap-2.5 px-6 pb-6"
      >
        <input name="id" type="hidden" bind:value={$formData.id} />

        <Form.Field {form} name="days">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Day</Form.Label>
              <MultiSelect
                placeholder="Select days"
                selections={days.map((day) => day.value)}
                bind:selected={$formData.days}
              />
              <input type="hidden" {...props} bind:value={$formData.days} />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="start_time">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Start Time</Form.Label>
              <Combobox
                name="Select start time"
                placeholder="Select start time"
                selections={availableTimes}
                bind:selected={$formData.start_time}
              />
              <input type="hidden" {...props} bind:value={$formData.start_time} />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="end_time">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>End Time</Form.Label>
              <Combobox
                name="Select end time"
                placeholder="Select end time"
                selections={availableTimes}
                bind:selected={$formData.end_time}
              />
              <input type="hidden" {...props} bind:value={$formData.end_time} />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="availability">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Availability</Form.Label>
              <SelectPicker
                placeholder="Select availability"
                noDescription
                selections={[
                  { value: 'Part Time', label: 'Part Time' },
                  { value: 'Full Time', label: 'Full Time' }
                ]}
                bind:selected={$formData.availability}
              />
              <input type="hidden" {...props} bind:value={$formData.availability} />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="reason">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Reason</Form.Label>
              <Textarea {...props} bind:value={$formData.reason} placeholder="Enter reason" />
            {/snippet}
          </Form.Control>
        </Form.Field>

        <div class="sticky bottom-4 flex justify-end">
          <Form.Button disabled={$submitting} size="sm" class="relative">
            {#if $submitting}
              <div
                class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
              >
                <LoaderCircle class="size-4 animate-spin" />
              </div>
            {/if}
            Update Request
          </Form.Button>
        </div>
      </form>
    </ScrollArea>
  </AlertDialog.Content>
</AlertDialog.Root>
