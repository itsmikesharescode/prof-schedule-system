<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import { X, Plus } from 'lucide-svelte';
  import { fileProxy, type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { addFacultySchema, type AddFacultySchema } from './schema';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index';
  import Combobox from '$lib/components/general/Combobox.svelte';
  import { availableTimes, days } from '$lib/metadata';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';
  import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';

  interface Props {
    addFacultyForm: SuperValidated<Infer<AddFacultySchema>>;
  }

  let { addFacultyForm }: Props = $props();

  let open = $state(false);

  const form = superForm(addFacultyForm, {
    validators: zodClient(addFacultySchema)
  });

  const { form: formData, enhance, submitting } = form;
</script>

<Button size="sm" onclick={() => (open = true)}>
  <Plus class="size-4" />
  Assign Faculty
</Button>

<AlertDialog.Root bind:open>
  <AlertDialog.Content class="max-w-7xl p-0">
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
      <AlertDialog.Title>New Faculty</AlertDialog.Title>
      <AlertDialog.Description>
        Fill the fields below to assign a new faculty.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <ScrollArea class="h-[80dvh]">
      <form method="POST" enctype="multipart/form-data" use:enhance class=" ">
        <Form.Field {form} name="username">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Username</Form.Label>
              <Input {...props} bind:value={$formData.username} />
            {/snippet}
          </Form.Control>
          <Form.Description>This is your public display name.</Form.Description>
          <Form.FieldErrors />
        </Form.Field>

        <div class="pointer-events-none sticky bottom-6 left-0 right-0 flex justify-end px-6">
          <Form.Button size="sm" class="pointer-events-auto">Create</Form.Button>
        </div>
      </form>
    </ScrollArea>
  </AlertDialog.Content>
</AlertDialog.Root>
