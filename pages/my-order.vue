<template>
    <div class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
        <div class="bg-white rounded-lg max-w-6xl w-full shadow-lg overflow-y-auto max-h-[90vh]">
            <!-- Tiêu đề và nút đóng: sticky header -->
            <div class="sticky top-0 z-10 bg-white border-b flex items-center justify-between p-4">
                <h2 class="text-xl font-bold text-gray-800">🧾 Đơn hàng #{{ order.value.order_code }}</h2>
                <button @click="$emit('close')" class="text-gray-600 hover:root-text text-lg px-2">
                    ✖
                </button>
            </div>

            <!-- Thông tin đơn hàng -->
            <div class="p-6 pb-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                    <div><b>👤 Người nhận:</b> {{ order.buyer_name }}</div>
                    <div><b>📦 Trạng thái:</b> {{ order.status }}</div>
                    <div><b>🏠 Địa chỉ:</b> {{ order.shipping_address }}</div>
                    <div><b>💰 Tổng tiền:</b> {{ order.total_price.toLocaleString() }}đ</div>
                    <div><b>🕒 Ngày tạo:</b> {{ formatDate(order.created_at) }}</div>
                </div>

                <!-- 2 cột: Sản phẩm + Logs -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Sản phẩm -->
                    <div>
                        <h3 class="font-semibold mb-3 text-lg">🛒 Danh sách sản phẩm</h3>
                        <div v-for="(item, index) in order.items" :key="index"
                            class="flex items-start gap-4 border rounded-lg p-3 mb-3 bg-gray-50">
                            <img :src="getProductImage(item.product_id)" class="w-16 h-16 object-cover rounded"
                                alt="product image" />
                            <div class="flex-1">
                                <p class="font-medium text-sm">{{ item.product_name }}</p>
                                <p class="text-sm">Mã SP: #{{ item.product_id }}</p>
                                <p class="text-sm">Số lượng: {{ item.quantity }}</p>
                                <p class="text-sm">Đơn giá: {{ item.unit_price.toLocaleString() }}đ</p>
                                <p v-if="item.note" class="text-xs text-gray-600 mt-1 italic">
                                    Tuỳ chọn: {{ parseNote(item.note) }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Logs -->
                    <div>
                        <h3 class="font-semibold mb-3 text-lg">🚚 Lịch sử đơn hàng</h3>
                        <ul v-if="order.logs?.length" class="space-y-3 text-sm">
                            <li v-for="(log, idx) in order.logs" :key="idx"
                                class="border border-gray-200 rounded p-3 bg-white shadow-sm">
                                <p class="font-medium">{{ formatDate(log.updated_at) }}</p>
                                <p>Trạng thái: <b>{{ log.status }}</b></p>
                                <p class="text-xs text-gray-600 italic mt-1">{{ log.note }}</p>
                            </li>
                        </ul>
                        <p v-else class="text-gray-500 text-sm italic">Chưa có log nào.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const { public: { apiBaseUrl } } = useRuntimeConfig()
const route = useRoute()
const orderCode = computed(() => route.query.code)
const order = ref(null)

watch(orderCode, (val) => {
  console.log('orderCode changed:', val)
})

onMounted(async () => {
  if (orderCode.value) {
    const res = await fetch(`${apiBaseUrl}/orders/${orderCode.value}`)
    order.value = await res.json()
    console.log(order.value.order_code);
  }
})

// onMounted(async () => {
//   // nếu đã có order (được truyền từ parent), không làm gì
//   if (order.value) return

//   // lấy mã từ query: /my-order?code=XXX
//   const code = route.query.code
//   if (!code) {
//     // không làm gì thêm — giữ order null (template có thể bị lỗi nếu không xử lý, nhưng bạn nói muốn ít sửa nhất)
//     // nếu muốn, có thể set một object rỗng hoặc hiển thị thông báo ở parent
//     return
//   }

//   try {
//     // fetch dữ liệu nếu truy cập trực tiếp bằng query
//     const res = await fetch(`${apiBaseUrl}/orders/${encodeURIComponent(code)}`)
//     if (!res.ok) {
//       // đơn giản: không throw để giữ code ngắn; bạn có thể xử lý lỗi nếu cần
//       return
//     }
//     order.value = await res.json()
//   } catch (err) {
//     // giữ im lặng để tránh thay đổi flow; bạn có thể log lỗi nếu muốn
//     // console.error(err)
//   }
// })


// function parseNote(note) {
//     try {
//         const parsed = JSON.parse(note)
//         return Object.entries(parsed).map(([k, v]) => `${k}: ${v}`).join(', ')
//     } catch {
//         return note || '—'
//     }
// }

// function formatDate(d) {
//     if (!d) return '—'
//     return new Date(d).toLocaleString('vi-VN')
// }

// function getProductImage(productId) {
//     return `/product_image/m_${productId}.jpg`
// }
</script>