<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$lib/components/ui/button/button.svelte';

  import { invalidateAll } from '$app/navigation';
  import LoaderCircle from 'lucide-svelte/icons/loader-circle';

  let loader = $state(false);
  const handleLogout = async () => {
    loader = true;
    await $page.data.supabase?.auth.signOut();
    await invalidateAll();
    loader = false;
  };
</script>

<main class="container flex min-h-screen justify-center">
  <section class="flex flex-col items-center justify-center gap-2">
    <h1 class="mt-[10dvh]">
      Hello {$page.data.user?.user_metadata.firstName}, 👋 your application is already in admin
      review kindly wait for the admin to review your application.
    </h1>
    <Button onclick={handleLogout} disabled={loader} class="relative">
      {#if loader}
        <div
          class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
        >
          <LoaderCircle class="size-4 animate-spin" />
        </div>
      {/if}

      Log out
    </Button>
  </section>
</main>
