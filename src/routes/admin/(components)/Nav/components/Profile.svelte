<script lang="ts">
  import * as Popover from '$lib/components/ui/popover/index.js';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  import { Settings } from 'lucide-svelte';
  import Logout from './Logout.svelte';
</script>

<Popover.Root>
  <Popover.Trigger>
    <Sidebar.MenuButton variant="outline" class="text-sm font-semibold">
      <Settings />
      Profile
    </Sidebar.MenuButton>
  </Popover.Trigger>
  <Popover.Content class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <Avatar.Root>
        <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar.Root>
      <div class="flex flex-col">
        <span class="line-clamp-1 text-sm font-semibold">Mike John Eviota</span>
        <span class="line-clamp-1 text-sm text-gray-500">mike@eviota.com</span>
      </div>
    </div>

    <div class="flex justify-end">
      <Logout />
    </div>
  </Popover.Content>
</Popover.Root>
