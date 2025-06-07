<template>
    <div class="relative w-full h-full overflow-hidden">
        <Swiper :modules="[Autoplay, EffectFade, EffectCreative]"
                :effect="effect"
                :autoplay="{ delay: 5000 }"
                :loop="true"
                class="h-full w-full overflow-hidden">
            <SwiperSlide v-for="product in products" :key="product.id">
                <div class="relative h-full w-full">
                    <!-- Ảnh chính -->
                    <img :src="`/${product.main_image}`"
                         alt="Product"
                         class="w-full h-full object-contain" />

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
                    <div class="absolute bottom-0 w-full bg-black/60 text-white text-sm p-4 flex justify-between items-end">
                        <div>
                            <p class="text-xs">Mã sản phẩm: #{{ product.id.toString().padStart(5, '0') }}</p>
                            <p class="text-lg font-bold">{{ product.name }}</p>
                            <p class="text-xs">{{ product.description }}</p>
                            <div class="flex items-center gap-2 mt-1">
                                <p v-if="product.original_price"
                                   class="line-through text-sm text-gray-300">
                                    {{ product.original_price.toLocaleString() }} đ
                                </p>
                                <p class="text-lg font-bold text-yellow-500">
                                    {{ product.price.toLocaleString() }} đ
                                </p>
                            </div>
                        </div>
                        <div class="flex justify-center mt-3">
                            <button @click="(e) => { addToCart(product); animateAddToCart(e,product); }"
                                    class="w-full sm:w-auto px-3 py-1 text-sm flex items-center justify-center gap-1 whitespace-nowrap bg-white text-black transition">
                                <Icon name="lucide:shopping-cart" class="w-4 h-4" />
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>

                </div>
            </SwiperSlide>
        </Swiper>
        </div>
</template>

<script setup>
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import SwiperCore from 'swiper'
    import {
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
        img.src = `/${product.main_image}` // hoặc hình thumbnail sản phẩm
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
</script>
