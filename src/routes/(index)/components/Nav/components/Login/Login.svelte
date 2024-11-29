<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import { loginSchema, type LoginSchema } from './schema';
  import Button from '$lib/components/ui/button/button.svelte';
  import { X } from 'lucide-svelte';
  import { superForm } from 'sveltekit-superforms/client';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { toast } from 'svelte-sonner';
  import { LoaderCircle } from 'lucide-svelte';

  interface Props {
    loginForm: SuperValidated<Infer<LoginSchema>>;
  }

  const { loginForm }: Props = $props();

  let open = $state(false);

  const form = superForm(loginForm, {
    validators: zodClient(loginSchema),
    id: 'loginEvent',
    onUpdate({ result }) {
      const { status, data } = result;
      switch (status) {
        case 200:
          toast.success(data.msg);
          break;
        case 401:
          toast.error(data.msg);
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;
</script>

<Button size="sm" onclick={() => (open = true)}>Log in</Button>
<AlertDialog.Root bind:open>
  <AlertDialog.Content>
    <button
      onclick={async () => {
        open = false;
        form.reset();
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <X class="size-4" />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header>
      <AlertDialog.Title>Log in to ProfSched</AlertDialog.Title>
    </AlertDialog.Header>

    <form method="POST" action="?/loginEvent" use:enhance>
      <Form.Field {form} name="email">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Email</Form.Label>
            <Input {...props} bind:value={$formData.email} placeholder="Enter your email" />
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
        <Form.Button disabled={$submitting} size="sm" class="relative">
          {#if $submitting}
            <div
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
            >
              <LoaderCircle class="size-4 animate-spin" />
            </div>
          {/if}
          Log in
        </Form.Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
