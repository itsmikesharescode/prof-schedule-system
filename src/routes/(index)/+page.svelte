<script lang="ts">
	import WhyProfSched from './components/Heros/WhyProfSched.svelte';
	import ProfSchedBody from './components/Heros/ProfSchedBody.svelte';
	import Nav from './components/Nav/Nav.svelte';
	const { data } = $props();
</script>

<main class="relative min-h-screen">
	<Nav loginForm={data.loginForm} registerForm={data.registerForm} />
	<enhanced:img
		src="./assets/school-backdrop-photo.jpg"
		alt="bg-photo"
		class="absolute inset-0 -z-10 h-full w-full object-cover brightness-50"
	/>
	<section class="h-[50dvh]">
		<div class="container mt-5 flex flex-col gap-5 p-3">
			<WhyProfSched />
		</div>
	</section>

	<section class="relative h-[50dvh] bg-secondary/70">
		<enhanced:img
			src="./assets/faculty-photo.jpg"
			alt="faculty-bg"
			class="absolute inset-0 -z-10 h-full w-full object-cover"
		/>
		<div class="container p-3">
			<ProfSchedBody />
		</div>
	</section>
</main>
