<!-- components/OrderDetailPopup.vue -->
<template>
    <div v-if="show" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div class="bg-white w-8/9 max-w-[85vw] max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-6 relative">
            <div class="grid grid-cols-5 gap-6 text-sm">
                <!-- Cột 1: chiếm 2/3 -->
                <div class="col-span-2 space-y-2 bg-gray-50 p-4 rounded-xl shadow-inner">
                    <button class="absolute top-2 right-2 text-gray-500" @click="emit('close')">✖</button>
                    <h2 class="text-xl font-bold mb-4">🧾 Chi tiết đơn hàng</h2>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div><strong>Mã đơn:</strong> {{ order.order_code }}</div>
                        <div><strong>Người mua:</strong> {{ order.buyer_name }}</div>
                        <div><strong>Email:</strong> {{ order.receiver_email }}</div>
                        <div><strong>SĐT liên hệ:</strong> {{ order.receiver_phone }}</div>
                        <div><strong>Địa chỉ nhận hàng:</strong> {{ order.shipping_address }}</div>

                        <div><strong>Phương thức thanh toán:</strong> {{ order.payment_method }}</div>
                        <div><strong>VAT:</strong> {{ formatMoney(order.vat_amount) }}</div>
                        <div><strong>Phí ship:</strong> {{ formatMoney(order.shipping_fee) }}</div>
                        <div><strong>Tổng trước thuế:</strong> {{ formatMoney(order.total_price_before_tax) }}</div>
                        <div><strong>Giảm giá:</strong> {{ formatMoney(order.discount_amount) }}</div>
                        <div><strong>Tổng thanh toán:</strong> {{ formatMoney(order.total_price) }}</div>
                    </div>

                    <h3 class="mt-6 mb-2 font-semibold">📦 Sản phẩm:</h3>
                    <table class="w-full text-sm border">
                        <thead>
                            <tr class="bg-gray-100">
                                <th class="p-2 border">STT</th>
                                <th class="p-2 border">Mã hàng</th>
                                <th class="p-2 border">Tên</th>
                                <th class="p-2 border">Đơn giá</th>

                                <th class="p-2 border">Số lượng</th>
                                <th class="p-2 border">Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in order.items" :key="index">
                                <td class="p-2 border text-center">{{ index + 1 }}</td>
                                <td class="p-2 border text-center">{{ item.product_id }}</td>
                                <td class="p-2 border text-center">{{ item.product_name }}</td>
                                <td class="p-2 border text-center">{{ formatMoney(item.unit_price) }}</td>
                                <td class="p-2 border text-center">{{ item.quantity }}</td>
                                <td class="p-2 border text-center">{{ formatMoney(item.unit_price * item.quantity) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="col-span-2 space-y-2 bg-blue-50 p-4 rounded-xl shadow-inner">
                    <h2 class="text-xl font-bold mb-4">Trạng thái đơn hàng: <strong :class="{
        'text-gray-500': order.status === 'pending',
        'text-blue-500': order.status === 'confirmed',
        'text-orange-500': order.status === 'shipping',
        'text-green-600': order.status === 'completed',
        'text-green-600': order.status === 'done',
        'text-red-500': order.status === 'cancelled'
    }"> {{ order.status }}</strong></h2>
                    <!-- Các chức năng -->
                    <div v-if="order.status === 'pending'" class="mb-2">
                        <div class="space-y-2">
                            <label class="block text-sm font-medium">Note:</label>
                            <textarea v-model="internalNote" class="border rounded w-full p-2 text-sm"
                                placeholder="VD: Đã gọi khách, chờ phản hồi..."></textarea>

                        </div>

                        <!-- Footer nút hành động -->
                        <div class="flex justify-end gap-2 mt-6">
                            <button @click="cancelOrder"
                                class="px-4 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600">
                                ❌ Huỷ đơn hàng
                            </button>

                            <button @click="editOrder"
                                class="px-4 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600">
                                ✏️ Sửa đơn hàng
                            </button>
                            <button @click="markAsConfirmed"
                                class="px-4 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                                ✅ Xác nhận đơn hàng
                            </button>
                        </div>
                    </div>
                    <div v-else-if="order.status === 'confirmed'" class="mb-2">
                        <!-- Đơn hàng đã xác nhận -->

                        <p class="text-sm text-gray-600">Đơn hàng đã được xác nhận. Tiến hành chuẩn bị hàng để giao.
                        </p>

                        <div class="border border-gray-300 rounded-lg p-4 bg-gray-50 space-y-2 mb-4">
                            <p class="text-sm text-gray-600">Bước 1: Tạo đơn giao hàng trên Viettel Post</p>
                            <button @click="createTrackingCode"
                                class="px-4 py-1 bg-orange-500 text-white text-sm rounded hover:bg-orange-600">
                                🚚 Tạo đơn giao hàng
                            </button>
                        </div>
                        <div class="border border-gray-300 rounded-lg p-4 bg-gray-50 space-y-2 mb-4">
                            <p class="text-sm text-gray-600">Bước 2: Lưu mã vận đơn vào hệ thống</p>
                            <label class="block text-sm font-medium">Mã vận đơn (tracking):</label>
                            <input v-model="trackingCode" type="text" class="border rounded px-3 py-1 w-full text-sm"
                                placeholder="Nhập mã vận đơn..." />
                            <div class="flex justify-end gap-2">
                                <button @click="saveTrackingCode"
                                    class="px-4 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                                    💾 Lưu mã vận đơn
                                </button>
                            </div>
                        </div>
                        <div class="border border-gray-300 rounded-lg p-4 bg-gray-50 space-y-2 mb-4">
                            <!-- Ghi chú đóng gói -->
                            <p class="text-sm text-gray-600">Bước 3: In hóa đơn </p>
                            <button @click="openReceipt(order)"
                                class="px-4 py-1 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600">
                                🧾 In hóa đơn
                            </button>
                        </div>
                        <div class="border border-gray-300 rounded-lg p-4 bg-gray-50 space-y-2 mb-4">
                            <p class="text-sm text-gray-600">Bước 4: Ghi chú thông tin đóng gói</p>
                            <label class="block text-sm font-medium">Ghi chú:</label>
                            <textarea v-model="packingNote" class="border rounded w-full p-2 text-sm"
                                placeholder="VD: Gói kỹ sản phẩm A vì dễ vỡ..."></textarea>

                        </div>
                        <!-- Footer nút hành động -->
                        <div class="flex justify-end gap-2 mt-6">
                            <!-- Nút tạo vận đơn -->
                            <!-- Nút chuyển sang shipping -->

                            <button @click="markAsShipping"
                                class="px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                                📦 Đã bàn giao cho đơn vị vận chuyển
                            </button>
                        </div>
                    </div>

                    <div v-else-if="order.status === 'shipping'" class="mb-2">
                        <div class="border border-gray-300 rounded-lg p-4 bg-gray-50 space-y-2 mb-4">
                            <p class="text-sm text-gray-600">Bước 1: Kiểm tra tình trạng vận chuyển đơn hàng</p>
                            <label class="block text-sm font-medium">Mã vận đơn: <span
                                    class="text-sm text-blue-600 font-semibold">{{ order.tracking_code }}</span></label>


                            <a :href="`https://viettelpost.vn/track?billcode=${order.tracking_code}`" target="_blank"
                                class="text-blue-500 underline text-sm">
                                🔍 Theo dõi vận đơn
                            </a>
                        </div>
                        <div class="border border-gray-300 rounded-lg p-4 bg-gray-50 space-y-2 mb-4">
                            <p class="text-sm text-gray-600">Bước 2: Ghi nhận tình trạng đơn hàng.</p>
                            <label class="block text-sm font-medium mt-2">Ghi chú giao hàng:</label>
                            <textarea v-model="shippingNote" class="border rounded w-full p-2 text-sm"
                                placeholder="VD: Khách hẹn giao lại, chuyển địa chỉ..."></textarea>
                            <button @click="updateLogs"
                                class="px-4 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                                Cập nhật trạng thái giao hàng
                            </button>
                        </div>

                        <!-- Footer -->
                        <div class="flex justify-end gap-2 mt-6">
                            <button @click="markAsCompleted"
                                class="px-4 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                                ✅ Đánh dấu là giao thành công
                            </button>
                        </div>

                    </div>
                    <div v-else-if="order.status === 'completed'" class="mb-2">
                        <!-- Đơn hàng đã giao thành công -->
                        <div class="border border-gray-300 rounded-lg p-4 bg-gray-50 space-y-2 mb-4">
                            <p class="text-sm text-green-700 font-semibold">✔ Đơn hàng đã giao thành công.</p>

                            <div v-if="order.payment_method === 'COD'">
                                <label class="text-sm">Thanh toán: <span class="text-sm text-gray-700">{{ order.is_paid
        ? 'Đã thu tiền' : 'Chưa thu tiền'
                                        }}
                                    </span></label>
                                <div>
                                    <button v-if="!order.is_paid" @click="confirmPayment"
                                        class="mt-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                                        💰 Xác nhận đã thu tiền
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="border border-gray-300 rounded-lg p-4 bg-gray-50 space-y-2 mb-4">
                            <label class="block text-sm font-medium mt-2">Xuất hóa đơn</label>
                            <!-- Xuất hóa đơn -->
                            <div><button @click="exportInvoice"
                                    class="mt-2 px-3 py-1 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600">
                                    🧾 Xuất hóa đơn
                                </button></div>

                        </div>
                        <div class="border border-gray-300 rounded-lg p-4 bg-gray-50 space-y-2 mb-4">
                            <!-- Ghi chú -->
                            <label class="block text-sm font-medium mt-2">Ghi chú hoàn tất:</label>
                            <textarea v-model="completionNote" class="border rounded w-full p-2 text-sm"
                                placeholder="VD: Giao lúc 9h, khách vui vẻ..."></textarea>

                        </div>
                        <div class="flex justify-end gap-2 mt-6">
                            <button @click="markAsDone"
                                class="px-4 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                                ✅ Hoàn thành đơn hàng
                            </button>
                        </div>

                    </div>
                    <div v-else-if="order.status === 'done'" class="mb-2">
                        <div class="border border-gray-300 rounded-lg p-4 bg-gray-50 space-y-2 mb-4">
                            <label class="block text-sm font-medium mt-2">Xuất lại hóa đơn</label>
                            <!-- Xuất hóa đơn -->
                            <div> <button @click="openReceipt(order)"
                                    class="px-4 py-1 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600 mr-1">
                                    🧾 In hóa đơn
                                </button>
                                <button @click="exportInvoice"
                                    class="mt-2 px-3 py-1 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600">
                                    🧾 Xuất hóa đơn đỏ
                                </button>
                            </div>



                        </div>
                    </div>
                    <div v-else-if="order.status === 'cancelled'" class="mb-2">
                        <!-- Đơn hàng bị huỷ -->
                        <div class="space-y-2">
                            <p class="text-sm text-red-600 font-semibold">❌ Đơn hàng đã bị huỷ.</p>

                            <label class="block text-sm font-medium">Lý do huỷ:</label>
                            <p class="text-sm italic text-gray-600">{{ order.cancel_reason || 'Không rõ' }}</p>

                            <!-- Ghi chú nội bộ -->
                            <label class="block text-sm font-medium mt-2">Ghi chú thêm:</label>
                            <textarea v-model="cancelNote" class="border rounded w-full p-2 text-sm"
                                placeholder="VD: Khách không nghe máy, giao không thành..."></textarea>


                            <!-- Tạo lại đơn -->
                            <button @click="duplicateOrder"
                                class="px-4 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                                🔁 Tạo lại đơn hàng mới
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-span-1 space-y-2 bg-yellow-50 p-4 rounded-xl shadow-inner">
                    <h2 class="text-xl font-bold mb-4">🕒 Lịch sử đơn hàng</h2>
                    <div class="pt-4">
                        <div v-if="logs.length === 0" class="text-sm text-gray-500">
                            Không có log nào.
                        </div>

                        <div v-else class="w-full max-w-4xl rounded p-6 overflow-hidden h-[80vh] flex flex-col">
                            <div v-for="log in logs" :key="log.id" class="text-sm pb-1">
                                <div class="font-medium">
                                    {{ log.status.toUpperCase() }} - {{ formatDate(log.updated_at) }}
                                </div>
                                <div class="italic text-gray-700">{{ log.note }}</div>
                                <div class="text-xs text-gray-400">👤 {{ log.updated_by }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <OrderReceipt v-if="showPopup" :order="props.order" @close="showPopup = false" />
</template>

<script setup>
import OrderReceipt from '@/components/admin/OrderReceipt.vue'
const { public: { apiBaseUrl } } = useRuntimeConfig()
const showPopup = ref(false)
const selectedOrder = ref(null)
const props = defineProps({
    order: {
        type: Object,
        required: true
    },
    show: Boolean,
})
const openReceipt = async (order) => {
    const items = await $fetch(`${apiBaseUrl}/order-items?order_id=${order.id}`)
    selectedOrder.value = {
        ...order,
        items: items
    }
    showPopup.value = true
}



const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN')
}

const formatMoney = (num) => {
    return new Intl.NumberFormat('vi-VN').format(num) + ' đ'
}

function getProductImage(productId) {
    return `/product_image/m_${productId}.jpg`
}
const emit = defineEmits(['close'])

let user = ref({})

if (process.client) {
    const raw = localStorage.getItem('user')
    user.value = raw ? JSON.parse(raw) : {}
}

const trackingCode = ref(props.order?.tracking_code || '')
const saveTrackingCode = async () => {
    if (!trackingCode.value) {
        alert('⚠️ Vui lòng nhập mã vận đơn')
        return
    }

    try {
        await $fetch(`${apiBaseUrl}/orders/${props.order.id}`, {
            method: 'PUT',
            body: {
                tracking_code: trackingCode.value
            }
        })

        alert('✅ Đã lưu mã vận đơn!')
        emit('updated')
    } catch (err) {
        console.error('❌ Lỗi lưu vận đơn:', err)
        alert('Lỗi khi lưu mã vận đơn')
    }
}




const internalNote = ref('')
const packingNote = ref('')
const shippingNote = ref('')

const completionNote = ref('')
const cancelNote = ref('')

const markAsConfirmed = () =>
    updateOrderStatus('confirmed', 'Xác nhận đơn hàng này?', '✅ Đơn hàng đã được xác nhận!', internalNote.value)
const markAsShipping = () =>
    updateOrderStatus('shipping', 'Xác nhận đã bàn giao cho đơn vị vận chuyển?', '📦 Đã chuyển sang trạng thái ĐANG GIAO!', packingNote.value)
const markAsCompleted = () =>
    updateOrderStatus('completed', 'Xác nhận đơn đã giao xong?', '✅ Đơn hàng đã được giao hoàn tất!', shippingNote.value)
const markAsDone = () =>
    updateOrderStatus('done', 'Xác nhận đơn đã giao xong?', '✅ Đơn hàng đã được hoàn tất!', completionNote.value)
const markAsCancel = () =>
    updateOrderStatus('cancelled', 'Xác nhận hủy đơn hàng?', '❌ Đơn hàng đã được hủy!', cancelNote.value)

const updateOrderStatus = async (newStatus, confirmMessage, successMessage, note) => {
    const confirmed = confirm(confirmMessage || 'Xác nhận hành động này?')
    if (!confirmed) return

    try {
        const res = await $fetch.raw(`${apiBaseUrl}/orders/${props.order.id}/status`, {
            method: 'PUT',
            body: {
                status: newStatus
            }
        })

        if (res.status === 200) {
            await $fetch(`${apiBaseUrl}/order-logs`, {
                method: 'POST',
                body: {
                    order_id: props.order.id,
                    status: newStatus,
                    note: note || '',
                    updated_by: user.value.username || 'admin'
                }
            })

            alert(successMessage || '✅ Cập nhật thành công!')
            emit('updated')
            emit('close')
        } else {
            alert('⚠️ Cập nhật trạng thái thất bại.')
        }
    } catch (err) {
        console.error('❌ Lỗi cập nhật trạng thái:', err)
        alert('Có lỗi xảy ra.')
    }
}

const updateLogs = async () => {
    if (!shippingNote.value.trim()) {
        alert('⚠️ Vui lòng nhập ghi chú giao hàng trước khi cập nhật.')
        return
    }

    try {
        await $fetch(`${apiBaseUrl}/order-logs`, {
            method: 'POST',
            body: {
                order_id: props.order.id,
                status: props.order.status,
                note: shippingNote.value,
                updated_by: user.value.username || 'admin'
            }
        })

        alert('✅ Ghi chú trạng thái giao hàng đã được cập nhật!')
        await fetchLogs()
        emit('updated')
    } catch (err) {
        console.error('❌ Lỗi cập nhật trạng thái giao hàng:', err)
        alert('Có lỗi xảy ra khi cập nhật ghi chú.')
    }
}

watch(() => props.order, (val) => {
    trackingCode.value = val?.tracking_code || ''
}, { immediate: true })

const logs = ref([])

const fetchLogs = async () => {
    try {
        const res = await $fetch(`${apiBaseUrl}/order-logs/${props.order.id}`)
        logs.value = res || []
    } catch (err) {
        console.error('❌ Lỗi lấy logs:', err)
    }
}

watch(() => props.order?.id, (id) => {
    if (id) fetchLogs()
}, { immediate: true })

</script>
