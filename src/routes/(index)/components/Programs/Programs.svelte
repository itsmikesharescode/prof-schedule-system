<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Carousel from '$lib/components/ui/carousel/index.js';

  const departments = [
    {
      img: '',
      value: 'BSIS',
      label: 'Bachelor of Science in Information Systems'
    },
    {
      img: '',
      value: 'BSE',
      label: 'Bachelor of Science in Entrepreneurship'
    },
    {
      img: '',
      value: 'BTVTED',
      label: 'Bachelor of Technical-Vocational Teacher Education'
    },
    {
      img: '',
      value: 'DICT',
      label: 'Diploma in Computer Technology'
    },
    {
      img: '',
      value: 'DOMT',
      label: 'Diploma in Office Management Technology'
    }
  ];
</script>

<Carousel.Root class="w-[800px]">
  <Carousel.Content class="-ml-1">
    {#each departments as department (department)}
      <Carousel.Item class="pl-1 md:basis-1/2 lg:basis-1/3">
        <div class="p-1">
          <Card.Root>
            <Card.Content class="flex h-[470px] items-center justify-center p-6">
              <div class="flex flex-col gap-2.5">
                <span class="text-4xl font-semibold">{department.value}</span>
                <span class="text-sm text-muted-foreground">{department.label}</span>
              </div>
            </Card.Content>
          </Card.Root>
        </div>
      </Carousel.Item>
    {/each}
  </Carousel.Content>
  <Carousel.Previous />
  <Carousel.Next />
</Carousel.Root>
