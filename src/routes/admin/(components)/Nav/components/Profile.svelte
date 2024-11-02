<script lang="ts">
  import * as Popover from '$lib/components/ui/popover/index.js';
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  import { Settings } from 'lucide-svelte';
  import Logout from './Logout.svelte';
  import Button from '$lib/components/ui/button/button.svelte';

  //todo update this to dropdown menu
</script>

<Popover.Root>
  <Popover.Trigger class="w-full">
    <Button size="sm" class="flex w-full items-center justify-start gap-2">
      <Settings />
      Profile
    </Button>
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
