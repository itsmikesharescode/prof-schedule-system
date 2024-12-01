<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index';
  import { LoaderCircle, X } from 'lucide-svelte';
  import * as Form from '$lib/components/ui/form/index.js';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { updateRequestStatusSchema, type UpdateRequestStatusSchema } from './schema';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { useTableState } from '../Table/tableState.svelte';

  interface Props {
    updateRequestStatusForm: SuperValidated<Infer<UpdateRequestStatusSchema>>;
  }

  const { updateRequestStatusForm }: Props = $props();

  const tableState = useTableState();

  const form = superForm(updateRequestStatusForm, {
    validators: zodClient(updateRequestStatusSchema),
    id: 'updateAccountStatus',
    onUpdate: ({ result }) => {
      const { status, data } = result as Result<{ msg: string }>;
      switch (status) {
        case 200:
          form.reset();
          toast.success(data.msg);
          tableState.setActiveRow(null);
          tableState.setShowUpdateStatus(false);
          break;
        case 401:
          toast.error(data.msg);
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  $effect(() => {
    if (tableState.getShowUpdateStatus()) {
      $formData.id = tableState.getActiveRow()?.id || 0;
      $formData.status = tableState.getActiveRow()?.status || '';

      return () => {
        $formData.id = 0;
        $formData.status = '';
      };
    }
  });
</script>

<AlertDialog.Root open={tableState.getShowUpdateStatus()}>
  <AlertDialog.Content>
    <button
      onclick={() => {
        form.reset();
        tableState.setActiveRow(null);
        tableState.setShowUpdateStatus(false);
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <X class="size-4" />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header>
      <AlertDialog.Title>Update Request Status</AlertDialog.Title>
      <AlertDialog.Description>Update the status of the request.</AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" action="?/updateRequestStatusEvent" use:enhance>
      <input type="hidden" name="id" bind:value={$formData.id} />
      <Form.Field {form} name="status">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Status</Form.Label>
            <SelectPicker
              selections={[
                { label: 'Pending', value: 'Pending' },
                { label: 'Approved', value: 'Approved' },
                { label: 'Rejected', value: 'Rejected' }
              ]}
              name="Select Status"
              bind:selected={$formData.status}
            />
            <input type="hidden" name={props.name} bind:value={$formData.status} />
          {/snippet}
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>

      <AlertDialog.Footer>
        <Form.Button disabled={$submitting} size="sm" class="pointer-events-auto relative">
          {#if $submitting}
            <div
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
            >
              <LoaderCircle class="size-4 animate-spin" />
            </div>
          {/if}
          Update Status
        </Form.Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
