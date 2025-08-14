<template>
    <div class="min-h-screen w-full bg-[#fff7ef] text-slate-800">
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
</script>
