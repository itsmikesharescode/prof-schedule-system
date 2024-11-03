<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.css';
  import { invalidate } from '$app/navigation';
  import { initUserState, useUserState } from '$lib/runes/userState.svelte';
  import { ModeWatcher } from 'mode-watcher';
  import { Toaster } from '$lib/components/ui/sonner/index';

  let { children, data } = $props();

  initUserState();

  const userState = useUserState();

  onMount(() => {
    const { data: sbCB } = data.supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== data.session?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => sbCB.subscription.unsubscribe();
  });

  $effect(() => {
    userState.set(data.user);
  });
</script>

<ModeWatcher />
<Toaster position="top-left" richColors />
{@render children()}
