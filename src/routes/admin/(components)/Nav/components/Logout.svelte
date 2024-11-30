<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import { LogOut } from 'lucide-svelte';
  import { goto } from '$app/navigation';
  import { LoaderCircle } from 'lucide-svelte';
  import { useSupabaseState } from '$lib/runes/supabaseState.svelte';

  let open = $state(false);
  let loading = $state(false);

  const supabaseState = useSupabaseState();
  const sb = supabaseState.get();

  const handleLogout = async () => {
    if (!sb) return;

    loading = true;
    const { error } = await sb.auth.signOut();
    if (error) {
      console.error(error);
    }
    await goto('/');
  };
</script>

<Button size="sm" onclick={() => (open = true)} class="flex items-center justify-between">
  <LogOut class="size-4" />
  Logout
</Button>

<AlertDialog.Root bind:open>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>You are about to log out in the system.</AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <Button disabled={loading} size="sm" variant="secondary" onclick={() => (open = false)}>
        Cancel
      </Button>
      <Button disabled={loading} size="sm" class="relative" onclick={handleLogout}>
        {#if loading}
          <div class="absolute inset-0 flex items-center justify-center rounded-lg bg-primary">
            <LoaderCircle class="size-4 animate-spin" />
          </div>
        {/if}
        Continue
      </Button>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
