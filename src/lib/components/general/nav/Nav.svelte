<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { useUserState } from '$lib/runes/userState.svelte';

  const userState = useUserState();
</script>

<nav class="bg-gradient-to-l from-[#3331C2] to-black p-2">
  <div class="container flex items-center justify-between">
    <div class="flex items-center gap-2">
      <img src="/favicon.png" alt="system logo" class="h-[50px] w-[50px]" />
      <span class="text-2xl font-bold text-white">ProfSched</span>
    </div>

    <div class="flex items-center gap-2">
      <Button size="sm">Log in</Button>
      <Button size="sm" variant="secondary">Sign up</Button>
    </div>
  </div>
</nav>
