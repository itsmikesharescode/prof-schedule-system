<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { X } from 'lucide-svelte';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { updateSchoolYearSchema, type UpdateSchoolYearSchema } from './schema';
  import { departments } from '$lib/metadata';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';

  interface Props {
    updateSchoolYearForm: SuperValidated<Infer<UpdateSchoolYearSchema>>;
    showUpdate: boolean;
  }

  let { showUpdate = $bindable(), updateSchoolYearForm }: Props = $props();

  const form = superForm(updateSchoolYearForm, {
    validators: zodClient(updateSchoolYearSchema)
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
      <Form.Field {form} name="department">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Department</Form.Label>
            <SelectPicker
              {...props}
              bind:selected={$formData.department}
              selections={departments}
              name="Select department"
            />
            <input type="hidden" name={props.name} bind:value={$formData.department} />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="schoolYear">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>School Year</Form.Label>
            <Input {...props} bind:value={$formData.schoolYear} placeholder="Enter school year" />
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
