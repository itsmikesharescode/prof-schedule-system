<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import AdminSidebar from './(components)/Nav/AdminSidebar.svelte';

  const { children, data } = $props();
</script>

<Sidebar.Provider>
  <AdminSidebar />

  <section class="w-full min-w-0 p-4">
    <Sidebar.Trigger />
    {@render children()}
  </section>
</Sidebar.Provider>
