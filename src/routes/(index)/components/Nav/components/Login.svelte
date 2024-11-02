<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index';
  import Button from '$lib/components/ui/button/button.svelte';
  import X from 'lucide-svelte/icons/x';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import type { LoginSchema } from './schema';

  interface Props {
    loginForm: SuperValidated<Infer<LoginSchema>>;
  }

  let { loginForm }: Props = $props();

  let open = $state(true);
</script>

<Button size="sm" onclick={() => (open = true)}>Log in</Button>
<AlertDialog.Root bind:open>
  <AlertDialog.Content class="p-0">
    <button
      onclick={() => (open = false)}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <X class="size-4" />
      <span class="sr-only">Close</span>
    </button>

    <AlertDialog.Header class="rounded-t-lg bg-gradient-to-l from-[#3331C2] to-black p-2">
      <div class="flex items-center gap-2">
        <img src="/favicon.png" alt="system logo" class="h-[50px] w-[50px]" />
        <AlertDialog.Title class="text-white">ProfSched - Log in</AlertDialog.Title>
      </div>
    </AlertDialog.Header>

    <div class="p-2"></div>

    <!-- <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action>Continue</AlertDialog.Action>
    </AlertDialog.Footer> -->
  </AlertDialog.Content>
</AlertDialog.Root>
