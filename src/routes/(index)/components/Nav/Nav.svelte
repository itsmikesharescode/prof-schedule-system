<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
</script>

<nav class="w-full border-b-2 bg-secondary">
  <div class="container flex items-center justify-between p-2">
    <div class="flex items-center gap-2">
      <img src="/favicon.png" alt="system logo" class="h-10 w-10" />
      <span class="text-xl font-bold">ProfSched</span>
    </div>

    <div class="">
      <Button size="sm">Log in</Button>
      <Button size="sm">Sign Up Free</Button>
    </div>
  </div>
</nav>
