<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import { X, Plus } from 'lucide-svelte';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { addFacultySchema, type AddFacultySchema } from './schema';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index';
  import CustomComboBox from '../CustomComboBox.svelte';
  import type { streamProfessors } from '../../../(db_calls)/streamProfessors';
  import type { streamClassSchedules } from '../../../(db_calls)/streamClassSchedules';

  interface Props {
    addFacultyForm: SuperValidated<Infer<AddFacultySchema>>;
    professors: Awaited<ReturnType<typeof streamProfessors>>;
    schedules: Awaited<ReturnType<typeof streamClassSchedules>>;
  }

  let { addFacultyForm, professors, schedules }: Props = $props();

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
  <AlertDialog.Content class="p-0">
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
    <ScrollArea class="max-h-[30dvh]">
      <form method="POST" action="?/addFaculty" use:enhance class="px-6">
        <div class="flex flex-col gap-2.5 pb-10">
          <Form.Field {form} name="user_id">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Professor Name</Form.Label>
                <CustomComboBox
                  {...props}
                  name="Select Professor"
                  placeholder="Search for a professor"
                  selections={professors?.map((prof) => ({
                    label: `${prof.user_meta_data.firstName} ${prof.user_meta_data.middleName} ${prof.user_meta_data.lastName}`,
                    value: prof.user_id,
                    photoLink: prof.user_meta_data.avatar
                  })) ?? []}
                  bind:selected={$formData.user_id}
                />
                <input type="hidden" name={props.name} bind:value={$formData.user_id} />
              {/snippet}
            </Form.Control>
          </Form.Field>

          <Form.Field {form} name="schedule_id">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Schedule Section</Form.Label>
                <CustomComboBox
                  {...props}
                  name="Select Schedule"
                  placeholder="Search for a schedule"
                  selections={schedules?.map((sched) => ({
                    label: sched.section,
                    value: sched.id.toString()
                  })) ?? []}
                  bind:selected={$formData.schedule_id}
                />
                <input type="hidden" name={props.name} bind:value={$formData.schedule_id} />
              {/snippet}
            </Form.Control>
          </Form.Field>
        </div>

        <div class="pointer-events-none sticky bottom-6 left-0 right-0 flex justify-end">
          <Form.Button size="sm" class="pointer-events-auto">Create</Form.Button>
        </div>
      </form>
    </ScrollArea>
  </AlertDialog.Content>
</AlertDialog.Root>
