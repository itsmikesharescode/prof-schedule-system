<script lang="ts">
  import {
    GraduationCap,
    UserPen,
    Logs,
    Archive,
    ListRestart,
    CalendarCheck,
    ChartColumn,
    CalendarRange,
    ChevronDown,
    CalendarCog,
    UserCog
  } from 'lucide-svelte';

  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import { page } from '$app/stores';

  import Profile from './components/Profile.svelte';
  import * as Collapsible from '$lib/components/ui/collapsible';
  const site_map = [
    {
      title: 'Class Schedules',
      url: '/program-head',
      icon: CalendarCheck
    },
    {
      title: 'Requests',
      url: '/program-head/requests',
      icon: CalendarRange
    },
    {
      title: 'Profile',
      url: '/program-head/profile',
      icon: UserCog
    }
  ];

  const records_map = [
    {
      title: 'School Year',
      url: '/program-head/school-year',
      icon: CalendarCog
    },
    {
      title: 'Year Levels',
      url: '/program-head/year-levels',
      icon: CalendarCog
    },
    {
      title: 'Sections',
      url: '/program-head/sections',
      icon: CalendarCog
    },
    {
      title: 'Subjects',
      url: '/program-head/subjects',
      icon: CalendarCog
    },
    {
      title: 'Rooms',
      url: '/program-head/rooms',
      icon: CalendarCog
    }
  ];
</script>

<Sidebar.Root>
  <Sidebar.Content class="">
    <Sidebar.Group>
      <Sidebar.GroupLabel>Program Head</Sidebar.GroupLabel>
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
    <Collapsible.Root open class="group/collapsible">
      <Sidebar.Group>
        <Sidebar.GroupLabel>
          {#snippet child({ props })}
            <Collapsible.Trigger {...props}>
              Records
              <ChevronDown
                class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
              />
            </Collapsible.Trigger>
          {/snippet}
        </Sidebar.GroupLabel>
        <Collapsible.Content>
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              {#each records_map as record (record.title)}
                <Sidebar.MenuItem
                  class={record.url === $page.url.pathname
                    ? 'bg-gray-100 dark:bg-secondary/90'
                    : ''}
                >
                  <Sidebar.MenuButton>
                    {#snippet child({ props })}
                      <a href={record.url} {...props}>
                        <record.icon />
                        <span>{record.title}</span>
                      </a>
                    {/snippet}
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
              {/each}
            </Sidebar.Menu>
          </Sidebar.GroupContent>
        </Collapsible.Content>
      </Sidebar.Group>
    </Collapsible.Root>
  </Sidebar.Content>

  <Sidebar.Footer>
    <Profile />
  </Sidebar.Footer>
</Sidebar.Root>
