<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index';
  import Button from '$lib/components/ui/button/button.svelte';
  import X from 'lucide-svelte/icons/x';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { signupSchema, type SignupSchema } from './schema';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { Loader } from 'lucide-svelte';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import ImagePicker from '$lib/components/general/ImagePicker.svelte';

  interface Props {
    registerForm: SuperValidated<Infer<SignupSchema>>;
  }

  let { registerForm }: Props = $props();

  let open = $state(true);
  let activeTab = $state('Account Details');
  let finishedTab = $state<string[]>(['Account Details']);

  const form = superForm(registerForm, {
    validators: zodClient(signupSchema)
  });

  const { form: formData, enhance, submitting } = form;
</script>

<Button variant="secondary" size="sm" onclick={() => (open = true)}>Sign Up</Button>
<AlertDialog.Root bind:open>
  <AlertDialog.Content class="max-h-screen p-0">
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
        <AlertDialog.Title class="text-white">ProfSched - Sign Up</AlertDialog.Title>
      </div>
    </AlertDialog.Header>

    <Tabs.Root bind:value={activeTab} class="w-full">
      <ScrollArea class="h-[60dvh]">
        <form
          method="POST"
          action="/registerEvent"
          enctype="multipart/form-data"
          use:enhance
          class="overflow-auto p-4"
        >
          <Tabs.Content value="Account Details">
            <Form.Field {form} name="photo">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Photo</Form.Label>
                  <ImagePicker bind:image={$formData.photo} />
                  <input type="hidden" {...props} bind:value={$formData.photo} />
                {/snippet}
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="title">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Title</Form.Label>
                  <SelectPicker
                    name="Select title"
                    {props}
                    class=""
                    selections={[
                      { label: 'Professor', value: 'Professor' },
                      { label: 'Program Head', value: 'Program Head' }
                    ]}
                    selected={$formData.title}
                  />
                  <input type="hidden" {...props} bind:value={$formData.title} />
                {/snippet}
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="firstName">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>First Name</Form.Label>
                  <Input
                    {...props}
                    bind:value={$formData.firstName}
                    placeholder="Enter your first name"
                  />
                {/snippet}
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="middleName">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Middle Name</Form.Label>
                  <Input
                    {...props}
                    bind:value={$formData.middleName}
                    placeholder="Enter your middle name"
                  />
                {/snippet}
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="lastName">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Last Name</Form.Label>
                  <Input
                    {...props}
                    bind:value={$formData.lastName}
                    placeholder="Enter your first name"
                  />
                {/snippet}
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>

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

            <Form.Field {form} name="confirmPassword">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Confirm Password</Form.Label>
                  <Input
                    type="password"
                    {...props}
                    bind:value={$formData.confirmPassword}
                    placeholder="Confirm your password"
                  />
                {/snippet}
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
          </Tabs.Content>

          <Tabs.Content value="Academic Details">Change your password here.</Tabs.Content>
          <Tabs.Content value="Interest">Change your password here.</Tabs.Content>

          <AlertDialog.Footer>
            <Form.Button disabled={$submitting} class="relative">
              {#if $submitting}
                <div
                  class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
                >
                  <Loader class="size-4 animate-spin text-white" />
                </div>
              {/if}
              Create Account
            </Form.Button>
          </AlertDialog.Footer>
        </form>
      </ScrollArea>

      <div class="flex items-center justify-center bg-primary">
        <span class=" text-sm font-bold text-white">Steps</span>
      </div>
      <Tabs.List class="w-full">
        {#each ['Account Details', 'Academic Details', 'Interest'] as tab}
          <Tabs.Trigger disabled={!finishedTab.includes(tab)} value={tab} class="w-full">
            {tab}
          </Tabs.Trigger>
        {/each}
      </Tabs.List>
    </Tabs.Root>
  </AlertDialog.Content>
</AlertDialog.Root>
