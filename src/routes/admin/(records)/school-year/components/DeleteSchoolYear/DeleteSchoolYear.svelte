<script lang="ts">
  import { enhance } from '$app/forms';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index';
  import Button from '$lib/components/ui/button/button.svelte';
  import type { Database } from '$lib/database.types';

  interface Props {
    schoolYear: Database['public']['Tables']['school_years_tb']['Row'];
    showDelete: boolean;
  }

  let { showDelete = $bindable() }: Props = $props();
</script>

<AlertDialog.Root bind:open={showDelete}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete the school year.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <Button size="sm" variant="outline" onclick={() => (showDelete = false)}>Cancel</Button>
      <form method="POST" action="?/deleteSchoolYearEvent" use:enhance>
        <Button size="sm">Continue</Button>
      </form>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
