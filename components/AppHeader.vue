<template>
    <header class="sticky top-0 z-50 w-full">
        <!-- Hàng 1: Search - Logo - Cart -->
        <div class="w-full bg-[#012a4a]" style="background-size: cover; background-position: center;">
            <div class="grid grid-cols-3 items-center px-4 sm:px-6 py-3">
                <!-- Trái: Search -->
                <div class="flex items-center gap-2">
                    <OrderSearchBox :isSearching="isSearching" @update-searching="(v) => isSearching = v" />
                </div>

                <!-- Giữa: Logo -->
                <div class="flex items-center justify-center">
                    <NuxtLink to="/" class="flex items-center gap-2 font-bold text-lg text-white">

                        <span>Saturday Macrame</span>
                    </NuxtLink>
                </div>

                <!-- Phải: Cart -->
                <div class="flex justify-end relative">
                    <button @click="toggleCart"
                        class="relative w-10 h-10 flex items-center justify-center bg-white text-[#014f86] rounded transition">
                        <Icon name="lucide:shopping-cart" class="cart-icon" />
                    </button>
                    <span v-if="cartItems.length"
                        class="absolute -top-1 -right-1 text-[12px] bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {{ cartItems.length }}
                    </span>
                    <div class="relative md:hidden ml-2">
                        <button @click.stop="showMobileMenu = !showMobileMenu" aria-label="Open menu"
                            class="w-10 h-10 flex items-center justify-center bg-white text-[#014f86] rounded">
                            <Icon :name="showMobileMenu ? 'lucide:x' : 'lucide:menu'" class="w-5 h-5" />
                        </button>

                        <!-- Dropdown -->
                        <div v-if="showMobileMenu"
                            class="absolute right-0 top-full mt-2 w-56 bg-white border shadow-lg rounded p-2 z-[10000]">
                            <NuxtLink v-for="i in navItems" :key="i.to" :to="i.to"
                                class="block px-3 py-2 text-sm rounded hover:bg-gray-100"
                                @click="showMobileMenu = false">
                                {{ i.text }}
                            </NuxtLink>
                        </div>
                    </div>
                    <transition name="fade-slide">
                        <div v-if="showCart"
                            class="absolute top-full mt-2 z-[9999] p-4 sm:p-4 flex flex-col bg-white border-0 shadow-xl max-w-[95vw] w-[400px] max-h-[80vh] right-0 sm:right-2"
                            style="right: -15px">
                            <div class="flex-1 overflow-y-auto space-y-4">
                                <div v-if="!cartItems.length" class="text-gray-500">Không có sản phẩm</div>

                                <div v-for="item in cartItems" :key="item.id" class="flex items-start gap-3 pb-2">
                                    <img :src="item.main_image" class="w-16 h-16 object-cover" />
                                    <div class="flex-1">
                                        <div class="text-sm font-semibold">{{ item.name }}</div>
                                        <div class="text-base font-semibold text-orange-600">
                                            {{ item.price.toLocaleString() }}₫
                                        </div>
                                        <ul v-if="item.selectedOptions" class="text-xs text-gray-600">
                                            <li v-for="(val, key) in item.selectedOptions" :key="key">
                                                {{ key }}: {{ val }}
                                            </li>
                                        </ul>
                                        <div class="flex items-center gap-1 mt-2">
                                            <button @click="decreaseQty(item)"
                                                class="w-7 h-7 text-base bg-gray-200 rounded">−</button>
                                            <input v-model.number="item.quantity" type="number"
                                                class="w-12 text-center text-base no-spinner outline-none re" min="1" />
                                            <button @click="increaseQty(item)"
                                                class="w-7 h-7 text-base bg-gray-200 rounded">+</button>
                                        </div>
                                    </div>
                                    <button @click="removeItem(item)" class="text-red-400 text-sm">✕</button>
                                </div>
                            </div>

                            <!-- Tạm tính + nút thanh toán -->
                            <div class="pt-4 mt-4">
                                <div class="flex justify-between mb-2 text-sm font-semibold">
                                    <span>Tạm tính: <span>{{ cartQuantity }} món</span></span>
                                    <span class="text-orange-600">{{ totalPrice.toLocaleString() }}₫</span>
                                </div>
                                <button @click="showCheckout = true" class="w-full px-4 py-2 text-sm transition
                 root-bg text-white
                 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                                    :disabled="cartItems.length === 0">
                                    Thanh toán
                                </button>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
        <!-- Hàng 2: Menu -->
        <nav class="hidden md:flex bg-[#ced2d8] justify-center gap-6 text-sm font-medium text-[#012a4a]"
            style="background-size: cover;background-position: center;">
            <NuxtLink v-for="i in navItems" :key="i.to" :to="i.to === '/learn'
                        ? { path: '/learn', query: { reset: '1', t } }
                        : i.to" @click="i.to === '/learn' && (t = Date.now())">
                {{ i.text }}
            </NuxtLink>
        </nav>


    </header>
    <CheckoutPopup :show="showCheckout" :cart-items="cartItems" @close="showCheckout = false"
        @submit="handleCheckoutSubmit" />

    <div v-if="isLoading"
        class="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center text-white text-lg">
        <div class="flex flex-col items-center">
            <!-- LOGO -->
            <video src="/loading-logo.mp4" autoplay loop muted playsinline
                class="w-32 h-32 mb-4 object-contain"></video>
            <!-- TEXT -->
            <p class="text-white text-lg font-semibold mb-1">
                {{ loadingMessage }}
            </p>

            <!-- Mô tả phụ -->
            <p class="text-white text-sm" v-if="loadingStatus === 'processing'">
                Vui lòng không tắt trình duyệt hoặc làm mới trang.
            </p>

            <!-- Nút đóng -->
            <button v-if="loadingStatus !== 'processing'" @click="isLoading = false"
                class="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-100 transition">
                Đóng </button>
        </div>
    </div>


</template>


<script setup>
import { ref, inject, computed, onBeforeUnmount } from 'vue'
import CheckoutPopup from './CheckoutPopup.vue' // đảm bảo file này tồn tại
import OrderSearchBox from '~/components/OrderSearchBox.vue'

const { public: { apiBaseUrl } } = useRuntimeConfig()

const showCart = ref(false)
const cartItems = inject('cartItems', [])
const isLoading = ref(false);
const loadingStatus = ref('processing'); // 'processing', 'success', 'error'
const loadingMessage = ref('Đang xử lý đơn hàng...');
const isSearching = ref(false)          // nếu chưa có
const showMobileMenu = ref(false)
const navItems = [
    { to: '/', text: 'Cửa hàng' },
    { to: '/service', text: 'Dịch vụ' },
    { to: '/explore', text: 'Khám phá' },
    { to: '/learn', text: 'Hướng dẫn tự làm' },
    { to: '/support', text: 'Về chúng tôi' },
]
const t = ref(Date.now())

// Check out
const showCheckout = ref(false)
const handleCheckoutSubmit = (orderData) => {
    isLoading.value = true;
    fetch(`${apiBaseUrl}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    })
        .then(async res => {
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.error || "Lỗi không xác định")
            }

            loadingStatus.value = 'success';
            loadingMessage.value = "Đặt hàng thành công. Vui lòng kiểm tra email để theo dõi đơn hàng";


            localStorage.removeItem('cart')
            clearCart()
            showCart.value = false
            showCheckout.value = false
        })
        .catch(err => {
            loadingStatus.value = 'error';
            loadingMessage.value = 'Lỗi khi đặt hàng: ' + err.message;
        })
}
function toggleCart() {
    showCart.value = !showCart.value
}

function increaseQty(item) {
    item.quantity++
}

function decreaseQty(item) {
    if (item.quantity > 1) {
        item.quantity--
    } else {
        removeItem(item)
    }
}

function removeItem(item) {
    const index = cartItems.indexOf(item)
    if (index !== -1) cartItems.splice(index, 1)
}
function clearCart() {
    cartItems.splice(0, cartItems.length)
    localStorage.removeItem('cart') // nếu bạn có lưu giỏ hàng vào localStorage
}

const totalPrice = computed(() =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
)
const cartQuantity = computed(() =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0)
)


onMounted(() => {
    const handler = (e) => { showMobileMenu.value = false }
    document.addEventListener('click', handler)
    onBeforeUnmount(() => document.removeEventListener('click', handler))
})
</script>
<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
