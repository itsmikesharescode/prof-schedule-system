<script lang="ts">
  import Darkmode from '$lib/components/general/Darkmode.svelte';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import Register from './components/Register/Register.svelte';
  import type { RegisterSchema } from './components/Register/schema';
  import type { LoginSchema } from './components/Login/schema';
  import Login from './components/Login/Login.svelte';

  interface Props {
    registerForm: SuperValidated<Infer<RegisterSchema>>;
    loginForm: SuperValidated<Infer<LoginSchema>>;
  }

  const { registerForm, loginForm }: Props = $props();
</script>

<nav class="sticky top-0 z-50 w-full border-b-2 bg-secondary">
  <div class="container flex items-center justify-between p-2">
    <div class="flex items-center gap-2">
      <img src="/favicon.png" alt="system logo" class="h-10 w-10" />
      <span class="text-xl font-bold">ProfSched</span>
    </div>

    <div class="flex items-center gap-2.5">
      <Login {loginForm} />
      <Register {registerForm} />
      <Darkmode />
    </div>
  </div>
</nav>
