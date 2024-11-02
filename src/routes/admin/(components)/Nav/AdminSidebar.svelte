<script lang="ts">
  import {
    GraduationCap,
    UserPen,
    Logs,
    Archive,
    ListRestart,
    CalendarCheck,
    ChartColumn
  } from 'lucide-svelte';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';

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
      title: 'Faculty Loadings',
      url: '/admin/faculty-loadings',
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
    <Sidebar.Group>
      <Sidebar.GroupLabel>Administrator</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each site_map as site (site.title)}
            <Sidebar.MenuItem>
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
</Sidebar.Root>
