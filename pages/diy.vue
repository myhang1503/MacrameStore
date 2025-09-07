<template>
    <div class="min-h-screen w-full bg-white max-w-6xl mx-auto px-4">
        <div v-if="!selectedId" class="w-full sm:w-full sm:h-[60vh] md:h-[50vh] overflow-auto">
            <YtPlaylistList @select="id => selectedId = id" />
        </div>

        <div v-else class="w-full">
            <YtPlaylistEmbed :video-id="selectedId" @close="selectedId = null" />
        </div>
    </div>
</template>

<script setup>
const route = useRoute()
const selectedId = ref(null)

// reset khi có ?reset=1 hoặc ?t=...
watch(() => [route.query.reset, route.query.t], () => { selectedId.value = null }, { immediate: true })

useSeoMeta({
  title: 'DIY Macrame | Hướng dẫn tự làm sản phẩm handmade',
  description: 'Video DIY Macrame – hướng dẫn chi tiết cách tự làm sản phẩm handmade độc đáo, dễ thực hiện và sáng tạo.',
  ogTitle: 'DIY Macrame | Hướng dẫn tự làm sản phẩm handmade',
  ogDescription: 'Học cách tự làm sản phẩm Macrame qua video hướng dẫn chi tiết từ cơ bản đến nâng cao.',
  ogImage: '/diy-cover.jpg'
})
</script>
