<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { X, LoaderCircle } from 'lucide-svelte';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { updateSubjectSchema, type UpdateSubjectSchema } from './schema';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { auxiliaryState } from '$lib/runes/auxiliaryState.svelte';
  import { useTableState } from '../Table/tableState.svelte';

  interface Props {
    updateSubjectForm: SuperValidated<Infer<UpdateSubjectSchema>>;
  }

  let { updateSubjectForm }: Props = $props();

  const tableState = useTableState();

  const form = superForm(updateSubjectForm, {
    validators: zodClient(updateSubjectSchema),
    id: crypto.randomUUID(),
    onUpdate: ({ result }) => {
      const { status, data } = result as Result<{ msg: string }>;
      switch (status) {
        case 200:
          form.reset();
          tableState.setShowUpdate(false);
          tableState.setActiveRow(null);
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
    if (tableState.getShowUpdate()) {
      $formData.id = tableState.getActiveRow()?.id ?? 0;
      $formData.department = `${tableState.getActiveRow()?.department},${tableState.getActiveRow()?.department_id}`;
      $formData.subjectName = tableState.getActiveRow()?.name ?? '';
      $formData.subjectCode = tableState.getActiveRow()?.code ?? '';
      $formData.unit = Number(tableState.getActiveRow()?.unit ?? 0);
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
      <AlertDialog.Title>New Subject</AlertDialog.Title>
      <AlertDialog.Description>
        Fill the fields below to update the subject.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" action="?/updateSubjectEvent" use:enhance>
      <input type="hidden" name="id" bind:value={$formData.id} />
      <Form.Field {form} name="department">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Department</Form.Label>
            <SelectPicker
              {...props}
              placeholder="Select department"
              bind:selected={$formData.department}
              selections={auxiliaryState.formatDepartments()}
            />
            <input type="hidden" name={props.name} bind:value={$formData.department} />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="subjectName">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Subject Name</Form.Label>
            <Input {...props} bind:value={$formData.subjectName} placeholder="Enter subject name" />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="subjectCode">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Subject Code</Form.Label>
            <Input {...props} bind:value={$formData.subjectCode} placeholder="Enter subject code" />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="unit">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Unit</Form.Label>
            <Input
              type="number"
              {...props}
              bind:value={$formData.unit}
              placeholder="Enter subject unit"
            />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <AlertDialog.Footer>
        <Form.Button size="sm" class="relative">
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
