<script lang="ts">
  import Nav from './components/Nav/Nav.svelte';

  const { data } = $props();
</script>

<Nav loginForm={data.loginForm} registerForm={data.registerForm} />
