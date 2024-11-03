<script lang="ts">
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  import { Settings } from 'lucide-svelte';
  import Logout from './Logout.svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { buttonVariants } from '$lib/components/ui/button';
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger class={buttonVariants({ variant: 'default', size: 'sm' })}>
    <div class="flex w-full items-center gap-2.5">
      <Settings />
      Profile
    </div>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-[300px]">
    <DropdownMenu.Group>
      <DropdownMenu.GroupHeading>
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
        <DropdownMenu.Separator />
        <div class="flex justify-end">
          <Logout />
        </div>
      </DropdownMenu.GroupHeading>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
