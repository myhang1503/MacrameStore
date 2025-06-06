<template>
  <UContainer>
    <UCarousel
      :items="slides"
      :ui="{ item: 'h-64 bg-gray-100 flex items-center justify-center' }"
      arrows
      indicators
    >
      <template #item="{ item }">
        <img :src="item.src" :alt="item.title" class="w-full h-full object-cover" />
      </template>
    </UCarousel>
  </UContainer>
</template>

<script setup>
const slides = [
  { title: 'Slide 1', src: '/images/carousel/slide1.jpg' },
  { title: 'Slide 2', src: '/images/carousel/slide2.jpg' },
  { title: 'Slide 3', src: '/images/carousel/slide3.jpg' },
]
</script>