<template>
    <div v-if="show" class="fixed inset-0 z-50 bg-gray-200/95 flex items-center justify-center p-4 overflow-auto">
        <div class="bg-white w-full max-w-5xl rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden relative">

            <!-- Nút đóng -->
            <button @click="$emit('close')"
                class="absolute top-3 right-3 text-white bg-orange-500 w-6 h-6 rounded-full flex items-center justify-center text-sm z-10">✕</button>

            <!-- Cột trái: Danh sách sản phẩm -->
            <div class="w-full md:w-1/2 p-4 overflow-y-auto max-h-[90vh] border-r border-gray-300">
                <h3 class="text-lg font-semibold mb-2">Đơn hàng</h3>
                <div v-for="(item, index) in cartItems" :key="index" class="flex items-start gap-4 py-3">
                    <img :src="item.main_image" alt="Image" class="w-16 h-16 object-cover rounded" />
                    <div class="flex-1">
                        <p class="font-medium">{{ item.name }}</p>
                        <div class="text-sm text-gray-500">
                            <div v-for="(val, key) in item.selectedOptions" :key="key">
                                {{ key }}: {{ val }}
                            </div>
                            Số lượng: {{ item.quantity }}
                        </div>
                    </div>
                    <p class="font-semibold whitespace-nowrap">{{ item.price.toLocaleString() }}đ</p>
                </div>
            </div>

            <!-- Cột phải: Form + Tổng tiền -->
            <div class="w-full md:w-1/2 p-4 overflow-y-auto max-h-[90vh]">
                <h2 class="text-xl font-bold mb-4">Thông tin khách hàng</h2>

                <!-- Form: Chuyển sang dạng 1 cột -->
                <!-- Cột phải: Thông tin nhận hàng -->
                <div class="flex flex-col gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">Họ tên người nhận <b
                                class="text-red-600">*</b></label>
                        <input v-model="form.buyer_name" class="border p-2 rounded w-full" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-1">Email người nhận <b
                                class="text-red-600">*</b></label>
                        <input v-model="form.receiver_email" type="email" class="border p-2 rounded w-full" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-1">Số điện thoại <b
                                class="text-red-600">*</b></label>
                        <input v-model="form.receiver_phone" class="border p-2 rounded w-full" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-1">Địa chỉ nhận hàng <b
                                class="text-red-600">*</b></label>
                        <input v-model="form.shipping_address" class="border p-2 rounded w-full" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-1">Tên công ty (không bắt buộc)</label>
                        <input v-model="form.buyer_company" class="border p-2 rounded w-full" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-1">Mã số thuế công ty/Mã số thuế cá nhân<b
                                v-if="form.invoice_required" class="text-red-600">*</b></label>
                        <input v-model="form.buyer_tax_code" class="border p-2 rounded w-full"
                            :required="form.invoice_required" />
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-1">
                            Mã giảm giá
                        </label>
                        <div class="flex gap-2">
                            <input v-model="form.discount_code" class="border p-2 rounded flex-1"
                                placeholder="Nhập mã giảm giá" />
                            <button @click="applyDiscount" class="bg-black text-white px-4 py-2 rounded">
                                Áp dụng
                            </button>
                        </div>
                        <p v-if="discountMessage" class="text-sm mt-1"
                            :class="discountSuccess ? 'text-green-600' : 'text-red-500'">
                            {{ discountMessage }}
                        </p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Phương thức thanh toán <b
                                class="text-red-600">*</b></label>
                        <select v-model="form.payment_method" class="border p-2 rounded w-full">
                            <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                            <option value="BANK">Chuyển khoản</option>
                        </select>
                    </div>

                    <label class="flex items-center gap-2">
                        <input type="checkbox" v-model="form.invoice_required" />
                        Yêu cầu xuất hóa đơn VAT
                    </label>
                </div>


                <!-- Tổng cộng -->
                <div class="text-right text-sm pt-4">
                    <p class="text-gray-600">Tạm tính: {{ subtotal.toLocaleString() }}đ</p>
                    <p class="text-gray-600">Phí ship: {{ form.shipping_fee.toLocaleString() }}đ</p>
                    <p class="text-gray-600">VAT ({{ form.vat_rate }}%): {{ vatAmount.toLocaleString() }}đ</p>
                    <p class="text-gray-600">Giảm giá: {{ form.discount_amount.toLocaleString() }}đ</p>
                    <p class="text-lg font-bold">Tổng cộng: {{ totalPrice.toLocaleString() }}đ</p>
                </div>

                <!-- Nút xác nhận -->
                <div class="mt-4 text-right">
                    <button class="bg-black text-white px-6 py-2 rounded" @click="submitOrder">
                        Xác nhận đặt hàng
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive, toRefs } from 'vue'
const { public: { apiBaseUrl } } = useRuntimeConfig()

const discountMessage = ref('')
const discountSuccess = ref(false)

const props = defineProps({
    show: Boolean,
    cartItems: Array
})
const emit = defineEmits(['close', 'submit'])

const form = reactive({
    receiver_phone: '',
    receiver_email: '',
    buyer_name: '',
    buyer_company: '',
    buyer_tax_code: '',
    shipping_address: '',
    payment_method: 'COD',
    invoice_required: false,
    shipping_fee: 20000,
    vat_rate: 10,
    discount_code: '',
    discount_amount: 0,
    cartItems: props.cartItems,
    user_id: 1
})


const subtotal = computed(() =>
    props.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
)
const vatAmount = computed(() => Math.round((subtotal.value * form.vat_rate) / 100))
const totalPrice = computed(() =>
    subtotal.value + form.shipping_fee + vatAmount.value - form.discount_amount
)

const applyDiscount = async () => {
    discountMessage.value = ''
    discountSuccess.value = false
    form.discount_amount = 0

    try {
        const res = await fetch(`${apiBaseUrl}/discounts/${form.discount_code}`)
        if (!res.ok) throw new Error('Không tìm thấy mã giảm giá')

        const discount = await res.json()

        if (!discount.is_active) {
            discountMessage.value = 'Mã giảm giá không còn hiệu lực.'
            return
        }

        if (discount.quantity <= 0) {
            discountMessage.value = 'Mã giảm giá đã hết lượt sử dụng.'
            return
        }

        if (subtotal.value < discount.min_order_value) {
            discountMessage.value = `Đơn hàng cần tối thiểu ${discount.min_order_value.toLocaleString()}đ để áp dụng mã.`
            return
        }

        const now = new Date()
        const expiry = new Date(discount.expires_at)
        if (expiry < now) {
            discountMessage.value = 'Mã giảm giá đã hết hạn.'
            return
        }

        // ✅ Tính giá trị giảm
        let discountAmount = 0
        if (discount.discount_type === 'percent') {
            discountAmount = (subtotal.value * discount.discount_value) / 100
            if (discount.max_discount_value)
                discountAmount = Math.min(discountAmount, discount.max_discount_value)
        } else {
            discountAmount = discount.max_discount_value
        }

        form.discount_amount = Math.floor(discountAmount)
        discountMessage.value = `Áp dụng mã thành công! Giảm ${form.discount_amount.toLocaleString()}đ`
        discountSuccess.value = true
    } catch (err) {
        discountMessage.value = 'Không tìm thấy hoặc có lỗi khi áp dụng mã.'
        discountSuccess.value = false
    }
}


const submitOrder = () => {
    if (
        !form.buyer_name ||
        !form.receiver_email ||
        !form.receiver_phone ||
        !form.shipping_address ||
        !form.payment_method ||
        (form.invoice_required && !form.buyer_tax_code)
    ) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc.');
        return;
    }
    emit('submit', {
        ...form,
        total_price: totalPrice.value,
        total_price_before_tax: subtotal.value,
        vat_amount: vatAmount.value,
        items: props.cartItems
    })
    emit('close')
}
</script>
