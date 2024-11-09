<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import { X, Plus, LoaderCircle } from 'lucide-svelte';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { updateSectionSchema, type UpdateSectionSchema } from './schema';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';
  import { classPeriods, departments } from '$lib/metadata';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import type { Database } from '$lib/database.types';

  interface Props {
    section: Database['public']['Tables']['sections_tb']['Row'];
    updateSectionForm: SuperValidated<Infer<UpdateSectionSchema>>;
    showUpdate: boolean;
  }

  let { showUpdate = $bindable(), updateSectionForm, section }: Props = $props();

  const form = superForm(updateSectionForm, {
    validators: zodClient(updateSectionSchema),
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
      $formData.id = section.id;
      $formData.department = section.department;
      $formData.class = section.class;
      $formData.sectionCode = section.section_code;
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
      <AlertDialog.Title>Update Section</AlertDialog.Title>
      <AlertDialog.Description>
        Fill the fields below to update the section.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" action="?/addSectionEvent" use:enhance>
      <input type="hidden" bind:value={$formData.id} />
      <Form.Field {form} name="department">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Department</Form.Label>
            <SelectPicker
              {...props}
              name="Select Department"
              selections={departments}
              bind:selected={$formData.department}
            />
            <input type="hidden" {...props} bind:value={$formData.department} />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="class">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Class</Form.Label>
            <SelectPicker
              {...props}
              name="Select Class"
              selections={classPeriods}
              bind:selected={$formData.class}
            />
            <input type="hidden" {...props} bind:value={$formData.class} />
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
