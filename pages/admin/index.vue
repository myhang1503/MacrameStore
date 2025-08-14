<template>
    <div class="p-6 space-y-6">
        <!-- Các widget trạng thái đơn hàng -->
        <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div v-for="status in allStatuses" :key="status"
                class="bg-white shadow-md rounded-xl p-4 text-center border">
                <h3 class="text-sm font-semibold text-gray-600 uppercase">{{ status }}</h3>
                <p class="text-2xl font-bold text-orange-500">{{ orderStatus[status] || 0 }}</p>
            </div>
        </div>

        <!-- Widget doanh thu tháng -->
        <div class="bg-white shadow-md rounded-xl p-6 text-center border">
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Doanh thu tháng này</h3>
            <p class="text-3xl font-bold text-green-600">
                {{ formatCurrency(monthlyRevenue) }}
            </p>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
})
import { ref, onMounted } from 'vue'
const { public: { apiBaseUrl } } = useRuntimeConfig()

const orderStatus = ref({})
const monthlyRevenue = ref(0)

const allStatuses = ['pending', 'confirmed', 'shipping', 'completed', 'done', 'cancelled']

onMounted(async () => {
    const [statusRes, revenueRes] = await Promise.all([
        $fetch(`${apiBaseUrl}/dashboard/order-status`),
        $fetch(`${apiBaseUrl}/dashboard/monthly-revenue`)
    ])
    orderStatus.value = statusRes
    monthlyRevenue.value = revenueRes.monthly_revenue || 0
})

function formatCurrency(value) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(value)
}
</script>