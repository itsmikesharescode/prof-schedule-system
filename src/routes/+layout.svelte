<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.css';
  import { invalidate } from '$app/navigation';
  import { initUserState, useUserState } from '$lib/runes/userState.svelte';
  import { ModeWatcher } from 'mode-watcher';
  import { Toaster } from '$lib/components/ui/sonner/index';
  import { initSupabaseState, useSupabaseState } from '$lib/runes/supabaseState.svelte';
  import { auxiliaryState } from '$lib/runes/auxiliaryState.svelte';

  let { children, data } = $props();

  initUserState();
  initSupabaseState();

  const userState = useUserState();
  const supabaseState = useSupabaseState();
  onMount(() => {
    const { data: sbCB } = data.supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== data.session?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => sbCB.subscription.unsubscribe();
  });

  const auxilarySetter = async () => {
    //TODO: if there is better solution maybe replace this we need to promise all in the client for better navigation
    let tempData = await data.streamDepartments;
    auxiliaryState.setDepartments(tempData);
  };

  $effect(() => {
    userState.set(data.user);
    supabaseState.set(data.supabase);
    auxilarySetter();
  });
</script>

<ModeWatcher />
<Toaster position="bottom-right" richColors />
{@render children()}
