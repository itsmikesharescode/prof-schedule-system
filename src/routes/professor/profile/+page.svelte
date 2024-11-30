<script lang="ts">
  import UpdateProfile from './components/UpdateProfile/UpdateProfile.svelte';
  import UpdateInformation from './components/UpdateInformation/UpdateInformation.svelte';
  import UpdatePassword from './components/UpdatePassword/UpdatePassword.svelte';

  const { data } = $props();
</script>

<main class="max-w-7xl py-[3rem]">
  <span class="text-3xl font-bold">Profile</span>

  <section class="mt-6 flex flex-col gap-5">
    <UpdateProfile updateProfileForm={data.updateProfileForm} />
    <UpdateInformation updateInformationForm={data.updateInformationForm} />
    <UpdatePassword updatePasswordForm={data.updatePasswordForm} />
  </section>
</main>
