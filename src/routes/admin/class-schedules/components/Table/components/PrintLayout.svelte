<script lang="ts">
  import type { ClassSchedulesPageTable } from '../data/schemas';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  interface Props {
    data: ClassSchedulesPageTable[];
    open: boolean;
  }

  let { open = $bindable(), data }: Props = $props();
</script>

<AlertDialog.Root bind:open>
  <AlertDialog.Content class="flex h-full max-w-full flex-col gap-5 overflow-auto">
    <section class="grid grid-cols-[1fr,2fr] border-2">
      <div class="grid min-h-20 grid-cols-2">
        <div class="grid grid-cols-2 items-center gap-2.5 border-r-2">
          <img src="/favicon.png" class="w-full" alt="logo" />
          <span class="text-xl font-bold">ONE Cainta College</span>
        </div>
        <div class="flex flex-col items-center justify-center">
          <span class="text-xl font-bold">SUBJECT OFFERINGS</span>
          <span class="font-semibold underline">Morning Session</span>
        </div>
      </div>

      <div class="flex flex-col border-l-2">
        <div class="relative flex flex-col items-center justify-center border-b-2 p-2">
          <span class="absolute bottom-0 left-2 top-0 flex items-center font-light">Section</span>
          <span class="text-sm">BACHELOR OF SCIENCE IN COMPUTER SCIENCE</span>
          <span class="text-2xl font-semibold">(21BSIS 1M)</span>
        </div>
        <div class="grid h-full grid-cols-2">
          <div class="flex items-center justify-between border-r-2 p-2">
            <span class="font-light">School Year</span>
            <span class="font-semibold">2023 - 2024</span>
          </div>
          <div class="flex items-center justify-between p-2">
            <span class="font-light">Semister</span>
            <span class="font-semibold">Second Semester</span>
          </div>
        </div>
      </div>
    </section>

    <section class="flex flex-col border-2">
      <div class="grid grid-cols-[1fr,2fr,1fr,1fr,1fr] border-b-2">
        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="">Course Code</span>
        </div>

        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="">Course Title</span>
        </div>

        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="">Day</span>
        </div>

        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="">Units</span>
        </div>

        <div class="flex items-center justify-center border-r-2 p-2">
          <span class="">Room</span>
        </div>
      </div>

      {#each Array(10)}
        <div class="grid grid-cols-[1fr,2fr,1fr,1fr,1fr] border-b-2">
          <div class="flex items-center justify-center border-r-2 p-2">
            <span class="">OCC103</span>
          </div>

          <div class="flex items-center justify-center border-r-2 p-2">
            <span class="">Database Administration</span>
          </div>

          <div class="flex items-center justify-center border-r-2 p-2">
            <span class="">Monday</span>
          </div>

          <div class="flex items-center justify-center border-r-2 p-2">
            <span class="">5</span>
          </div>

          <div class="flex items-center justify-center border-r-2 p-2">
            <span class="">11</span>
          </div>
        </div>
      {/each}
    </section>
  </AlertDialog.Content>
</AlertDialog.Root>
