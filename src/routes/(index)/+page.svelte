<script lang="ts">
  import Nav from './components/Nav/Nav.svelte';
  import WhyProfSched from './components/Heros/WhyProfSched.svelte';
  import ProfSchedBody from './components/Heros/ProfSchedBody.svelte';

  const { data } = $props();
</script>

<Nav registerForm={data.registerForm} />

<main class="min-h-screen">
  <div class="container mt-5 flex flex-col gap-5 p-3">
    <WhyProfSched />
  </div>
</main>

<main class="bg-secondary">
  <div class="container p-3">
    <ProfSchedBody />
  </div>
</main>
