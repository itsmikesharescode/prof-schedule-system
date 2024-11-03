<script lang="ts">
  import Darkmode from '$lib/components/general/Darkmode.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
</script>

<nav class="sticky top-0 z-50 w-full border-b-2 bg-secondary">
  <div class="container flex items-center justify-between p-2">
    <div class="flex items-center gap-2">
      <img src="/favicon.png" alt="system logo" class="h-10 w-10" />
      <span class="text-xl font-bold">ProfSched</span>
    </div>

    <div class="flex items-center gap-2.5">
      <Button size="sm">Log in</Button>
      <Button size="sm">Sign Up Free</Button>
      <Darkmode />
    </div>
  </div>
</nav>
