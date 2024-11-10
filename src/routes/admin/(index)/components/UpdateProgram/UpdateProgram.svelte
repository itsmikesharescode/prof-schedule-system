<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { X, LoaderCircle } from 'lucide-svelte';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { updateProgramSchema, type UpdateProgramSchema } from './schema';
  import { toast } from 'svelte-sonner';
  import type { Result } from '$lib/types';
  import type { Database } from '$lib/database.types';
  interface Props {
    program: Database['public']['Tables']['programs_tb']['Row'];
    updateProgramForm: SuperValidated<Infer<UpdateProgramSchema>>;
    showUpdate: boolean;
  }

  let { showUpdate = $bindable(), updateProgramForm, program }: Props = $props();

  const form = superForm(updateProgramForm, {
    validators: zodClient(updateProgramSchema),
    id: crypto.randomUUID(),
    onUpdate: ({ result }) => {
      const { status, data } = result as Result<{ msg: string }>;
      switch (status) {
        case 200:
          form.reset();
          showUpdate = false;
          toast.success(data.msg);
          break;
        case 401:
          toast.error(data.msg);
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  $effect(() => {
    if (showUpdate) {
      $formData.id = program.id;
      $formData.programHead = program.head;
      $formData.department = program.code;
      $formData.description = program.description;
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
      <AlertDialog.Title>Update Program</AlertDialog.Title>
      <AlertDialog.Description>
        Fill the fields below to update the program.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" action="?/updateProgramEvent" use:enhance>
      <input type="hidden" name="id" bind:value={$formData.id} />
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
        <Form.Button disabled={$submitting} size="sm" class="relative">
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
