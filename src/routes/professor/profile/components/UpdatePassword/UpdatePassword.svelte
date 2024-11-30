<script lang="ts">
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import { updatePasswordSchema, type UpdatePasswordSchema } from './schema';
  import { superForm } from 'sveltekit-superforms/client';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { toast } from 'svelte-sonner';
  import LoaderCircle from 'lucide-svelte/icons/loader-circle';

  interface Props {
    updatePasswordForm: SuperValidated<Infer<UpdatePasswordSchema>>;
  }

  const { updatePasswordForm }: Props = $props();

  const form = superForm(updatePasswordForm, {
    validators: zodClient(updatePasswordSchema),
    id: 'updatePasswordEvent',
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

<form
  method="POST"
  action="?/updatePasswordEvent"
  use:enhance
  class="flex max-w-[500px] flex-col gap-2.5"
>
  <Form.Field {form} name="password">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>New Password</Form.Label>
        <Input
          type="password"
          {...props}
          bind:value={$formData.password}
          placeholder="Enter your new password"
        />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="confirmPassword">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Confirm New Password</Form.Label>
        <Input
          type="password"
          {...props}
          bind:value={$formData.confirmPassword}
          placeholder="Confirm your new password"
        />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Button disabled={$submitting} size="sm" class="relative max-w-fit">
    {#if $submitting}
      <div
        class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
      >
        <LoaderCircle class="size-4 animate-spin" />
      </div>
    {/if}
    Update Password
  </Form.Button>
</form>
