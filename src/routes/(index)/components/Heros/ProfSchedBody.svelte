<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { MoveRight } from 'lucide-svelte';
  import * as Carousel from '$lib/components/ui/carousel/index';
  import * as Card from '$lib/components/ui/card/index.js';
  import { departments } from '$lib/metadata';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import Autoplay from 'embla-carousel-autoplay';
  import { goto } from '$app/navigation';

  const plugin = Autoplay({ delay: 2000, stopOnInteraction: true });
</script>

<div class="grid min-h-screen grid-cols-[1fr_2fr] gap-5">
  <div class="flex flex-col justify-center gap-10">
    <div class="flex max-w-xs flex-col gap-2.5">
      <span class="text-7xl font-semibold">Faculty Member</span>
      <span class="text-muted-foreground">at ONE CAINTA COLLEGE?</span>
      <Button
        class="max-w-fit"
        onclick={() => {
          goto('/?moveto=register', { noScroll: true });
        }}
        >Get Started
        <MoveRight class="size-4" />
      </Button>
    </div>
  </div>
  <div class="flex flex-col items-center justify-center gap-5 overflow-hidden">
    <div class="">
      <span class="text-4xl font-semibold">Programs</span>
    </div>
    <Carousel.Root
      opts={{
        align: 'start'
      }}
      class="w-full"
      plugins={[plugin]}
      onmouseenter={plugin.stop}
      onmouseleave={() => {
        plugin.reset();
        plugin.play();
      }}
    >
      <Carousel.Content>
        {#each departments as department, i (i)}
          <Carousel.Item class="md:basis-1/2 lg:basis-1/3">
            <div class="p-1">
              <Card.Root class="rounded-[5rem] transition-all duration-300 hover:scale-105">
                <Card.Content
                  class="flex h-[60dvh] items-center  justify-center rounded-[5rem] bg-secondary/30 p-6"
                >
                  <div class="flex flex-col">
                    <span class="text-3xl font-semibold">{department.value}</span>
                    <span class="text-sm text-muted-foreground">{department.label}</span>
                  </div>
                </Card.Content>
              </Card.Root>
            </div>
          </Carousel.Item>
        {/each}
      </Carousel.Content>
    </Carousel.Root>
  </div>
</div>
