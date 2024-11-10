<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index';
  import Button from '$lib/components/ui/button/button.svelte';
  import type { Database } from '$lib/database.types';
  import { LoaderCircle, X } from 'lucide-svelte';
  import * as Form from '$lib/components/ui/form/index.js';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { updateStatusSchema, type UpdateStatusSchema } from './schema';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';

  interface Props {
    professor: Database['public']['Tables']['professors_tb']['Row'];
    showUpdateStatus: boolean;
    updateStatusForm: SuperValidated<Infer<UpdateStatusSchema>>;
  }

  let { showUpdateStatus = $bindable(), updateStatusForm, professor }: Props = $props();

  const form = superForm(updateStatusForm, {
    validators: zodClient(updateStatusSchema),
    id: crypto.randomUUID(),
    onUpdate: ({ result }) => {
      const { status, data } = result as Result<{ msg: string }>;
      switch (status) {
        case 200:
          form.reset();
          toast.success(data.msg);
          showUpdateStatus = false;
          break;
        case 401:
          toast.error(data.msg);
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  $effect(() => {
    if (showUpdateStatus) {
      $formData.status = professor.user_meta_data.approved ? 'Active' : 'In-Active';
      $formData.userId = professor.user_id;
    }
  });
</script>

<AlertDialog.Root bind:open={showUpdateStatus}>
  <AlertDialog.Content>
    <button
      onclick={() => {
        showUpdateStatus = false;
        form.reset();
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <X class="size-4" />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header>
      <AlertDialog.Title>Update Status</AlertDialog.Title>
      <AlertDialog.Description>Update the status of the professor.</AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" action="?/updateStatusEvent" use:enhance>
      <input type="hidden" name="userId" bind:value={professor.user_id} />
      <Form.Field {form} name="status">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Status</Form.Label>
            <SelectPicker
              selections={[
                { label: 'Active', value: 'Active' },
                { label: 'In-Active', value: 'In-Active' }
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
          Update
        </Form.Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
