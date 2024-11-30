<script lang="ts">
  import { LoaderCircle } from 'lucide-svelte';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { updateInformationSchema, type UpdateInformationSchema } from './schema';
  import Combobox from '$lib/components/general/Combobox.svelte';
  import { availableTimes, days, interests, titles } from '$lib/metadata';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';
  import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
  import { auxiliaryState } from '$lib/runes/auxiliaryState.svelte';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { page } from '$app/stores';

  interface Props {
    updateInformationForm: SuperValidated<Infer<UpdateInformationSchema>>;
  }

  const { updateInformationForm }: Props = $props();

  const form = superForm(updateInformationForm, {
    validators: zodClient(updateInformationSchema),
    id: 'updateInformationForm',
    onUpdate: ({ result }) => {
      const { status, data } = result as Result<{ msg: string }>;
      switch (status) {
        case 200:
          form.reset();
          toast.success(data.msg);
          break;
        case 401:
          toast.error(data.msg);
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  const addInterest = (id: string) => {
    $formData.interests = [...$formData.interests, id];
  };

  const removeInterest = (id: string) => {
    $formData.interests = $formData.interests.filter((i) => i !== id);
  };

  $effect(() => {
    $formData.title = $page.data.user?.user_metadata.title;
    $formData.firstName = $page.data.user?.user_metadata.firstName;
    $formData.middleName = $page.data.user?.user_metadata.middleName;
    $formData.lastName = $page.data.user?.user_metadata.lastName;
    $formData.previousSchool = $page.data.user?.user_metadata.previousSchool;
    $formData.yearsOfTeaching = $page.data.user?.user_metadata.yearsOfTeaching;
    $formData.department = $page.data.user?.user_metadata.department;
    $formData.day = $page.data.user?.user_metadata.schedule.day;
    $formData.startTime = $page.data.user?.user_metadata.schedule.startTime;
    $formData.endTime = $page.data.user?.user_metadata.schedule.endTime;
    $formData.availability = $page.data.user?.user_metadata.schedule.available;
    $formData.interests = $page.data.user?.user_metadata.interests;

    return () => {
      $formData.title = '';
      $formData.firstName = '';
      $formData.middleName = '';
      $formData.lastName = '';
      $formData.previousSchool = '';
      $formData.yearsOfTeaching = 0;
      $formData.department = '';
      $formData.day = '';
      $formData.startTime = '';
      $formData.endTime = '';
      $formData.availability = '';
      $formData.interests = [];
    };
  });
</script>

<form method="POST" action="?/updateInformationEvent" use:enhance class=" ">
  <div class="grid max-w-[500px] gap-5">
    <!--Personal Details-->
    <div class="">
      <div class="mb-6">
        <span class="font-semibold text-muted-foreground underline">Personal Details</span>
      </div>

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
            <Input {...props} bind:value={$formData.firstName} placeholder="Enter first name" />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="middleName">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Middle Name</Form.Label>
            <Input {...props} bind:value={$formData.middleName} placeholder="Enter middle name" />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="lastName">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Last Name</Form.Label>
            <Input {...props} bind:value={$formData.lastName} placeholder="Enter last name" />
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
              selections={auxiliaryState.formatDepartments()}
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

  <Form.Button disabled={$submitting} size="sm" class="pointer-events-auto relative">
    {#if $submitting}
      <div
        class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
      >
        <LoaderCircle class="size-4 animate-spin" />
      </div>
    {/if}
    Update Information
  </Form.Button>
</form>
