<template>
    <header class="sticky top-0 z-50 w-full px-6 py-3 flex items-center justify-between bg-[#dcd2c8]">
        <!-- Bên trái: Logo + Menu -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 p-2">
            <NuxtLink to="/" class="flex items-center gap-2 font-bold text-lg">
                <Icon name="mdi:alpha-m-box" class="text-2xl" />
                Hằng Phạm Macrame
            </NuxtLink>
            <span class="text-sm text-gray-500 sm:ml-2">Handcrafted with love, inspired by nature</span>

            <!--<nav class="flex gap-4 text-sm font-medium text-gray-600">
                <NuxtLink to="/learn" class="hover:text-black">Learn</NuxtLink>
                <NuxtLink to="/shop" class="hover:text-black">Shop</NuxtLink>
                <NuxtLink to="/explore" class="hover:text-black">Explore</NuxtLink>
                <NuxtLink to="/support" class="hover:text-black">Support</NuxtLink>
            </nav>-->
        </div>

        <!-- Bên phải: Sign In + Cart -->
        <div class="flex items-center gap-4">
            <div class="mt-2 sm:mt-0 sm:ml-auto relative">
                <button @click="toggleCart" class="relative gap-2 w-10 h-8 flex items-center justify-center bg-orange-500 text-white hover:bg-orange-600 transition">
                    <Icon name="lucide:shopping-cart" class="w-6 h-6 cart-icon" />
                </button>
                <span v-if="cartItems.length > 0" class="absolute -top-1 -right-1 text-[10px] bg-white text-orange-600 rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {{ cartItems.length }}
                </span>

                <!-- Popup 1 cột duy nhất -->
                <transition name="fade-slide">
                    <div v-if="showCart"
                         class="absolute top-full mt-2 z-[9999] p-4 sm:p-4 flex flex-col bg-white border-0 shadow-xl max-w-[95vw] w-[400px] max-h-[80vh] right-0 sm:right-2" style="right: -15px">
                        <div class="flex-1 overflow-y-auto space-y-4">
                            <div v-if="!cartItems.length" class="text-gray-500">Không có sản phẩm</div>

                            <div v-for="item in cartItems"
                                 :key="item.id"
                                 class="flex items-start gap-3 pb-2">
                                <img :src="item.main_image" class="w-16 h-16 object-cover" />
                                <div class="flex-1">
                                    <div class="text-sm font-semibold">{{ item.name }}</div>
                                    <div class="text-base font-semibold text-orange-600">
                                        {{ item.price.toLocaleString() }}₫
                                    </div>
                                    <div class="flex items-center gap-1 mt-2">
                                        <button @click="decreaseQty(item)" class="w-7 h-7 text-base bg-gray-200 rounded">−</button>
                                        <input v-model.number="item.quantity"
                                               type="number"
                                               class="w-12 text-center text-base no-spinner outline-none re"
                                               min="1" />
                                        <button @click="increaseQty(item)" class="w-7 h-7 text-base bg-gray-200 rounded">+</button>
                                    </div>
                                </div>
                                <button @click="removeItem(item)" class="text-red-400 hover:text-red-600 text-sm">✕</button>
                            </div>
                        </div>

                        <!-- Tạm tính + nút thanh toán -->
                        <div class="pt-4 mt-4">
                            <div class="flex justify-between mb-2 text-sm font-semibold">
                                <span>Tạm tính: <span>{{ cartQuantity }} món</span></span>
                                <span class="text-orange-600">{{ totalPrice.toLocaleString() }}₫</span>
                            </div>
                            <button class="w-full px-4 py-2 text-sm transition
                 bg-orange-500 text-white hover:bg-orange-600
                 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                                    :disabled="cartItems.length === 0">
                                Thanh toán
                            </button>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </header>
</template>

<script setup>
    import { ref, inject, computed } from 'vue'

    const showCart = ref(false)
    const cartItems = inject('cartItems', [])

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


    const totalPrice = computed(() =>
        cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    )
    const cartQuantity = computed(() =>
        cartItems.reduce((sum, item) => sum + item.quantity, 0)
    )
</script>
<style scoped>
    .fade-slide-enter-active, .fade-slide-leave-active {
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
