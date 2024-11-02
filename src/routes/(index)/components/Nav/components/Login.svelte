<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index';
  import Button from '$lib/components/ui/button/button.svelte';
  import X from 'lucide-svelte/icons/x';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { loginSchema, type LoginSchema } from './schema';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { Loader } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';

  interface Props {
    loginForm: SuperValidated<Infer<LoginSchema>>;
  }

  let { loginForm }: Props = $props();

  let open = $state(false);

  const form = superForm(loginForm, {
    validators: zodClient(loginSchema),
    onUpdate({ result }) {
      const { data, status } = result;
      switch (status) {
        case 200:
          toast.success('', { description: data.msg });
          break;
        case 401:
          toast.error('', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;
</script>

<Button size="sm" onclick={() => (open = true)}>Log in</Button>
<AlertDialog.Root bind:open>
  <AlertDialog.Content class="p-0">
    <button
      onclick={() => {
        open = false;
        form.reset();
      }}
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

    <div class="p-4">
      <form method="POST" action="?/loginEvent" use:enhance>
        <Form.Field {form} name="email">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Email</Form.Label>
              <Input
                type="email"
                {...props}
                bind:value={$formData.email}
                placeholder="Enter your email"
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="password">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Password</Form.Label>
              <Input
                type="password"
                {...props}
                bind:value={$formData.password}
                placeholder="Enter your password"
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <AlertDialog.Footer>
          <Form.Button disabled={$submitting} class="relative">
            {#if $submitting}
              <div
                class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
              >
                <Loader class="size-4 animate-spin text-white" />
              </div>
            {/if}
            Log in
          </Form.Button>
        </AlertDialog.Footer>
      </form>
    </div>
  </AlertDialog.Content>
</AlertDialog.Root>
