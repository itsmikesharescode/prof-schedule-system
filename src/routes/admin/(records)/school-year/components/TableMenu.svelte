<script lang="ts">
  import { EllipsisVertical, Pencil, Trash2 } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import type { UpdateSchoolYearSchema } from './UpdateSchoolYear/schema';
  import UpdateSchoolYear from './UpdateSchoolYear/UpdateSchoolYear.svelte';
  import DeleteSchoolYear from './DeleteSchoolYear/DeleteSchoolYear.svelte';
  import type { Database } from '$lib/database.types';

  interface Props {
    schoolYear: Database['public']['Tables']['school_years_tb']['Row'];
    updateSchoolYearForm: SuperValidated<Infer<UpdateSchoolYearSchema>>;
  }

  let { updateSchoolYearForm, schoolYear }: Props = $props();

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

<UpdateSchoolYear {schoolYear} bind:showUpdate {updateSchoolYearForm} />
<DeleteSchoolYear {schoolYear} bind:showDelete />
