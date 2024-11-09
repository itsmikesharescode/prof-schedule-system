<script lang="ts">
  import { EllipsisVertical, Pencil, Trash2 } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import type { UpdateSubjectSchema } from './UpdateSubject/schema';
  import UpdateSubject from './UpdateSubject/UpdateSubject.svelte';
  import DeleteSubject from './DeleteSubject/DeleteSubject.svelte';
  import type { Database } from '$lib/database.types';

  interface Props {
    subject: Database['public']['Tables']['subjects_tb']['Row'];
    updateSubjectForm: SuperValidated<Infer<UpdateSubjectSchema>>;
  }

  let { subject, updateSubjectForm }: Props = $props();

  let showUpdate = $state(false);
  let showDelete = $state(false);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <EllipsisVertical />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
      <DropdownMenu.Separator />
      <DropdownMenu.Item onclick={() => (showUpdate = true)}>
        <Pencil class="size-4" />
        Update
      </DropdownMenu.Item>
      <DropdownMenu.Item onclick={() => (showDelete = true)}>
        <Trash2 class="size-4" />
        Delete
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

<UpdateSubject {subject} bind:showUpdate {updateSubjectForm} />
<DeleteSubject {subject} bind:showDelete />
