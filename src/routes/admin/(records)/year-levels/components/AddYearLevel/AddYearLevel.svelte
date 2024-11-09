<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import { X, Plus } from 'lucide-svelte';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { addYearLevelSchema, type AddYearLevelSchema } from './schema';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';
  import { departments } from '$lib/metadata';

  interface Props {
    addSchoolYearForm: SuperValidated<Infer<AddYearLevelSchema>>;
  }

  let { addSchoolYearForm }: Props = $props();

  let open = $state(false);

  const form = superForm(addSchoolYearForm, {
    validators: zodClient(addYearLevelSchema)
  });

  const { form: formData, enhance, submitting } = form;
</script>

<Button size="sm" onclick={() => (open = true)}>
  <Plus class="size-4" />
  Add Year Level
</Button>

<AlertDialog.Root bind:open>
  <AlertDialog.Content class="">
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

    <AlertDialog.Header class="">
      <AlertDialog.Title>New Year Level</AlertDialog.Title>
      <AlertDialog.Description>
        Fill the fields below to create a new year level.
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

      <Form.Field {form} name="yearLevel">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Year Level</Form.Label>
            <Input {...props} bind:value={$formData.yearLevel} placeholder="Enter year level" />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <AlertDialog.Footer>
        <Form.Button size="sm">Create</Form.Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
