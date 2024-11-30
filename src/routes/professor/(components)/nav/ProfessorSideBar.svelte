<script lang="ts">
  import CalendarCheck2 from 'lucide-svelte/icons/calendar-check-2';
  import CalendarSearch from 'lucide-svelte/icons/calendar-search';
  import UserRoundCog from 'lucide-svelte/icons/user-round-cog';

  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import { page } from '$app/stores';
  import * as Popover from '$lib/components/ui/popover/index.js';

  const site_map = [
    {
      title: 'Schedule',
      url: '/professor',
      icon: CalendarCheck2
    },
    {
      title: 'Requests',
      url: '/professor/request',
      icon: CalendarSearch
    },
    {
      title: 'Profile',
      url: '/professor/profile',
      icon: UserRoundCog
    }
  ];
</script>

<Sidebar.Root>
  <Sidebar.Content class="">
    <Sidebar.Group>
      <Sidebar.GroupLabel>Professor</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each site_map as site (site.title)}
            <Sidebar.MenuItem
              class={site.url === $page.url.pathname ? 'bg-gray-100 dark:bg-secondary/90' : ''}
            >
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a href={site.url} {...props}>
                    <site.icon />
                    <span>{site.title}</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>

  <Sidebar.Footer>logout here</Sidebar.Footer>
</Sidebar.Root>
