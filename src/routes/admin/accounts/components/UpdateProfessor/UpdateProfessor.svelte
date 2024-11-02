<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import { X, Plus } from 'lucide-svelte';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { updateProfessorSchema, type UpdateProfessorSchema } from './schema';
  interface Props {
    updateProfessorForm: SuperValidated<Infer<UpdateProfessorSchema>>;
    showUpdate: boolean;
  }

  let { showUpdate = $bindable(), updateProfessorForm }: Props = $props();

  const form = superForm(updateProfessorForm, {
    validators: zodClient(updateProfessorSchema)
  });

  const { form: formData, enhance, submitting } = form;

  $effect(() => {
    if (showUpdate) {
      //populate the id of target
    }
  });
</script>

<AlertDialog.Root bind:open={showUpdate}>
  <AlertDialog.Content>
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

    <AlertDialog.Header>
      <AlertDialog.Title>Update Professor</AlertDialog.Title>
      <AlertDialog.Description>
        Fill the fields below to update the professor.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" use:enhance>
      <Form.Field {form} name="programHead">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Program Head</Form.Label>
            <Input
              {...props}
              bind:value={$formData.programHead}
              placeholder="Enter program head name"
            />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="department">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Department Code</Form.Label>
            <Input
              {...props}
              bind:value={$formData.department}
              placeholder="Enter department code"
            />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="description">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Description</Form.Label>
            <Input
              {...props}
              bind:value={$formData.description}
              placeholder="Enter program description"
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
