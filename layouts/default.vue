<template>
    <div class="min-h-screen w-full bg-[#dcd2c8] flex flex-col">
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
        const existing = cartItems.find(item => item.id === product.id)
        if (existing) {
            existing.quantity++ // Nếu đã có thì tăng số lượng
        } else {
            cartItems.push({ ...product, quantity: 1 }) // Mặc định quantity = 1
        }
    }

    provide('cartItems', cartItems)
    provide('addToCart', addToCart)
</script>