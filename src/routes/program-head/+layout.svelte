<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import ProgramHeadSideBar from './(components)/Nav/ProgramHeadSideBar.svelte';

  const { children, data } = $props();
</script>

<Sidebar.Provider>
  <ProgramHeadSideBar />

  <section class="w-full min-w-0 p-4">
    <Sidebar.Trigger />
    {@render children()}
  </section>
</Sidebar.Provider>
