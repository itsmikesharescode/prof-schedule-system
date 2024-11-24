<script lang="ts">
  import WhyProfSched from './components/Heros/WhyProfSched.svelte';
  import ProfSchedBody from './components/Heros/ProfSchedBody.svelte';
  import Nav from './components/Nav/Nav.svelte';
  const { data } = $props();
</script>

<Nav loginForm={data.loginForm} registerForm={data.registerForm} />

<main class="">
  <div class="container mt-5 flex flex-col gap-5 p-3">
    <WhyProfSched />
  </div>
</main>

<main class="bg-secondary">
  <div class="container p-3">
    <ProfSchedBody />
  </div>
</main>
