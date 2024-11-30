<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import type { Row } from '@tanstack/table-core';
  import { type RequestsPageTable } from '../data/schemas';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
  import { Badge } from '$lib/components/ui/badge/index';
  let { row }: { row: Row<RequestsPageTable> } = $props();
</script>

asdasd
