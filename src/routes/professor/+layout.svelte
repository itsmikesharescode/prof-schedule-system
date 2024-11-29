<script lang="ts">
  import Nav from './(components)/nav/Nav.svelte';
  const { children } = $props();
</script>

<Nav />
{@render children()}
