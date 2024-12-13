<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { X } from 'lucide-svelte';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { updateSchoolYearSchema, type UpdateSchoolYearSchema } from './schema';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { LoaderCircle } from 'lucide-svelte';
  import { auxiliaryState } from '$lib/runes/auxiliaryState.svelte';
  import { useTableState } from '../Table/tableState.svelte';

  interface Props {
    updateSchoolYearForm: SuperValidated<Infer<UpdateSchoolYearSchema>>;
  }

  let { updateSchoolYearForm }: Props = $props();

  const tableState = useTableState();

  const form = superForm(updateSchoolYearForm, {
    validators: zodClient(updateSchoolYearSchema),
    id: crypto.randomUUID(),
    onUpdate: ({ result }) => {
      const { status, data } = result as Result<{ msg: string }>;
      switch (status) {
        case 200:
          toast.success(data.msg);
          tableState.setShowUpdate(false);
          tableState.setActiveRow(null);
          break;

        case 401:
          toast.error(data.msg);
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  $effect(() => {
    if (tableState.getShowUpdate()) {
      $formData.id = tableState.getActiveRow()?.id ?? 0;
      $formData.department = `${tableState.getActiveRow()?.department},${tableState.getActiveRow()?.department_id}`;
      $formData.schoolYear = tableState.getActiveRow()?.year ?? '';
    }
  });
</script>

<AlertDialog.Root open={tableState.getShowUpdate()}>
  <AlertDialog.Content class="">
    <button
      onclick={() => {
        tableState.setShowUpdate(false);
        tableState.setActiveRow(null);
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

    <form method="POST" action="?/updateSchoolYearEvent" use:enhance>
      <input type="hidden" name="id" bind:value={$formData.id} />

      <Form.Field {form} name="department">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Department</Form.Label>
            <SelectPicker
              {...props}
              bind:selected={$formData.department}
              selections={auxiliaryState.formatDepartments()}
              placeholder="Select department"
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
