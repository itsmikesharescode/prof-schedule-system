<script lang="ts">
  import { page } from '$app/stores';
  import FilterPicker from '$lib/components/general/FilterPicker.svelte';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import { departments } from '$lib/metadata';
  import AdminSidebar from './(components)/Nav/AdminSidebar.svelte';

  const { children, data } = $props();

  let open = $state(true);
</script>

<Sidebar.Provider bind:open>
  <AdminSidebar />
  <main class="w-full p-2">
    <div class={!open ? 'fixed left-0 z-50' : 'hidden'}>
      <Sidebar.Trigger title="Open sidebar" />
    </div>

    {#if !['/admin/reports', '/admin/logs'].includes($page.url.pathname)}
      <div class="pointer-events-auto fixed top-2 z-50">
        <FilterPicker
          streamPrograms={data.streamPrograms}
          name="Select filter"
          class="pointer-events-auto top-6 max-w-fit"
          selections={departments}
        />
      </div>
    {/if}
    {@render children()}
  </main>
</Sidebar.Provider>
