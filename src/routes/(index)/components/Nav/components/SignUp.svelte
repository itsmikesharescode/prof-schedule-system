<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index';
  import Button from '$lib/components/ui/button/button.svelte';
  import X from 'lucide-svelte/icons/x';
  import { fileProxy, superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { signupSchema, type SignupSchema } from './schema';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { Loader } from 'lucide-svelte';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import ImagePicker from '$lib/components/general/ImagePicker.svelte';
  import { availableTimes, days, departments, interests, titles } from '$lib/metadata';
  import Combobox from '$lib/components/general/Combobox.svelte';
  import { Checkbox } from '$lib/components/ui/checkbox/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  interface Props {
    registerForm: SuperValidated<Infer<SignupSchema>>;
  }

  let { registerForm }: Props = $props();

  let open = $state(false);
  let activeTab = $state('Account Details');
  let finishedTab = $state<string[]>(['Account Details']);

  const form = superForm(registerForm, {
    validators: zodClient(signupSchema)
  });

  const { form: formData, enhance, submitting } = form;

  const addInterest = (id: string) => {
    $formData.interests = [...$formData.interests, id];
  };

  const removeInterest = (id: string) => {
    $formData.interests = $formData.interests.filter((i) => i !== id);
  };
  const detectURL = $derived($page.url.searchParams.get('register') === 'true');
  $effect(() => {
    if (detectURL) {
      open = true;
    }

    if (
      $formData.photo.length &&
      $formData.title.length &&
      $formData.firstName.length &&
      $formData.lastName.length &&
      $formData.email.length &&
      $formData.password.length &&
      $formData.previousSchool.length &&
      $formData.yearsOfTeaching &&
      $formData.department.length &&
      $formData.day.length &&
      $formData.startTime.length &&
      $formData.endTime.length &&
      $formData.availability.length
    ) {
      finishedTab = ['Account Details', 'Academic Details', 'Interest'];
    } else if (
      $formData.photo.length &&
      $formData.title.length &&
      $formData.firstName.length &&
      $formData.lastName.length &&
      $formData.email.length &&
      $formData.password.length
    ) {
      finishedTab = ['Account Details', 'Academic Details'];
    }
  });
</script>

<Button variant="secondary" size="sm" onclick={() => (open = true)}>Sign Up</Button>
<AlertDialog.Root bind:open>
  <AlertDialog.Content class="max-h-screen p-0">
    <button
      onclick={async () => {
        await goto('/', { noScroll: true });
        open = false;
        form.reset();
        finishedTab = ['Account Details'];
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
          action="?/registerEvent"
          enctype="multipart/form-data"
          use:enhance
          class="overflow-auto p-4"
        >
          <Tabs.Content value="Account Details">
            <Form.Field {form} name="photo">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Photo</Form.Label>
                  <ImagePicker bind:imageLink={$formData.photo} />
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
                    selections={titles}
                    bind:selected={$formData.title}
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

          <Tabs.Content value="Academic Details">
            <Form.Field {form} name="previousSchool">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Previous School</Form.Label>
                  <Input
                    {...props}
                    bind:value={$formData.previousSchool}
                    placeholder="Enter your previous school"
                  />
                {/snippet}
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="yearsOfTeaching">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Years of Teaching</Form.Label>
                  <Input
                    type="number"
                    {...props}
                    bind:value={$formData.yearsOfTeaching}
                    placeholder="Enter your years of teaching"
                  />
                {/snippet}
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="department">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Department</Form.Label>
                  <SelectPicker
                    name="Select department"
                    {props}
                    class=""
                    selections={departments}
                    bind:selected={$formData.department}
                  />
                  <input type="hidden" {...props} bind:value={$formData.department} />
                {/snippet}
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="day">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Day</Form.Label>
                  <SelectPicker
                    name="Select day"
                    {props}
                    class=""
                    selections={days}
                    bind:selected={$formData.day}
                  />
                  <input type="hidden" {...props} bind:value={$formData.day} />
                {/snippet}
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="startTime">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Start Time</Form.Label>
                  <Combobox
                    name="Select start time"
                    placeholder="Select start time"
                    selections={availableTimes}
                    bind:selected={$formData.startTime}
                  />
                  <input type="hidden" {...props} bind:value={$formData.startTime} />
                {/snippet}
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="endTime">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>End Time</Form.Label>
                  <Combobox
                    name="Select end time"
                    placeholder="Select end time"
                    selections={availableTimes}
                    bind:selected={$formData.endTime}
                  />
                  <input type="hidden" {...props} bind:value={$formData.endTime} />
                {/snippet}
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="availability">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Availability</Form.Label>
                  <SelectPicker
                    name="Select availability"
                    {props}
                    class=""
                    selections={[
                      { value: 'Part Time', label: 'Part Time' },
                      { value: 'Full Time', label: 'Full Time' }
                    ]}
                    bind:selected={$formData.availability}
                  />
                  <input type="hidden" {...props} bind:value={$formData.availability} />
                {/snippet}
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
          </Tabs.Content>

          <Tabs.Content value="Interest" class="">
            <div class="flex flex-col gap-4">
              <Label class="text-lg font-bold">Interests</Label>
              <Form.Fieldset {form} name="interests">
                <div class="space-y-2">
                  {#each interests as interest}
                    {@const checked = $formData.interests.includes(interest.value)}
                    <div class="flex flex-row items-start space-x-3">
                      <Form.Control>
                        {#snippet children({ props })}
                          <Checkbox
                            {...props}
                            {checked}
                            value={interest.value}
                            onCheckedChange={(v) => {
                              if (v) {
                                addInterest(interest.value);
                              } else {
                                removeInterest(interest.value);
                              }
                            }}
                          />
                          <Form.Label class="font-normal">
                            {interest.label}
                          </Form.Label>
                        {/snippet}
                      </Form.Control>
                    </div>
                  {/each}
                  <Form.FieldErrors />
                </div>
              </Form.Fieldset>
            </div>
          </Tabs.Content>
          <Tabs.Content value="Interest" class="flex flex-col gap-4"></Tabs.Content>

          <AlertDialog.Footer>
            <div class="">
              {#if $formData.interests.length}
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
              {/if}
            </div>
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
