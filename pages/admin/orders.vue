<template>
    <div class="p-4">
        <h2 class="text-xl font-bold mb-4">📦 Danh sách đơn hàng</h2>

        <!-- Bộ lọc -->
        <div class="flex flex-wrap gap-4 mb-4">
            <input v-model="search" type="text" placeholder="🔍 Tìm kiếm mã đơn / tên"
                class="border p-2 rounded w-60" />
            <input v-model="fromDate" type="date" class="border p-2 rounded" />
            <input v-model="toDate" type="date" class="border p-2 rounded" />
            <button @click="resetFilters" class="bg-gray-200 px-4 py-2 rounded">🔄 Reset</button>
        </div>

        <!-- Bảng đơn hàng -->
        <table class="min-w-full table-auto border text-sm">
            <thead>
                <tr class="bg-gray-100 text-left">
                    <th class="p-2 border">Mã đơn</th>
                    <th class="p-2 border">Người nhận</th>
                    <th class="p-2 border">SĐT</th>
                    <th class="p-2 border">Email</th>
                    <th class="p-2 border">Tổng tiền</th>
                    <th class="p-2 border">Trạng thái</th>
                    <th class="p-2 border">Ngày tạo</th>
                    <th class="p-2 border text-center">Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in pagedOrders" :key="order.id" class="hover:bg-gray-50">
                    <td class="p-2 border">{{ order.order_code }}</td>
                    <td class="p-2 border">{{ order.buyer_name }}</td>
                    <td class="p-2 border">{{ order.receiver_phone }}</td>
                    <td class="p-2 border">{{ order.receiver_email }}</td>
                    <td class="p-2 border">{{ formatMoney(order.total_price) }}</td>
                    <td class="p-2 border">
                        <span :class="['text-xs px-2 py-1 rounded', statusColor(order.status)]">
                            {{ order.status }}
                        </span>
                    </td>
                    <td class="p-2 border">{{ new Date(order.created_at).toLocaleString() }}</td>
                    <td class="p-2 border text-center">
                        <button class="text-blue-500 hover:underline mr-2" @click="showDetail(order)">Chi tiết</button>
                        <button class="text-red-600 hover:underline mr-2">Hủy đơn</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Phân trang -->
        <div class="flex justify-center items-center gap-2 mt-4">
            <button :disabled="page <= 1" @click="page--" class="px-3 py-1 bg-gray-200 rounded">⬅</button>
            <span>Trang {{ page }} / {{ totalPages }}</span>
            <button :disabled="page >= totalPages" @click="page++" class="px-3 py-1 bg-gray-200 rounded">➡</button>
        </div>
    </div>
    <OrderDetailPopupAdmin :show="showPopupDetail" :order="selectedOrder" @close="showPopupDetail = false"
        @updated="fetchOrders" />

</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
})
import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs'

import OrderDetailPopupAdmin from '@/components/admin/OrderDetailPopupAdmin.vue'
const { public: { apiBaseUrl } } = useRuntimeConfig()

const allOrders = ref([])
const search = ref('')
const fromDate = ref('')
const toDate = ref('')
const page = ref(1)
const perPage = 10

const selectedOrder = ref(null)

const showPopupDetail = ref(false)


const showDetail = async (order) => {
    const items = await $fetch(`${apiBaseUrl}/order-items?order_id=${order.id}`)
    selectedOrder.value = {
        ...order,
        items: items
    }
    showPopupDetail.value = true
}


const openReceipt = async (order) => {
    const items = await $fetch(`${apiBaseUrl}/order-items?order_id=${order.id}`)
    selectedOrder.value = {
        ...order,
        items: items
    }
    showPopup.value = true
}
function formatMoney(amount) {
    if (!amount) return "0 đ"
    return Number(amount).toLocaleString('vi-VN') + " đ"
}
// Fetch all đơn hàng
const fetchOrders = async () => {
    try {
        const res = await $fetch(`${apiBaseUrl}/orders`)
        allOrders.value = res
    } catch (err) {
        console.error('Lỗi tải đơn hàng:', err)
    }
}
onMounted(fetchOrders)

// Lọc danh sách đơn hàng
const filteredOrders = computed(() => {
    let result = allOrders.value

    if (search.value) {
        const s = search.value.toLowerCase()
        result = result.filter(o =>
            o.buyer_name.toLowerCase().includes(s) || o.order_code.toLowerCase().includes(s)
        )
    }

    if (fromDate.value) {
        result = result.filter(o => dayjs(o.created_at).isAfter(dayjs(fromDate.value).startOf('day')))
    }

    if (toDate.value) {
        result = result.filter(o => dayjs(o.created_at).isBefore(dayjs(toDate.value).endOf('day')))
    }

    return result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
})

const pagedOrders = computed(() => {
    const start = (page.value - 1) * perPage
    return filteredOrders.value.slice(start, start + perPage)
})

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / perPage))

const statusColor = status => {
    return {
        pending: 'bg-gray-400 text-white',
        processing: 'bg-blue-500 text-white',
        shipped: 'bg-orange-500 text-white',
        completed: 'bg-green-500 text-white',
        cancelled: 'bg-red-500 text-white'
    }[status] || 'bg-gray-300'
}

const resetFilters = () => {
    search.value = ''
    fromDate.value = ''
    toDate.value = ''
    page.value = 1
}


</script>
