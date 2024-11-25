<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import AdminSidebar from './(components)/Nav/AdminSidebar.svelte';

  const { children, data } = $props();

  let open = $state(true);
</script>

<Sidebar.Provider bind:open>
  <AdminSidebar />
  <main class="w-full p-2">
    <div>
      <Sidebar.Trigger title={open ? 'Close sidebar' : 'Open sidebar'} />
    </div>

    {@render children()}
  </main>
</Sidebar.Provider>
