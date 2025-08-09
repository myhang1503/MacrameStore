<template>
    <div class="relative flex items-center" ref="rootEl">
        <button @click="toggleInput" class="p-2 text-white hover:text-white" :disabled="loading">
            <Icon name="mdi:magnify" />
        </button>

        <input v-if="showInput" ref="inputEl" v-model.trim="searchText" @keydown.enter="handleSearch"
            @keydown.esc="closeInput" type="text" placeholder="Nhập tên sản phẩm hoặc mã đơn hàng"
            class="ml-2 border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none w-64 bg-white" />

        <OrderDetailPopup v-if="showPopup && orderDetail" :order="orderDetail" @close="showPopup = false" />

        <!-- trạng thái nhỏ -->
        <span v-if="loading" class="ml-2 text-xs text-white/80">Đang tìm...</span>
        <span v-if="error" class="ml-2 text-xs text-red-100 bg-red-600/60 px-2 py-0.5 rounded">{{ error }}</span>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import OrderDetailPopup from './OrderDetailPopup.vue'
import { useRoute, useRouter } from 'vue-router'

const { public: { apiBaseUrl } } = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

const searchText = ref('')
const showInput = ref(false)
const showPopup = ref(false)
const orderDetail = ref(null)
const loading = ref(false)
const error = ref('')

const rootEl = ref(null)
const inputEl = ref(null)

const isOrderCode = (s) => /^HMORD[0-9A-Z-]*$/i.test((s || '').trim())

function openInput() {
    showInput.value = true
    // chờ render rồi focus
    requestAnimationFrame(() => inputEl.value?.focus())
}
function closeInput() {
    showInput.value = false
    error.value = ''
}

function toggleInput() {
    showInput.value ? closeInput() : openInput()
    if (!showInput.value) searchText.value = ''
}

async function handleSearch() {
    const q = searchText.value.trim()
    error.value = ''
    if (!q) return

    if (isOrderCode(q)) {
        try {
            loading.value = true
            const res = await fetch(`${apiBaseUrl}/orders/${encodeURIComponent(q)}`)
            if (!res.ok) throw new Error(res.status === 404 ? 'Không tìm thấy đơn hàng' : 'Lỗi tra cứu')
            orderDetail.value = await res.json()
            showPopup.value = true
        } catch (e) {
            error.value = e.message || 'Có lỗi xảy ra'
        } finally {
            loading.value = false
        }
    } else {
        // điều hướng về trang chủ với query search (SPA)
        router.push({ path: '/', query: { search: searchText.value.trim() || undefined } })
    }
}

// xử lý query ?search ngay khi vào trang
onMounted(async () => {
    const qs = route.query.search
    if (typeof qs === 'string') {
        searchText.value = qs
        // nếu là mã đơn: mở popup; nếu là từ khóa: để router trên trang chủ xử lý
        if (isOrderCode(qs)) {
            await handleSearch()
            router.replace({ query: {} }) // xóa query sau khi tra cứu đơn
        } else {
            openInput()
        }
    }
})

// click-outside để đóng input
function onDocClick(e) {
    if (!rootEl.value) return
    if (!rootEl.value.contains(e.target)) closeInput()
}
document.addEventListener('click', onDocClick)
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>
