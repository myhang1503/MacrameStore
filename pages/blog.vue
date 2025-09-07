<template>
    <div class="min-h-screen w-full text-slate-800">
        <section class="px-4 py-6">
            <!-- Search + size -->
            <div class="mb-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <h1 class="text-2xl font-bold">Khám phá những điều bổ ích và thú vị</h1>
                <div class="flex items-center gap-2 w-full sm:w-auto">
                    <input v-model="searchText" @keyup.enter="applySearch" type="text" placeholder="Tìm tiêu đề, mô tả…"
                        class="w-full sm:w-72  border px-3 py-2" />
                    <button class=" border px-3 py-2 hover:bg-gray-50" @click="applySearch"
                        :disabled="pending">Tìm</button>
                    <select v-model.number="size" class="border px-2 py-2">
                        <option :value="12">12</option>
                        <option :value="24">24</option>
                        <option :value="60">60</option>
                    </select>
                </div>
            </div>

            <!-- Grid / Empty -->
            <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div v-for="i in size" :key="i" class="h-56 animate-pulse bg-gray-200"></div>
            </div>

            <template v-else>
                <div v-if="news.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <NewsPaperCard v-for="n in news" :key="n.id" :title="n.title"
                        :cover="n.cover_path || '/placeholder.jpg'" :thumb="n.thumb_path" @card-click="goDetail(n)" />
                </div>

                <!-- Empty-state nhưng vẫn GIỮ phân trang -->
                <div v-else class="flex flex-col items-center justify-center py-16 text-center gap-3">
                    <p class="text-lg font-semibold">Không có kết quả ở trang {{ page }}</p>
                    <p class="text-gray-600">Thử về trang 1 hoặc xoá từ khoá tìm kiếm.</p>
                    <div class="flex gap-2">
                        <button class="border px-3 py-1.5" @click="goFirst()">Về trang 1</button>
                        <button class="border px-3 py-1.5" @click="clearSearch()">Xoá tìm kiếm</button>
                    </div>
                </div>
            </template>

            <!-- Pagination: luôn hiển thị khi totalPages>=1 -->
            <div v-if="totalPages >= 1" class="mt-6 flex flex-wrap items-center justify-center gap-2">
                <button class="px-3 py-1.5 border disabled:opacity-50" :disabled="page <= 1"
                    @click="goPage(page - 1)">Trước</button>

                <button v-for="p in pageList" :key="p.key" class="px-3 py-1.5 border"
                    :class="p.num === page ? 'bg-gray-900 text-white border-gray-900' : 'hover:bg-gray-50'"
                    :disabled="p.num === undefined" @click="p.num && goPage(p.num)">
                    {{ p.label }}
                </button>

                <button class="px-3 py-1.5 border disabled:opacity-50" :disabled="page >= totalPages"
                    @click="goPage(page + 1)">Sau</button>
            </div>

            <NewsPopup v-model:open="isPopupOpen" :item="selected" />
        </section>
    </div>
</template>

<script setup>
import NewsPaperCard from '~/components/NewsPaperCard.vue'
import NewsPopup from '~/components/NewsPopup.vue'

const { public: { apiBaseUrl } } = useRuntimeConfig()

// filter/paging
const searchText = ref('')
const q = ref('')
const page = ref(1)
const size = ref(12)
const status = ref('published')

// URL động
const url = computed(() =>
    `${apiBaseUrl}/news?status=${encodeURIComponent(status.value)}&q=${encodeURIComponent(q.value)}&page=${page.value}&size=${size.value}`
)

// fetch
const { data, pending } = await useFetch(url, { watch: [url] })

// Lưu total cuối cùng để GIỮ phân trang khi trang hiện tại trống
const lastKnownTotal = ref(0)

const itemsFromApi = computed(() => Array.isArray(data.value) ? data.value : (data.value?.items ?? []))
const totalFromApi = computed(() => Array.isArray(data.value) ? (data.value?.length ?? 0) : (data.value?.total ?? undefined))

watchEffect(() => {
    if (typeof totalFromApi.value === 'number') lastKnownTotal.value = totalFromApi.value
})

// Data hiển thị + tổng
const news = computed(() => itemsFromApi.value)
const total = computed(() => (typeof totalFromApi.value === 'number' ? totalFromApi.value : lastKnownTotal.value))
const totalPages = computed(() => Math.max(1, Math.ceil((total.value || 0) / size.value)))

// Auto-clamp page nếu vượt
watch([news, totalPages], () => {
    if (!pending.value && page.value > totalPages.value && totalPages.value >= 1) {
        page.value = totalPages.value
    }
})

// Tìm kiếm
const applySearch = () => { q.value = (searchText.value || '').trim(); page.value = 1 }
const clearSearch = () => { searchText.value = ''; q.value = ''; page.value = 1 }
let t = null
watch(searchText, () => { clearTimeout(t); t = setTimeout(applySearch, 300) })

// Điều hướng trang
function goPage(p) { if (p < 1 || p > totalPages.value) return; page.value = p; window.scrollTo({ top: 0, behavior: 'smooth' }) }
function goFirst() { page.value = 1 }

// Popup
const isPopupOpen = ref(false)
const selected = ref(null)
const openPopup = (n) => { selected.value = n; isPopupOpen.value = true }
console.log(selected.value);

const router = useRouter()
function goDetail(n) {
  router.push(`/${n.slug}`) // dùng dynamic route
}

useSeoMeta({
  title: 'Bài viết | Ý tưởng & chia sẻ về Macrame handmade',
  description: 'Khám phá bài viết và chia sẻ về nghệ thuật Macrame handmade – ý tưởng, kinh nghiệm và cảm hứng sáng tạo.',
  ogTitle: 'Bài viết | Ý tưởng & chia sẻ về Macrame handmade',
  ogDescription: 'Tổng hợp kinh nghiệm, ý tưởng trang trí và cảm hứng handmade từ Saturday Macrame.',
  ogImage: '/diy-cover.jpg'
})
</script>
