<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import Login from './components/Login.svelte';
  import type { LoginSchema, SignupSchema } from './components/schema';
  import SignUp from './components/SignUp.svelte';

  interface Props {
    loginForm: SuperValidated<Infer<LoginSchema>>;
    registerForm: SuperValidated<Infer<SignupSchema>>;
  }

  let { loginForm, registerForm }: Props = $props();
</script>

<nav class="sticky top-0 z-50 bg-gradient-to-l from-[#3331C2] to-black p-2">
  <div class="container flex items-center justify-between">
    <div class="flex items-center gap-2">
      <img src="/favicon.png" alt="system logo" class="h-[50px] w-[50px]" />
      <span class="text-2xl font-bold text-white">ProfSched</span>
    </div>

    <div class="flex items-center gap-2">
      <Login {loginForm} />
      <SignUp {registerForm} />
    </div>
  </div>
</nav>
