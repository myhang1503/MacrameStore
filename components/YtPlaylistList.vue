<template>
    <section class="w-full px-4 sm:px-6 lg:px-8 pt-4 pb-6">
        <!-- Header + Search -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h2 class="text-2xl font-bold">Video trên kênh</h2>
            <div class="relative w-full sm:w-80">
                <input v-model="q" type="text" placeholder="Tìm video…"
                    class="w-full border px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <span class="absolute right-3 top-1/2 -translate-y-1/2 opacity-60">🔎</span>
            </div>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            <!-- Loading skeleton -->
            <template v-if="pending && !videos.length">
                <div v-for="i in 8" :key="i" class="animate-pulse overflow-hidden border rounded">
                    <div class="aspect-video bg-gray-200"></div>
                    <div class="p-3 space-y-2">
                        <div class="h-4 bg-gray-200 w-3/4"></div>
                        <div class="h-3 bg-gray-200 w-1/3"></div>
                    </div>
                </div>
            </template>

            <!-- Cards -->
            <article v-for="v in filtered" :key="v.id"
                class="group relative overflow-hidden border rounded bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                @click="$emit('select', v.id)">
                <!-- thumb -->
                <img :src="v.thumbnail" class="w-full aspect-video object-cover" :alt="v.title" />

                <!-- gradient + title + meta -->
                <div class="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                    <h3 class="text-white font-semibold leading-snug line-clamp-2">
                        {{ v.title }}
                    </h3>
                    <p class="text-white/80 text-xs mt-1" v-if="showStats">
                        {{ (v.stats?.views || 0).toLocaleString() }} views • {{ pretty(v.stats?.duration) }}
                    </p>
                </div>

                <!-- play button on hover -->
                <div class="absolute inset-0 grid place-items-center pointer-events-none">
                    <div
                        class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur rounded-full w-14 h-14 grid place-items-center shadow">
                        <img src="/icons-youtube-48.png" alt="Play" class="w-6 h-6 object-contain">
                    </div>
                </div>
            </article>
        </div>

        <!-- Load more -->
        <div class="flex justify-center mt-6">
            <button v-if="nextPageToken && !pending" @click="fetchPage"
                class="px-4 py-2 rounded-xl border hover:bg-gray-50">
                Tải thêm
            </button>
            <div v-else-if="pending && videos.length" class="text-sm text-gray-500">Đang tải…</div>
        </div>

        <!-- Empty -->
        <p v-if="!pending && !filtered.length" class="text-center text-gray-500 mt-10">
            Không tìm thấy video nào.
        </p>
    </section>
</template>

<script setup>
defineEmits(['select'])

const props = defineProps({
    refreshKey: [String, Number],
    showStats: { type: Boolean, default: true }
})

const videos = ref([])
const nextPageToken = ref(null)
const pending = ref(false)
const q = ref('')

async function fetchPage() {
    if (pending.value) return
    pending.value = true
    const { data, error } = await useFetch('/api/youtube/channel-videos', {
        query: {
            pageToken: nextPageToken.value || undefined,
            ts: props.refreshKey || Date.now()
        }
    })
    if (!error.value && data.value) {
        const v = data.value
        videos.value.push(...(v.videos || []))
        nextPageToken.value = v.nextPageToken || null
    }
    pending.value = false
}

const normalize = s => (s || '').toString().toLowerCase()
    .normalize('NFD').replace(/\p{Diacritic}/gu, '') // bỏ dấu tiếng Việt

const filtered = computed(() => {
    if (!q.value) return videos.value
    const key = normalize(q.value)
    return videos.value.filter(v =>
        normalize(v.title).includes(key) || normalize(v.description).includes(key)
    )
})

// ISO8601 PT#M#S -> mm:ss
function pretty(iso) {
    if (!iso) return ''
    const m = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(iso) || []
    const h = +(m[1] || 0), mm = +(m[2] || 0), ss = +(m[3] || 0)
    const total = h * 3600 + mm * 60 + ss
    const m2 = Math.floor(total / 60), s2 = total % 60
    return `${m2}:${String(s2).padStart(2, '0')}`
}

onMounted(fetchPage)
watch(() => props.refreshKey, () => {
    videos.value = []; nextPageToken.value = null; fetchPage()
})
</script>
