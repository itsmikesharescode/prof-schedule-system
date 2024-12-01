<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import { updateProfileSchema, type UpdateProfileSchema } from './schema';
  import { fileProxy, superForm } from 'sveltekit-superforms/client';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { toast } from 'svelte-sonner';
  import { LoaderCircle } from 'lucide-svelte';
  import ImagePicker from '$lib/components/general/ImagePicker.svelte';
  import { page } from '$app/stores';
  import { PUBLIC_SUPABASE_STORAGE_URL } from '$env/static/public';

  interface Props {
    updateProfileForm: SuperValidated<Infer<UpdateProfileSchema>>;
  }

  const { updateProfileForm }: Props = $props();

  const form = superForm(updateProfileForm, {
    validators: zodClient(updateProfileSchema),
    id: 'updateProfileEvent',
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

  const file = fileProxy(form, 'photo');
</script>

<form
  method="POST"
  enctype="multipart/form-data"
  action="?/updateProfileEvent"
  use:enhance
  class=""
>
  <input name="photoPath" type="hidden" value={$page.data.user?.user_metadata.avatar} />
  <Form.Field {form} name="photo">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Photo</Form.Label>
        <ImagePicker
          hasLink={`${PUBLIC_SUPABASE_STORAGE_URL}${$page.data.user?.user_metadata.avatar}?${crypto.randomUUID()}`}
          bind:imageLink={$formData.photo}
        />
        <input class="hidden" type="file" {...props} bind:files={$file} />
      {/snippet}
    </Form.Control>
    <Form.Description />
    <Form.FieldErrors />
  </Form.Field>

  <Form.Button disabled={$submitting} size="sm" class="relative">
    {#if $submitting}
      <div
        class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
      >
        <LoaderCircle class="size-4 animate-spin" />
      </div>
    {/if}
    Update Profile
  </Form.Button>
</form>
