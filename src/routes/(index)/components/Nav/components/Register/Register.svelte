<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import { X, LoaderCircle } from 'lucide-svelte';
  import { fileProxy, type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { registerSchema, type RegisterSchema } from './schema';
  import ImagePicker from '$lib/components/general/ImagePicker.svelte';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index';
  import Combobox from '$lib/components/general/Combobox.svelte';
  import { availableTimes, days, departments, interests, titles } from '$lib/metadata';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';
  import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  interface Props {
    registerForm: SuperValidated<Infer<RegisterSchema>>;
  }

  let { registerForm }: Props = $props();

  let open = $state(false);

  const form = superForm(registerForm, {
    validators: zodClient(registerSchema)
  });

  const { form: formData, enhance, submitting } = form;

  const file = fileProxy(form, 'photo');

  const addInterest = (id: string) => {
    $formData.interests = [...$formData.interests, id];
  };

  const removeInterest = (id: string) => {
    $formData.interests = $formData.interests.filter((i) => i !== id);
  };

  const detectURL = $derived($page.url.searchParams.get('moveto') === 'register');

  $effect(() => {
    if (detectURL) {
      open = true;
    }
  });
</script>

<Button size="sm" onclick={() => (open = true)}>Sign Up Free</Button>

<AlertDialog.Root bind:open>
  <AlertDialog.Content class="max-w-7xl p-0">
    <button
      onclick={async () => {
        await goto('/', { noScroll: true });
        open = false;
        form.reset();
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <X class="size-4" />
      <span class="sr-only">Close</span>
    </button>

    <AlertDialog.Header class="px-6 pt-6">
      <AlertDialog.Title>Registration</AlertDialog.Title>
      <AlertDialog.Description>
        Fill the fields below to create your account.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <ScrollArea class="h-[80dvh]">
      <form
        method="POST"
        action="?/registerEvent"
        enctype="multipart/form-data"
        use:enhance
        class=" "
      >
        <div class="grid grid-cols-3 gap-6 px-6 pb-6">
          <!--Personal Details-->
          <div class="">
            <div class="mb-6">
              <span class="font-semibold text-muted-foreground underline">Personal Details</span>
            </div>
            <Form.Field {form} name="photo">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Photo</Form.Label>
                  <ImagePicker bind:imageLink={$formData.photo} />
                  <input class="hidden" type="file" {...props} bind:files={$file} />
                {/snippet}
              </Form.Control>
              <Form.Description />
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
              <Form.Description />
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
              <Form.Description />
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
              <Form.Description />
              <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="lastName">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>Last Name</Form.Label>
                  <Input
                    {...props}
                    bind:value={$formData.lastName}
                    placeholder="Enter your last name"
                  />
                {/snippet}
              </Form.Control>
              <Form.Description />
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
              <Form.Description />
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
              <Form.Description />
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
              <Form.Description />
              <Form.FieldErrors />
            </Form.Field>
          </div>

          <!--Academic Details-->
          <div class="">
            <div class="mb-6">
              <span class="font-semibold text-muted-foreground underline">Academic Details</span>
            </div>
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
          </div>

          <!--Interest-->
          <div class="">
            <div class="mb-6">
              <span class="font-semibold text-muted-foreground underline">Interest</span>
            </div>

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
        </div>

        <div class="pointer-events-none sticky bottom-6 left-0 right-0 flex justify-end px-6">
          <Form.Button
            onclick={() => {
              console.log($formData);
            }}
            size="sm"
            class="pointer-events-auto relative"
          >
            {#if $submitting}
              <div
                class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
              >
                <LoaderCircle class="size-4 animate-spin" />
              </div>
            {/if}
            Create Account
          </Form.Button>
        </div>
      </form>
    </ScrollArea>
  </AlertDialog.Content>
</AlertDialog.Root>
