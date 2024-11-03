<script lang="ts">
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  import { Settings } from 'lucide-svelte';
  import Logout from './Logout.svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { buttonVariants } from '$lib/components/ui/button';
  import { useUserState } from '$lib/runes/userState.svelte';

  const userState = useUserState();
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
            <Avatar.Image
              src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/e7b349b6-8fcb-4a5a-9da0-9ecc99ce3d86/71f498fd-0f80-49a0-ad28-37723482b2e9.png"
              alt="@shadcn"
            />
            <Avatar.Fallback>CN</Avatar.Fallback>
          </Avatar.Root>
          <div class="flex flex-col">
            <span class="line-clamp-1 text-sm font-semibold">
              {userState.get()?.user_metadata.firstName}
            </span>
            <span class="line-clamp-1 text-sm text-gray-500">{userState.get()?.email}</span>
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
