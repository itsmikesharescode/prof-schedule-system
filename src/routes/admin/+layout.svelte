<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import AdminSidebar from './(components)/Nav/AdminSidebar.svelte';
  const { children } = $props();
</script>

{@render children()}
<Sidebar.Provider>
  <AdminSidebar />
  <main>
    <Sidebar.Trigger />
    {@render children?.()}
  </main>
</Sidebar.Provider>
