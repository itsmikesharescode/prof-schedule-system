<script lang="ts">
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  import { Settings } from 'lucide-svelte';
  import Logout from './Logout.svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { buttonVariants } from '$lib/components/ui/button';
  import { page } from '$app/stores';
  import { PUBLIC_SUPABASE_STORAGE_URL } from '$env/static/public';
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger class={buttonVariants({ variant: 'outline', class: 'flex p-[2rem] px-2' })}>
    <div class="flex w-full items-center gap-2.5">
      <Avatar.Root>
        <Avatar.Image
          src={`${PUBLIC_SUPABASE_STORAGE_URL}${$page.data.user?.user_metadata.avatar}`}
          alt={`${$page.data.user?.user_metadata.firstName} photo`}
        />
        <Avatar.Fallback>{$page.data.user?.user_metadata.firstName[0]}</Avatar.Fallback>
      </Avatar.Root>
      <div class="flex flex-col items-start justify-start">
        <span class="text-sm font-semibold"
          >Hello, 👋 {$page.data.user?.user_metadata.firstName}</span
        >
        <span class="text-xs text-gray-500">{$page.data.user?.email}</span>
      </div>
    </div>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content side="top" class="w-[300px]">
    <DropdownMenu.Group>
      <DropdownMenu.GroupHeading>
        <div class="flex items-center gap-2">
          <Avatar.Root>
            <Avatar.Image
              src={`${PUBLIC_SUPABASE_STORAGE_URL}${$page.data.user?.user_metadata.avatar}`}
              alt={`${$page.data.user?.user_metadata.firstName} photo`}
            />
            <Avatar.Fallback>{$page.data.user?.user_metadata.firstName[0]}</Avatar.Fallback>
          </Avatar.Root>
          <div class="flex flex-col">
            <span class="line-clamp-1 text-sm font-semibold">
              {$page.data.user?.user_metadata.lastName}, {$page.data.user?.user_metadata.firstName}
              {$page.data.user?.user_metadata.middleName}.
            </span>
            <span class="line-clamp-1 text-sm text-gray-500">{$page.data.user?.email}</span>
          </div>
        </div>
        <DropdownMenu.Separator />
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">
            {$page.data.user?.user_metadata.role.toUpperCase()}
          </span>
          <Logout />
        </div>
      </DropdownMenu.GroupHeading>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
