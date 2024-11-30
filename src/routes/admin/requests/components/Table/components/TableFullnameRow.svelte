<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  import type { Row } from '@tanstack/table-core';
  import { type RequestsPageTable } from '../data/schemas';
  import { PUBLIC_SUPABASE_STORAGE_URL } from '$env/static/public';

  let { row }: { row: Row<RequestsPageTable> } = $props();
</script>

<div class="flex items-center gap-2.5">
  <Avatar.Root>
    <Avatar.Image
      src={`${PUBLIC_SUPABASE_STORAGE_URL}${row.original.professors_tb?.user_meta_data?.avatar}`}
      alt="profile"
    />
    <Avatar.Fallback>
      {row.original.professors_tb?.user_meta_data?.lastName[0].toUpperCase()}
    </Avatar.Fallback>
  </Avatar.Root>
  <div class="">
    {`${row.original.professors_tb?.user_meta_data?.lastName}, ${row.original.professors_tb?.user_meta_data?.firstName} ${row.original.professors_tb?.user_meta_data?.middleName}`}
  </div>
</div>
