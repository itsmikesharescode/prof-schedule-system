<script lang="ts">
  import Nav from './components/Nav/Nav.svelte';

  const { data } = $props();
</script>

<Nav loginForm={data.loginForm} registerForm={data.registerForm} />

<div
  class="flex min-h-screen flex-col items-center justify-center"
  style="background-image: url('/landing/bg-landing.webp'); background-size: cover; background-position: center;"
>
  <div
    class="relative mx-auto flex max-w-3xl flex-col items-center justify-center gap-4 rounded-lg bg-white/80 p-10"
  >
    <h1 class="text-4xl font-bold">WHY PROFSCHED?</h1>
    <p class="text-center">
      Manually creating schedules has several issues because it takes a lot of time and is easy to
      mess up. One Cainta College faces issues with setting class schedules and managing faculty
      loads, leading to inconsistencies that hinder productivity and cause delays.
    </p>

    <p class="text-center">
      One Cainta College is an educational institution that, like many others, relies heavily on
      effective schedule management. This process is crucial for the smooth functioning of the
      academic ecosystem, ensuring that both professors and students can plan their time effectively
      and avoid disruptions.
    </p>

    <p class="text-center">
      Manual scheduling prevalent in many institutions poses drawbacks due to the potential for
      human error and the time-consuming nature of the process. Even minor mistakes can disrupt the
      entire academic ecosystem, impacting both professors' and students' productivity.
    </p>

    <div class="absolute -bottom-[10rem] left-0 right-0 flex items-center justify-evenly gap-4">
      <div class="flex flex-col items-center justify-center gap-2.5">
        <div class="h-[150px] w-[150px] rounded-full bg-red-500"></div>
        <span>Beneficiaries</span>
      </div>
      <div class="flex flex-col items-center justify-center gap-2.5">
        <div class="h-[150px] w-[150px] rounded-full bg-red-500"></div>
        <span>Scheduler</span>
      </div>
      <div class="flex flex-col items-center justify-center gap-2.5">
        <div class="h-[150px] w-[150px] rounded-full bg-red-500"></div>
        <span>Researchers</span>
      </div>
    </div>
  </div>
</div>
