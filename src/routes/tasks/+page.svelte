<script lang="ts">
  import DataTable from './(components)/data-table.svelte';
  import { data } from './(data)/tasks.js';
  import { columns } from './(components)/columns.js';
</script>

<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
  <DataTable {data} {columns} />
</div>
