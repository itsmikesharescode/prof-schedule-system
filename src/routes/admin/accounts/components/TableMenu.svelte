<script lang="ts">
  import { CircleCheck, EllipsisVertical, Pencil, Trash2, UserPen } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import type { UpdateProfessorSchema } from './UpdateProfessor/schema';
  import UpdateProfessor from './UpdateProfessor/UpdateProfessor.svelte';
  import DeleteProfessor from './DeleteProfessor/DeleteProfessor.svelte';
  import type { Database } from '$lib/database.types';
  import UpdateStatus from './UpdateStatus/UpdateStatus.svelte';
  import type { UpdateStatusSchema } from './UpdateStatus/schema';
  interface Props {
    updateProfessorForm: SuperValidated<Infer<UpdateProfessorSchema>>;
    updateStatusForm: SuperValidated<Infer<UpdateStatusSchema>>;
    professor: Database['public']['Tables']['professors_tb']['Row'];
  }

  let { updateProfessorForm, updateStatusForm, professor }: Props = $props();

  let showUpdate = $state(false);
  let showDelete = $state(false);
  let showUpdateStatus = $state(false);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <EllipsisVertical />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
      <DropdownMenu.Separator />
      <DropdownMenu.Item onclick={() => (showDelete = true)}>
        <Trash2 class="size-4" />
        Delete
      </DropdownMenu.Item>
      <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger>
          <Pencil class="size-4" />
          <span>Update</span>
        </DropdownMenu.SubTrigger>
        <DropdownMenu.SubContent>
          <DropdownMenu.Item onclick={() => (showUpdateStatus = true)}>
            <CircleCheck class="size-4" />
            <span>Status</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item onclick={() => (showUpdate = true)}>
            <UserPen class="size-4" />
            <span>Account Information</span>
          </DropdownMenu.Item>
        </DropdownMenu.SubContent>
      </DropdownMenu.Sub>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

<UpdateProfessor {professor} bind:showUpdate {updateProfessorForm} />
<DeleteProfessor {professor} bind:showDelete />
<UpdateStatus {professor} bind:showUpdateStatus {updateStatusForm} />
