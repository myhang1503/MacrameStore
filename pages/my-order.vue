<template>
    <div class="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-start px-4 pt-[15vh]">
        <div class="w-full text-center flex flex-col items-center justify-center">

            <h1 class="text-3xl font-semibold text-gray-800 mb-6">Tra cứu đơn hàng</h1>

            <!-- Ô tìm kiếm -->
            <div
                class="flex items-center border border-gray-300 rounded-full shadow-sm bg-white px-4 py-3 w-full max-w-xl transition-all">
                <input v-model="orderCode" type="text" placeholder="Nhập mã đơn hàng (VD: HMORD12345)..."
                    class="flex-1 outline-none px-3 py-2 text-lg bg-transparent" @keyup.enter="searchOrder" />
                <button @click="searchOrder" class="p-2 text-gray-500 hover:text-orange-500 transition"
                    title="Tìm kiếm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
                    </svg>
                </button>
            </div>

            <!-- Loading -->
            <div v-if="loading" class="mt-6 text-gray-600">Đang tra cứu...</div>

            <!-- Kết quả -->
            <div v-if="result" class="mt-10 text-left bg-white shadow-lg p-6 w-full max-w-6xl">

                <!-- Nếu tìm thấy đơn hàng -->
                <template v-if="result.found">
                    <div class="w-full bg-white">
                        <div class="flex justify-between items-center border-b pb-2 mb-4">
                            <h2 class="text-xl font-semibold">
                                🧾 Đơn hàng <span class="root-text">#{{ result.data.order_code }}</span>
                            </h2>
                        </div>

                        <!-- Grid 2 cột -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <!-- Cột trái: Danh sách sản phẩm -->
                            <div>
                                <h3 class="text-lg font-semibold mb-3">🛍️ Danh sách sản phẩm</h3>
                                <div v-if="result.data.items && result.data.items.length" class="space-y-3">
                                    <div v-for="item in result.data.items" :key="item.id"
                                        class="flex items-center border rounded-lg p-3 hover:shadow-md transition">
                                        <img :src="getProductImage(item.product_id)" alt="product"
                                            class="w-20 h-20 rounded-lg object-cover mr-4" />
                                        <div class="flex-1">
                                            <p class="font-medium">{{ item.product_name }}</p>
                                            <p class="text-sm text-gray-500">Mã SP: #{{ item.product_id }}</p>
                                            <p class="text-sm">Số lượng: {{ item.quantity }}</p>
                                            <p class="text-sm">Đơn giá: {{ item.unit_price.toLocaleString() }}đ</p>
                                            <p style="text-align: right;">Tổng: {{ formatMoney(item.unit_price *
                    item.quantity) }}</p>
                                            <p v-if="item.options" class="text-sm italic text-gray-500">
                                                Tuỳ chọn: {{ formatOptions(item.options) }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p v-else class="text-gray-500">Không có sản phẩm nào trong đơn hàng này.</p>
                            </div>

                            <!-- Cột phải: Thông tin người nhận + log -->
                            <div>
                                <h3 class="text-lg font-semibold mb-3">👤 Thông tin đơn hàng</h3>
                                <div class="space-y-2 mb-6">
                                    <p><strong>Người nhận:</strong> {{ result.data.buyer_name }}</p>
                                    <p><strong>Địa chỉ:</strong> {{ result.data.shipping_address }}</p>
                                    <p><strong>Ngày tạo:</strong> {{ formatDate(result.data.created_at) }}</p>
                                    <p><strong>Trạng thái:</strong> {{ result.data.status }}</p>
                                    <p><strong>Tổng tiền:</strong> {{ formatPrice(result.data.total_price_before_tax) }}
                                    </p>
                                    <p><strong>Phí ship:</strong> {{ formatPrice(result.data.shipping_fee) }}</p>
                                    <p><strong>VAT:</strong> {{ formatPrice(result.data.vat_amount) }}</p>
                                    <p><strong>Giảm giá:</strong> {{ formatPrice(result.data.discount_amount) }}</p>

                                    <p><strong>Tổng cộng:</strong> {{ formatPrice(result.data.total_price) }}</p>
                                </div>

                                <h3 class="text-lg font-semibold mb-3">🚚 Lịch sử đơn hàng</h3>
                                <div v-if="result.data.logs && result.data.logs.length">
                                    <ul class="list-disc pl-6 space-y-1 text-gray-700">
                                        <li v-for="(log, idx) in result.data.logs" :key="idx">
                                            {{ formatDate(log.date) }} — {{ log.message }}
                                        </li>
                                    </ul>
                                </div>
                                <p v-else class="text-gray-500">Chưa có log nào.</p>
                            </div>
                        </div>
                    </div>
                </template>


                <!-- Nếu không tìm thấy -->
                <div v-else class="text-red-600 text-center py-4">
                    ❌ {{ error || 'Không tìm thấy đơn hàng này.' }}
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { public: { apiBaseUrl } } = useRuntimeConfig()
const router = useRouter()
const route = useRoute()

const orderCode = ref('')
const result = ref(null)
const loading = ref(false)
const error = ref('')

// Regex kiểm tra mã hợp lệ
const isOrderCode = (s) => /^HMORD[0-9A-Z-]*$/i.test((s || '').trim())

const searchOrder = async () => {
    const code = orderCode.value.trim()
    error.value = ''
    result.value = null

    if (!code) return
    if (!isOrderCode(code)) {
        error.value = 'Mã đơn hàng không hợp lệ (phải có dạng HMORD...)'
        result.value = { found: false }
        return
    }

    try {
        loading.value = true
        const res = await fetch(`${apiBaseUrl}/orders/${encodeURIComponent(code)}`)
        if (!res.ok) throw new Error(res.status === 404 ? 'Không tìm thấy đơn hàng này.' : 'Lỗi khi tra cứu.')

        const data = await res.json()
        result.value = { found: true, data }
    } catch (e) {
        error.value = e.message || 'Có lỗi xảy ra.'
        result.value = { found: false }
    } finally {
        loading.value = false
    }
}

// Nếu người dùng vào với query ?code=HMORDxxxx thì tự tra cứu luôn
onMounted(async () => {
    const code = route.query.code
    if (typeof code === 'string' && isOrderCode(code)) {
        orderCode.value = code
        await searchOrder()
        router.replace({ query: {} })
    }
})

const formatDate = (d) => new Date(d).toLocaleString('vi-VN')
const formatPrice = (v) => Number(v || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
const formatOptions = (opts) => {
    if (typeof opts === 'object') {
        return Object.entries(opts)
            .map(([k, v]) => `${k}: ${v}`)
            .join(', ')
    }
    return opts
}
const formatMoney = (num) => {
    return new Intl.NumberFormat('vi-VN').format(num) + ' đ'
}

function getProductImage(productId) {
    return `/product_image/m_${productId}.jpg`
}
</script>
