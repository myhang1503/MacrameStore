<template>
    <div class="relative flex items-center">
        <button @click="toggleInput" class="p-2 text-gray-700 hover:text-black">
            <Icon name="mdi:magnify" />
        </button>
        <input v-if="showInput" v-model="searchText" @keydown.enter="handleSearch" type="text"
            placeholder="Nhập tên sản phẩm or mã đơn hàng"
            class="ml-2 border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none w-64 bg-white" />
        <OrderDetailPopup v-if="showPopup && orderDetail" :order="orderDetail" @close="showPopup = false" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import OrderDetailPopup from './OrderDetailPopup.vue'
import { useRoute } from 'vue-router'
const { public: { apiBaseUrl } } = useRuntimeConfig()
const route = useRoute()

onMounted(() => {
    const querySearch = route.query.search
    if (typeof querySearch === 'string' && querySearch.toUpperCase().startsWith('HMORD')) {
        searchText.value = querySearch
        handleSearch().then(() => {
            route.replace({ query: {} }) // xóa ?search sau khi xong
        })
    }
})

const searchText = ref('')
const showInput = ref(false)
const showPopup = ref(false)
const orderDetail = ref(null)

function toggleInput() {
    showInput.value = !showInput.value
    if (!showInput.value) searchText.value = ''
}

async function handleSearch() {
    if (searchText.value.toUpperCase().startsWith('HMORD')) {
        const res = await fetch(`${apiBaseUrl}/orders/${searchText.value}`)
        if (res.ok) {
            orderDetail.value = await res.json()
            showPopup.value = true
        } else {
            alert('Không tìm thấy đơn hàng')
        }
    } else {
        // Điều hướng lại index.vue và truyền search query
        window.location.href = `/?search=${encodeURIComponent(searchText.value)}`
    }
}
</script>
