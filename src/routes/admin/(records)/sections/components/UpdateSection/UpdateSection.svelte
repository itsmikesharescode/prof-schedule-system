<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import { X, Plus } from 'lucide-svelte';
  import { fileProxy, type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { updateSectionSchema, type UpdateSectionSchema } from './schema';
  import ImagePicker from '$lib/components/general/ImagePicker.svelte';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index';
  import Combobox from '$lib/components/general/Combobox.svelte';
  import { availableTimes, days, departments, interests } from '$lib/metadata';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';
  import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';

  interface Props {
    updateSectionForm: SuperValidated<Infer<UpdateSectionSchema>>;
    showUpdate: boolean;
  }

  let { showUpdate = $bindable(), updateSectionForm }: Props = $props();

  const form = superForm(updateSectionForm, {
    validators: zodClient(updateSectionSchema)
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
      <AlertDialog.Title>Update School Year</AlertDialog.Title>
      <AlertDialog.Description>
        Fill the fields below to update a school year.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" use:enhance>
      <Form.Field {form} name="class">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Class</Form.Label>
            <Input {...props} bind:value={$formData.class} placeholder="Enter class" />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="sectionCode">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Section Code</Form.Label>
            <Input {...props} bind:value={$formData.sectionCode} placeholder="Enter section code" />
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
