<script lang="ts">
  import Logout from './components/Logout.svelte';
</script>

<nav class="sticky top-0 z-50 bg-gradient-to-l from-[#3331C2] to-black p-2">
  <div class="container flex items-center justify-between">
    <div class="flex items-center gap-2">
      <img src="/favicon.png" alt="system logo" class="h-[50px] w-[50px]" />
      <span class="text-2xl font-bold text-white">ProfSched</span>
    </div>

    <div class="flex items-center gap-2">
      <Logout />
    </div>
  </div>
</nav>
