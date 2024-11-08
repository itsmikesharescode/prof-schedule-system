<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import { X, Plus } from 'lucide-svelte';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { addScheduleSchema, type AddScheduleSchema } from './schema';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index';

  interface Props {
    addScheduleForm: SuperValidated<Infer<AddScheduleSchema>>;
  }

  let { addScheduleForm }: Props = $props();

  let open = $state(false);

  const form = superForm(addScheduleForm, {
    validators: zodClient(addScheduleSchema)
  });

  const { form: formData, enhance, submitting } = form;
</script>

<Button size="sm" onclick={() => (open = true)}>
  <Plus class="size-4" />
  Create Faculty
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
      <AlertDialog.Title>New Schedule</AlertDialog.Title>
      <AlertDialog.Description>
        Fill the fields below to create a new schedule.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <ScrollArea class="h-[80dvh]">
      <form method="POST" enctype="multipart/form-data" use:enhance class=" ">
        <div class="pointer-events-none sticky bottom-6 left-0 right-0 flex justify-end px-6">
          <Form.Button size="sm" class="pointer-events-auto">Create</Form.Button>
        </div>
      </form>
    </ScrollArea>
  </AlertDialog.Content>
</AlertDialog.Root>
