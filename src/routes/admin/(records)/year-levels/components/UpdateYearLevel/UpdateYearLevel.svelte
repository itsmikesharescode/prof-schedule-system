<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { X, LoaderCircle } from 'lucide-svelte';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { updateYearLevelSchema, type UpdateYearLevelSchema } from './schema';
  import ImagePicker from '$lib/components/general/ImagePicker.svelte';
  import { departments } from '$lib/metadata';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';
  import type { Database } from '$lib/database.types';

  interface Props {
    yearLevel: Database['public']['Tables']['year_levels_tb']['Row'];
    updateYearLevelForm: SuperValidated<Infer<UpdateYearLevelSchema>>;
    showUpdate: boolean;
  }

  let { showUpdate = $bindable(), updateYearLevelForm, yearLevel }: Props = $props();

  const form = superForm(updateYearLevelForm, {
    validators: zodClient(updateYearLevelSchema)
  });

  const { form: formData, enhance, submitting } = form;

  $effect(() => {
    if (showUpdate) {
      $formData.id = yearLevel.id;
      $formData.yearLevel = yearLevel.level;
      $formData.department = yearLevel.department;
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
      <AlertDialog.Title>Update Year Level</AlertDialog.Title>
      <AlertDialog.Description>
        Fill the fields below to update a year level.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" use:enhance>
      <input type="hidden" name="id" bind:value={$formData.id} />
      <Form.Field {form} name="yearLevel">
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
