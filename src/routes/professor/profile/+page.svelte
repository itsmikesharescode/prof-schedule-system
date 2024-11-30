<script lang="ts">
  import UpdateProfile from './components/UpdateProfile/UpdateProfile.svelte';

  const { data } = $props();
</script>

<main class="py-[3rem]">
  <span class="text-3xl font-bold">Profile</span>

  <section class="mt-6">
    <UpdateProfile updateProfileForm={data.updateProfileForm} />
  </section>
</main>
