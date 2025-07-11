﻿<template>
    <div class="relative w-full h-full overflow-hidden">
        <Swiper :modules="[Navigation, Pagination, Autoplay]" :slides-per-view="3" :centered-slides="true"
            :space-between="30" :loop="true" :autoplay="{ delay: 4000 }" :breakpoints="{
            0: { slidesPerView: 1 },       // Mobile: 1 item full width
            640: { slidesPerView: 1 },   // Tablet dọc: gần 1 item
            768: { slidesPerView: 1.5 },     // Tablet ngang
            1024: { slidesPerView: 3 }     // PC: 3 item
        }" navigation pagination class="h-full w-full overflow-hidden">

            <SwiperSlide v-for="product in products" :key="product.id">
                <div class="relative w-full h-full overflow-hidden">
                    <!-- Ảnh chính -->
                    <img :src="`${product.main_image}`" alt="Product"
                        class="sm:h-full sm:w-full md:object-cover sm:object-container" />

                    <!-- Badge góc trên trái -->
                    <!--<div class="absolute top-3 left-3 flex flex-col gap-2 z-10">
                        <span v-if="product.is_new"
                              class="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                            🆕 New
                        </span>
                        <span v-if="product.is_sale_off"
                              class="bg-red-600 text-white text-xs px-2 py-1 rounded">
                            🏷️ Sale {{ salePercent(product) }}
                        </span>
                        <span v-if="product.is_hot"
                              class="bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                            🔥 Hot
                        </span>
                    </div>-->
                    <!-- Thông tin góc dưới -->
                    <!-- Info bottom -->

                    <div class="absolute bottom-0 w-full bg-black/60 text-white text-sm p-4 flex flex-col gap-2">
                        <!-- Mã sản phẩm -->
                        <p class="text-xs">Mã sản phẩm: #{{ product.id.toString().padStart(5, '0') }}</p>

                        <!-- Tên sản phẩm -->
                        <p @click="openProductDetail(product)"
                            class="text-base sm:text-lg font-bold break-words truncate cursor-pointer hover:underline">
                            {{ product.name }}</p>

                        <!-- Mô tả -->
                        <p class="text-xs whitespace-normal break-words">{{ product.description }}</p>

                        <!-- Giá + Nút -->
                        <div class="flex items-center justify-between mt-1">
                            <div class="flex items-center gap-2">
                                <p v-if="product.original_price" class="line-through text-sm text-gray-300">
                                    {{ product.original_price.toLocaleString() }} đ
                                </p>
                                <p class="text-lg font-bold text-yellow-500">
                                    {{ product.price.toLocaleString() }} đ
                                </p>
                            </div>
                            <!-- Nếu CÓ option -->
                            <div class="flex justify-center mt-3">
                                <button v-if="getProductButtonState(product) === 'single'"
                                    @click="(e) => { handleAddSingleOptionToCart(product); animateAddToCart(e, product); }"
                                    class="px-3 py-1 text-sm flex items-center gap-1 whitespace-nowrap bg-white text-black transition">
                                    <Icon name="lucide:shopping-cart" class="w-4 h-4" />
                                    Thêm vào giỏ hàng
                                </button>

                                <button v-else-if="getProductButtonState(product) === 'multiple'"
                                    @click="openProductDetail(product)"
                                    class="px-3 py-1 text-sm flex items-center gap-1 whitespace-nowrap bg-white text-black transition">
                                    <Icon name="lucide:settings" class="w-4 h-4" />
                                    Chọn Option
                                </button>

                                <button v-else disabled
                                    class="px-3 py-1 text-sm flex items-center gap-1 whitespace-nowrap bg-gray text-white transition">
                                    <Icon name="lucide:x-circle" class="w-4 h-4" />
                                    Hết hàng
                                </button>
                            </div>


                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
    <ProductDetailPopup :show="showDetailPopup" :product="selectedProduct" @close="showDetailPopup = false" />
</template>

<script setup>
import ProductDetailPopup from '@/components/ProductDetailPopup.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore from 'swiper'
import {
    Navigation, Pagination,
    Autoplay,
    EffectFade,
    EffectCube,
    EffectCards,
    EffectCreative
} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/effect-cube'
import 'swiper/css/effect-cards'
import 'swiper/css/effect-creative'

SwiperCore.use([Autoplay, EffectFade, EffectCube, EffectCards, EffectCreative])

const props = defineProps({
    products: Array
})

const addToCart = inject('addToCart')

const effects = ['fade', 'cube', 'cards', 'creative']
const randomEffect = effects[Math.floor(Math.random() * effects.length)]

const salePercent = (p) => {
    if (!p.original_price || !p.discount_price) return "";
    const percent = 100 - (p.discount_price / p.original_price) * 100;
    return `- ${Math.round(percent)}%`;
};

function animateAddToCart(event, product) {
    const button = event.currentTarget
    const cartIcon = document.querySelector('.cart-icon')

    if (!cartIcon) return

    const img = document.createElement('img')
    img.src = `${product.main_image}` // hoặc hình thumbnail sản phẩm
    img.className = 'flying-image'
    img.style.position = 'fixed'
    img.style.width = '100px'
    img.style.zIndex = 1000

    // Lấy vị trí bắt đầu
    const rectStart = button.getBoundingClientRect()
    img.style.left = rectStart.left + 'px'
    img.style.top = rectStart.top + 'px'

    document.body.appendChild(img)

    const rectEnd = cartIcon.getBoundingClientRect()

    // Animate
    img.animate([
        { transform: `translate(0, 0)` },
        { transform: `translate(${rectEnd.left - rectStart.left}px, ${rectEnd.top - rectStart.top}px) scale(0.2)` }
    ], {
        duration: 600,
        easing: 'ease-in-out'
    }).onfinish = () => {
        img.remove()
    }
}

const selectedProduct = ref(null)
const showDetailPopup = ref(false)

const openProductDetail = (product) => {
    selectedProduct.value = product
    showDetailPopup.value = true
}

function getProductButtonState(product) {
    const variants = product.variants || []

    const available = variants.filter(v => Number(v.quantity) > 0)

    if (available.length === 0) return 'out_of_stock'
    if (available.length === 1) return 'single'
    return 'multiple'
}

function handleAddSingleOptionToCart(product) {
    const validVariants = product.variants?.filter(v => Number(v.quantity) > 0) || []

    if (validVariants.length === 1) {
        const rawOptions = validVariants[0].options || []

        // ✅ Convert từ array → object { Size: "M", Color: "Red" }
        const selectedOptions = {}
        for (const opt of rawOptions) {
            if (opt.label && opt.value) {
                selectedOptions[opt.label] = opt.value
            }
        }

        const item = {
            ...product,
            quantity: 1,
            selectedOptions // ✅ đúng format để hiển thị bằng `key: val`
        }

        addToCart(item)

    }
}


</script>
