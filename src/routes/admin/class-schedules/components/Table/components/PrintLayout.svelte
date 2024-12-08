<script lang="ts">
  import type { ClassSchedulesPageTable } from '../data/schemas';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  interface Props {
    data: ClassSchedulesPageTable[];
    open: boolean;
  }

  let { open = $bindable(), data }: Props = $props();
</script>

<AlertDialog.Root bind:open>
  <AlertDialog.Content class="h-full max-w-full">
    <AlertDialog.Header>
      <AlertDialog.Title>Plss wait</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your account and remove your data
        from our servers.
      </AlertDialog.Description>
    </AlertDialog.Header>
  </AlertDialog.Content>
</AlertDialog.Root>
