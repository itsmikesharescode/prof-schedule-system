<script lang="ts">
  import {
    GraduationCap,
    UserPen,
    Logs,
    Archive,
    ListRestart,
    CalendarCheck,
    ChartColumn,
    LogOut
  } from 'lucide-svelte';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import { page } from '$app/stores';
  import * as Popover from '$lib/components/ui/popover/index.js';
  import Profile from './components/Profile.svelte';

  const site_map = [
    {
      title: 'Programs',
      url: '/admin',
      icon: GraduationCap
    },
    {
      title: 'Accounts',
      url: '/admin/accounts',
      icon: UserPen
    },
    {
      title: 'Logs',
      url: '/admin/logs',
      icon: Logs
    },
    {
      title: 'Records',
      url: '/admin/records',
      icon: Archive
    },
    {
      title: 'Faculty Loading',
      url: '/admin/faculty-loading',
      icon: ListRestart
    },
    {
      title: 'Class Schedules',
      url: '/admin/class-schedules',
      icon: CalendarCheck
    },
    {
      title: 'Reports',
      url: '/admin/reports',
      icon: ChartColumn
    }
  ];
</script>

<Sidebar.Root>
  <Sidebar.Content class="">
    <Sidebar.Trigger title="Close sidebar" class="absolute right-2 z-50" />
    <Sidebar.Group>
      <Sidebar.GroupLabel>Administrator</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each site_map as site (site.title)}
            <Sidebar.MenuItem class={site.url === $page.url.pathname ? 'bg-gray-100' : ''}>
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

  <Sidebar.Footer>
    <Profile />
  </Sidebar.Footer>
</Sidebar.Root>
