<template>
    <Swiper :modules="[Autoplay, EffectFade, EffectCreative]"
            :effect="effect"
            :autoplay="{ delay: 5000 }"
            :loop="true"
            class="h-full w-full rounded-r-2xl overflow-hidden">
        <SwiperSlide v-for="product in products" :key="product.id">
            <div class="relative h-full w-full">
                <!-- Ảnh chính -->
                <img :src="`/${product.main_image}`"
                     alt="Product"
                     class="w-full h-full object-cover" />

                <!-- Badge góc trên trái -->
                <div class="absolute top-3 left-3 flex flex-col gap-2 z-10">
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
                </div>

                <!-- Thông tin góc dưới -->
                <div class="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 text-sm">
                    <p class="text-xs opacity-70">
                        Mã sản phẩm: #{{ product.id.toString().padStart(5, "0") }}
                    </p>
                    <h3 class="font-semibold text-lg">{{ product.name }}</h3>
                    <p class="text-xs line-clamp-2">{{ product.description }}</p>
                    <div class="flex items-center gap-2 mt-1">
                        <p v-if="product.original_price"
                           class="line-through text-sm text-gray-300">
                            {{ product.original_price.toLocaleString() }} đ
                        </p>
                        <p class="text-lg font-bold text-yellow-300">
                            {{ product.price.toLocaleString() }} đ
                        </p>
                    </div>
                </div>
            </div>
        </SwiperSlide>
    </Swiper>
</template>

<script setup>
    import { Swiper, SwiperSlide } from "swiper/vue";
    import { Autoplay, EffectFade, EffectCreative } from "swiper/modules";
    import "swiper/css";
    import "swiper/css/effect-fade";
    import "swiper/css/effect-creative";

    const props = defineProps({
        products: Array
    });

    const effects = ["fade", "creative"];
    const effect = effects[Math.floor(Math.random() * effects.length)];

    const salePercent = (p) => {
        if (!p.original_price || !p.discount_price) return "";
        const percent = 100 - (p.discount_price / p.original_price) * 100;
        return `- ${Math.round(percent)}%`;
    };
</script>
