<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import ProfessorSidebar from './(components)/nav/ProfessorSideBar.svelte';

  const { children, data } = $props();
</script>

<Sidebar.Provider>
  <ProfessorSidebar />

  <section class="w-full min-w-0 p-4">
    <Sidebar.Trigger />
    {@render children()}
  </section>
</Sidebar.Provider>
