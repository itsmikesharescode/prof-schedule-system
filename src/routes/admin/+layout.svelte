<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import AdminSidebar from './(components)/Nav/AdminSidebar.svelte';
  const { children } = $props();

  let open = $state(true);
</script>

{@render children()}
<Sidebar.Provider bind:open>
  <AdminSidebar />
  <main>
    <div class={!open ? 'fixed left-0' : 'hidden'}>
      <Sidebar.Trigger title="Open sidebar" />
    </div>
    {@render children?.()}
  </main>
</Sidebar.Provider>
