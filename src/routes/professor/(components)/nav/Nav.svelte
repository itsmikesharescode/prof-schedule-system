<script lang="ts">
  import Profile from '../profile/Profile.svelte';
  import { page } from '$app/stores';

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
  <section class="container flex items-center justify-between p-2">
    <div class="flex items-center gap-5">
      {#each navItems as item}
        <a
          href={item.href}
          class="transition-all
          {$page.url.pathname === item.href
            ? 'border-b-[1px] text-muted-foreground'
            : 'text-primary'}"
          >{item.name}
        </a>
      {/each}
    </div>

    <Profile />
  </section>
</nav>
