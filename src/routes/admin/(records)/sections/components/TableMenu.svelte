<script lang="ts">
  import { EllipsisVertical, Pencil, Trash2 } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import type { UpdateSectionSchema } from './UpdateSection/schema';
  import UpdateSchoolYear from './UpdateSection/UpdateSection.svelte';
  import DeleteSchoolYear from './DeleteSection/DeleteSection.svelte';

  interface Props {
    updateSectionForm: SuperValidated<Infer<UpdateSectionSchema>>;
  }

  let { updateSectionForm }: Props = $props();

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

<UpdateSchoolYear bind:showUpdate {updateSectionForm} />
<DeleteSchoolYear bind:showDelete />
