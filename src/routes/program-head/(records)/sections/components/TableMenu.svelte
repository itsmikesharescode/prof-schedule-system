<script lang="ts">
  import { EllipsisVertical, Pencil, Trash2 } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import type { UpdateSectionSchema } from './UpdateSection/schema';
  import UpdateSchoolYear from './UpdateSection/UpdateSection.svelte';
  import DeleteSchoolYear from './DeleteSection/DeleteSection.svelte';
  import type { Database } from '$lib/database.types';

  interface Props {
    section: Database['public']['Tables']['sections_tb']['Row'];
    updateSectionForm: SuperValidated<Infer<UpdateSectionSchema>>;
  }

  let { section, updateSectionForm }: Props = $props();

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

<UpdateSchoolYear {section} bind:showUpdate {updateSectionForm} />
<DeleteSchoolYear {section} bind:showDelete />
