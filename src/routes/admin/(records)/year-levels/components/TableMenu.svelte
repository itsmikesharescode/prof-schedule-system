<script lang="ts">
  import { EllipsisVertical, Pencil, Trash2 } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import type { UpdateYearLevelSchema } from './UpdateYearLevel/schema';
  import UpdateYearLevel from './UpdateYearLevel/UpdateYearLevel.svelte';
  import DeleteYearLevel from './DeleteYearLevel/DeleteYearLevel.svelte';
  import type { Database } from '$lib/database.types';

  interface Props {
    updateYearLevelForm: SuperValidated<Infer<UpdateYearLevelSchema>>;
    yearLevel: Database['public']['Tables']['year_levels_tb']['Row'];
  }

  let { updateYearLevelForm, yearLevel }: Props = $props();

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

<UpdateYearLevel {yearLevel} bind:showUpdate {updateYearLevelForm} />
<DeleteYearLevel {yearLevel} bind:showDelete />
