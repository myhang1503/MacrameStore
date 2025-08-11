<template>
    <div class="min-h-screen w-full bg-[#fff7ef] flex flex-col">
        <!-- Header nằm trong khối trắng -->
        <AppHeader />

        <!-- Nội dung chính -->
        <div class="flex-1 flex items-center justify-center">
            <slot />
        </div>

        <!-- Footer nằm trong khối trắng -->
        <AppFooter />
    </div>
</template>

<script setup>

import { reactive, provide, onMounted, watch } from 'vue'
import AppHeader from '~/components/AppHeader.vue'

const cartItems = reactive([])
// 🔹 1. Load từ localStorage khi khởi động
onMounted(() => {
    const saved = localStorage.getItem('cartItems')
    if (saved) {
        try {
            const parsed = JSON.parse(saved)
            if (Array.isArray(parsed)) {
                cartItems.splice(0, cartItems.length, ...parsed)
            }
        } catch (e) {
            console.error('Lỗi khi đọc giỏ hàng:', e)
        }
    }
})
// 🔹 2. Mỗi lần thay đổi cartItems ➜ lưu lại
watch(cartItems, () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}, { deep: true })

// 🔹 3. Hàm thêm vào giỏ

function addToCart(product) {
    const normalizeOptions = (options) => {
        const sorted = Object.keys(options || {}).sort().reduce((obj, key) => {
            obj[key] = options[key];
            return obj;
        }, {});
        return JSON.stringify(sorted);
    };

    const optionKey = normalizeOptions(product.selectedOptions);

    const existing = cartItems.find(item =>
        item.id === product.id &&
        normalizeOptions(item.selectedOptions) === optionKey
    );

    if (existing) {
        existing.quantity++;
    } else {
        // Clone sâu selectedOptions để Vue nhận diện khác biệt
        const clonedOptions = JSON.parse(JSON.stringify(product.selectedOptions || {}));
        cartItems.push({
            ...product,
            selectedOptions: clonedOptions,
            quantity: 1
        });
    }
}

provide('cartItems', cartItems)
provide('addToCart', addToCart)

</script>