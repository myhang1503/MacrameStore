<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  titleTemplate: (title) => `${title ? `${title} | ` : ''}Saturday Macrame`,
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
})

// Add default SEO meta
useSeoMeta({
  description: 'Khám phá thế giới Macrame - Mang hơi thở thủ công vào cuộc sống',
  ogTitle: 'Saturday Macrame',
  ogDescription: 'Khám phá thế giới Macrame - Mang hơi thở thủ công vào cuộc sống',
  ogImage: '/cover.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Saturday Macrame',
  twitterDescription: 'Khám phá thế giới Macrame - Mang hơi thở thủ công vào cuộc sống',
  twitterImage: '/cover.png'
})
</script>
