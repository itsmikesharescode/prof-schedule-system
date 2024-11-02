<script lang="ts">
  import Nav from './(components)/Nav/Nav.svelte';

  const { children } = $props();
</script>

<Nav />
{@render children()}
