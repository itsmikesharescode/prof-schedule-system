<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$lib/components/ui/button/button.svelte';
  import LogOut from 'lucide-svelte/icons/log-out';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { invalidateAll } from '$app/navigation';
  import LoaderCircle from 'lucide-svelte/icons/loader-circle';

  let open = $state(false);
  let loader = $state(false);
  const handleLogout = async () => {
    loader = true;
    await $page.data.supabase?.auth.signOut();
    await invalidateAll();
    loader = false;
  };
</script>

<section class="flex items-center gap-2.5">
  <span>
    Hello,👋 {$page.data.user?.user_metadata.role.toUpperCase()}
    <span class="text-muted-foreground">{$page.data.user?.user_metadata.lastName}</span>
  </span>

  <Button onclick={() => (open = true)} variant="outline" size="sm">
    <LogOut class="size-4" />
    Logout
  </Button>
</section>

<AlertDialog.Root bind:open>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Confirm Logout</AlertDialog.Title>
      <AlertDialog.Description>
        Are you sure you want to log out of your account? You will need to sign in again to access
        your schedule.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer class="items-center">
      <AlertDialog.Cancel>Stay Signed In</AlertDialog.Cancel>
      <Button onclick={handleLogout} disabled={loader} size="sm" class="relative">
        {#if loader}
          <div
            class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
          >
            <LoaderCircle class="size-4 animate-spin" />
          </div>
        {/if}

        Proceed
      </Button>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
