<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import { X, Plus } from 'lucide-svelte';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { updateRoomSchema, type UpdateRoomSchema } from './schema';

  interface Props {
    updateRoomForm: SuperValidated<Infer<UpdateRoomSchema>>;
    showUpdate: boolean;
  }

  let { showUpdate = $bindable(), updateRoomForm }: Props = $props();

  const form = superForm(updateRoomForm, {
    validators: zodClient(updateRoomSchema)
  });

  const { form: formData, enhance, submitting } = form;

  $effect(() => {
    if (showUpdate) {
      //populate id
    }
  });
</script>

<AlertDialog.Root bind:open={showUpdate}>
  <AlertDialog.Content class="">
    <button
      onclick={() => {
        showUpdate = false;
        form.reset();
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <X class="size-4" />
      <span class="sr-only">Close</span>
    </button>

    <AlertDialog.Header class="">
      <AlertDialog.Title>Update Room</AlertDialog.Title>
      <AlertDialog.Description>Fill the fields below to update a room.</AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" use:enhance>
      <Form.Field {form} name="roomType">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Room Type</Form.Label>
            <Input {...props} bind:value={$formData.roomType} placeholder="Enter room type" />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="roomNumber">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Room Number</Form.Label>
            <Input {...props} bind:value={$formData.roomNumber} placeholder="Enter room number" />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="roomCode">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Room Code</Form.Label>
            <Input
              type="number"
              {...props}
              bind:value={$formData.roomCode}
              placeholder="Enter room code"
            />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <AlertDialog.Footer>
        <Form.Button size="sm">Update</Form.Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
