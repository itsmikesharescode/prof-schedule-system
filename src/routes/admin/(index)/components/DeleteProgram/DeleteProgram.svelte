<script lang="ts">
  import { enhance } from '$app/forms';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index';
  import Button from '$lib/components/ui/button/button.svelte';
  import type { Result } from '$lib/types';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { LoaderCircle } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';
  import { useTableState } from '../Table/tableState.svelte';

  const tableState = useTableState();

  let deleteLoader = $state(false);
  const deleteProgramEvent: SubmitFunction = () => {
    return async ({ result, update }) => {
      deleteLoader = true;
      const { status, data } = result as Result<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success(data.msg);
          tableState.setShowDelete(false);
          break;

        case 401:
          toast.error(data.msg);
          break;
      }
      await update();
      deleteLoader = false;
    };
  };
</script>

<AlertDialog.Root open={tableState.getShowDelete()}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete the program.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <Button size="sm" variant="outline" onclick={() => tableState.setShowDelete(false)}>
        Cancel
      </Button>
      <form method="POST" action="?/deleteProgramEvent" use:enhance={deleteProgramEvent}>
        <input name="id" type="hidden" value={tableState.getActiveRow()?.id ?? 0} />
        <Button type="submit" disabled={deleteLoader} size="sm" class="relative">
          {#if deleteLoader}
            <div
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
            >
              <LoaderCircle class="size-4 animate-spin" />
            </div>
          {/if}
          Continue
        </Button>
      </form>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
