<template>
    <section class="px-4 py-6">
        <!-- Header + Actions -->
        <div class="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h1 class="text-2xl font-bold">Quản lý Tin tức</h1>
            <div class="flex items-center gap-2">
                <input v-model="searchText" @keyup.enter="applySearch" type="text" placeholder="Tìm tiêu đề, mô tả…"
                    class="w-56  border px-3 py-2">
                <select v-model="status" class=" border px-2 py-2">
                    <option value="">Tất cả</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
                <select v-model.number="size" class=" border px-2 py-2">
                    <option :value="12">12</option>
                    <option :value="24">24</option>
                    <option :value="60">60</option>
                </select>
                <button class=" bg-black text-white px-4 py-2" @click="openCreate">Thêm bài</button>
            </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto  border">
            <table class="min-w-full text-sm">
                <thead class="bg-gray-50 text-left">
                    <tr>
                        <th class="px-3 py-2 w-16">ID</th>
                        <th class="px-3 py-2">Tiêu đề</th>
                        <th class="px-3 py-2">Danh mục</th>
                        <th class="px-3 py-2">Status</th>
                        <th class="px-3 py-2">Ngày</th>
                        <th class="px-3 py-2 w-40">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="pending">
                        <td colspan="7" class="px-3 py-6 text-center text-gray-500">Đang tải…</td>
                    </tr>
                    <tr v-else-if="!items.length">
                        <td colspan="7" class="px-3 py-10 text-center text-gray-500">
                            Không có dữ liệu. Thử về trang 1 hoặc đổi bộ lọc.
                            <div class="mt-3 flex justify-center gap-2">
                                <button class="border px-3 py-1.5" @click="page = 1">Trang 1</button>
                                <button class="border px-3 py-1.5" @click="clearSearch">Xoá tìm</button>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="n in items" :key="n.id" class="border-t">
                        <td class="px-3 py-2">{{ n.id }}</td>
                        <td class="px-3 py-2">
                            <div class="font-medium line-clamp-1">{{ n.title }}</div>
                            <div class="text-xs text-gray-500 line-clamp-1">{{ n.slug }}</div>
                        </td>
                        <td class="px-3 py-2">{{ n.category_name || n.category_id || '-' }}</td>
                        <td class="px-3 py-2">
                            <span :class="n.status === 'published' ? 'text-green-700' : 'text-gray-600'">{{ n.status
                                }}</span>
                        </td>

                        <td class="px-3 py-2">{{ formatDate(n.published_at || n.created_at) }}</td>
                        <td class="px-3 py-2">
                            <div class="flex gap-2">
                                <button class="border px-2 py-1" @click="openEdit(n)">Sửa</button>
                                <button class=" border px-2 py-1" @click="togglePublish(n)">
                                    {{ n.status === 'published' ? 'Đưa về draft' : 'Publish' }}
                                </button>
                                <button class="border px-2 py-1 text-red-600 border-red-300"
                                    @click="removeItem(n)">Xoá</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages >= 1" class="mt-4 flex flex-wrap items-center justify-center gap-2">
            <button class="px-3 py-1.5 rounded-lg border disabled:opacity-50" :disabled="page <= 1"
                @click="go(page - 1)">Trước</button>
            <button v-for="p in pageList" :key="p.key" class="px-3 py-1.5 rounded-lg border"
                :class="p.num === page ? 'bg-gray-900 text-white border-gray-900' : 'hover:bg-gray-50'"
                :disabled="!p.num" @click="p.num && go(p.num)">{{ p.label }}</button>
            <button class="px-3 py-1.5 rounded-lg border disabled:opacity-50" :disabled="page >= totalPages"
                @click="go(page + 1)">Sau</button>
        </div>

        <!-- Form popup -->
        <NewsAdminForm v-model:open="isFormOpen" :value="current" @saved="refreshList" />
    </section>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
})
import NewsAdminForm from '~/components/admin/NewsForm.vue'
const { public: { apiBaseUrl } } = useRuntimeConfig()

// filters
const searchText = ref('')
const q = ref('')
const status = ref('')
const page = ref(1)
const size = ref(12)

// URL
const url = computed(() =>
    `${apiBaseUrl}/admin/news?status=${encodeURIComponent(status.value)}&q=${encodeURIComponent(q.value)}&page=${page.value}&size=${size.value}`
)

// Fetch
const { data, pending, refresh } = await useFetch(url, { watch: [url] })
const items = computed(() => Array.isArray(data.value) ? data.value : (data.value?.items ?? []))
const total = computed(() => Array.isArray(data.value) ? items.value.length : (data.value?.total ?? 0))
const totalPages = computed(() => Math.max(1, Math.ceil((total.value || 0) / size.value)))

// Search
const applySearch = () => { q.value = (searchText.value || '').trim(); page.value = 1 }
const clearSearch = () => { searchText.value = ''; q.value = ''; page.value = 1 }
let t = null; watch(searchText, () => { clearTimeout(t); t = setTimeout(applySearch, 300) })

// Paging
const go = (p) => { if (p < 1 || p > totalPages.value) return; page.value = p; window.scrollTo({ top: 0, behavior: 'smooth' }) }
const pageList = computed(() => {
    const cur = page.value, last = totalPages.value
    const nums = new Set([1, 2, cur - 1, cur, cur + 1, last - 1, last])
    const arr = [...nums].filter(n => n >= 1 && n <= last).sort((a, b) => a - b)
    const out = []; let prev = 0
    for (const n of arr) { if (n - prev > 1) out.push({ key: `d-${n}`, label: '…' }); out.push({ key: `p-${n}`, num: n, label: String(n) }); prev = n }
    return out
})

// Actions
const isFormOpen = ref(false)
const current = ref(null)
const openCreate = () => { current.value = null; isFormOpen.value = true }
const openEdit = async (n) => {
    try {
        const detail = await $fetch(`${apiBaseUrl}/admin/news/${n.id}`)
        // gộp để giữ các field khác từ list (nếu cần)
        current.value = { ...n, ...detail }
        isFormOpen.value = true
    } catch (e) {
        console.error('[openEdit] fetch detail error:', e)
        alert('Không tải được nội dung bài viết.')
    }
}
const refreshList = () => refresh()

const formatDate = (s) => s ? new Date(s).toLocaleDateString() : ''

async function togglePublish(n) {
    const to = n.status === 'published' ? 'draft' : 'published'
    await $fetch(`${apiBaseUrl}/admin/news/${n.id}/status`, { method: 'PUT', body: { status: to } })
    refreshList()
}
async function removeItem(n) {
    if (!confirm(`Xoá bài #${n.id}?`)) return
    await $fetch(`${apiBaseUrl}/admin/news/${n.id}`, { method: 'DELETE' })
    // nếu trang trống, lùi về trang trước
    if (items.value.length === 1 && page.value > 1) page.value -= 1
    else refreshList()
}
</script>
