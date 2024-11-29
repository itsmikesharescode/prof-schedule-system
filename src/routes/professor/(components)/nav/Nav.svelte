<script lang="ts">
  import Profile from '../profile/Profile.svelte';

  const navItems = [
    {
      name: 'Schedule',
      href: '/professor'
    },
    {
      name: 'Request',
      href: '/professor/request'
    },
    {
      name: 'Profile',
      href: '/professor/profile'
    }
  ];
</script>

<nav class="border-b-2">
  <section class="container mx-auto flex items-center justify-between p-2">
    <div class="flex items-center gap-2.5">
      {#each navItems as item}
        <a href={item.href}>{item.name}</a>
      {/each}
    </div>

    <Profile />
  </section>
</nav>
