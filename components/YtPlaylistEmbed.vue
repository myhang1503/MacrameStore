<template>
    <div class="relative w-full yt-frame">
        <!-- Iframe full khung -->
        <iframe class="absolute inset-0 w-full h-full"
            :src="`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`" title="YouTube" frameborder="0"
            allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>

        <!-- Close overlay -->
        <button
            class="absolute top-3 right-3 z-10 bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80 transition focus:outline-none focus:ring-2 focus:ring-white/70"
            @click="$emit('close')" aria-label="Close">
            <!-- Icon X -->
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12" />
            </svg>
        </button>
    </div>
</template>

<script setup>
defineProps({ videoId: { type: String, required: true } })
const emit = defineEmits(['close'])

// Hỗ trợ phím Esc để đóng
onMounted(() => {
    const onKey = (e) => { if (e.key === 'Escape') emit('close') }
    window.addEventListener('keydown', onKey)
    onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
})
</script>

<style scoped>
.yt-frame {
    height: 90vh;
}

@media (max-width: 768px) {
    .yt-frame {
        height: 65vh;
    }
}
</style>
