<template>
    <!-- Overlay nền mờ + hỗ trợ scroll -->
    <div v-if="show && product" class="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm overflow-auto">
        <div class="bg-white w-full max-w-5xl mx-auto my-10 shadow-xl overflow-hidden flex flex-col">
            <!-- Close button -->
            <div class="flex justify-end p-2">
                <button @click="$emit('close')"
                    class="text-white bg-orange-500 hover:bg-orange-600 w-6 h-6 flex items-center justify-center">
                    ✕
                </button>
            </div>

            <!-- Content -->
            <div class="flex flex-col md:flex-row p-4 gap-4 shrink-0 flex-1 overflow-hidden">
                <!-- Left: Image + carousel -->
                <div class="flex flex-col items-center md:w-[400px] relative">
                    <img :src="selectedImage || product.main_image" alt="Main Image"
                        class="w-full h-auto object-cover max-h-[50vh] md:max-h-full" />

                    <div class="flex gap-2 mt-2 overflow-x-auto">
                        <img v-for="(img, index) in product.detail_images" :key="index" :src="img" alt="Detail"
                            class="w-20 h-20 object-cover border cursor-pointer" @mouseenter="hoveredImage = img"
                            @mouseleave="hoveredImage = null" @click="isMobile() && (selectedImage = img)" />
                    </div>

                    <!-- Option Plus hiển thị ở PC -->
                    <div v-if="product.option_plus?.length" class="hidden md:block w-full mt-4">
                        <div v-for="group in product.option_plus" :key="group.type" class="mb-4">
                            <p class="font-semibold text-sm mb-1 root-text">{{ group.type }}</p>
                            <div class="flex flex-wrap gap-2">
                                <label v-for="opt in group.options" :key="opt"
                                    class="px-4 py-1 border text-sm text-center cursor-pointer transition select-none"
                                    :class="{
                                                'root-bg text-white border-black': selectedOptions[group.type] === opt,
                                                'bg-white root-text root-border': selectedOptions[group.type] !== opt,
                                                'opacity-40 pointer-events-none': !isOptionAvailable(group.type, opt)
                                            }">
                                    <input type="radio" class="hidden" :name="group.type" :value="opt"
                                        v-model="selectedOptions[group.type]"
                                        :disabled="!isOptionAvailable(group.type, opt)" />
                                    {{ opt }}
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Hover preview (PC only) -->
                    <div v-if="hoveredImage"
                        class="hidden md:block absolute top-0 left-full ml-4 w-[500px] z-20 border shadow-xl bg-white">
                        <img :src="hoveredImage" alt="Preview" class="w-full h-auto object-contain" />
                    </div>
                </div>

                <!-- Right: Info + scrollable body -->
                <div class="flex-1 flex flex-col overflow-hidden">
                    <div>
                        <p class="text-lg font-medium mb-2">{{ product.name }}</p>
                        <p class="text-sm root-text">{{ product.description }}</p>
                    </div>

                    <!-- Option Plus hiển thị ở mobile -->
                    <div v-if="product.option_plus?.length" class="block md:hidden mb-3">
                        <div v-for="group in product.option_plus" :key="group.type" class="mb-4">
                            <p class="font-semibold text-sm mb-1 root-text">{{ group.type }}</p>
                            <div class="flex flex-wrap gap-2">
                                <label v-for="opt in group.options" :key="opt"
                                    class="px-4 py-1 border text-sm text-center cursor-pointer transition select-none"
                                    :class="{
                                                'root-bg text-white root-border': selectedOptions[group.type] === opt,
                                                'bg-white root-text root-border': selectedOptions[group.type] !== opt,
                                                'opacity-40 pointer-events-none': !isOptionAvailable(group.type, opt)
                                            }">
                                    <input type="radio" class="hidden" :name="group.type" :value="opt"
                                        v-model="selectedOptions[group.type]"
                                        :disabled="!isOptionAvailable(group.type, opt)" />testtestest
                                    {{ opt }}
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Price + Add to Cart -->
                    <div class="flex justify-between items-center mt-4 pt-3">
                        <p class="text-lg font-medium root-text">{{ product.price.toLocaleString() }}đ</p>

                        <button :disabled="isOutOfStock" @click="handleAddToCart" 
                        :class="[
                                    'px-4 py-2 text-sm flex items-center justify-center gap-1',
                                    isOutOfStock ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'root-border-orange root-text-orange'
                                ]" >
                            <Icon name="lucide:shopping-cart" class="w-4 h-4 inline-block" />
                            Thêm vào giỏ hàng
                        </button>
                    </div>

                    <!-- Detail Description -->
                    <div class="mt-2 root-text whitespace-pre-line pt-2 max-h-[40vh] overflow-y-auto pr-2 border-t">
                        <p class="font-medium mb-2">Chi tiết sản phẩm</p>
                        <p class="text-sm">{{ product.detail_description }}</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div v-if="selectedImage && isMobile()" class="fixed inset-0 z-40" @click="selectedImage = null">
    </div>

</template>

<script setup>
import { ref, computed, inject, watch } from 'vue'

const emit = defineEmits(['close']);
const quantity = ref(1);
const hoveredImage = ref(null);
const selectedImage = ref(null)
const selectedOptions = ref([])
const isMobile = () => window.innerWidth < 768

const addToCart = inject('addToCart')


const props = defineProps({
    product: Object,
    show: Boolean
});

const isOutOfStock = computed(() => {
    if (!props.product || !props.product.variants) return true
    return !props.product.variants.some(v => Number(v.quantity) > 0)
})

watch(() => props.product, (newProduct) => {
    if (newProduct?.option_plus?.length) {
        selectedOptions.value = {}
        for (const group of newProduct.option_plus) {
            selectedOptions.value[group.type] = group.options[0]
        }
    }
}, { immediate: true })


const handleAddToCart = () => {
    const item = {
        ...props.product,
        selectedOptions: selectedOptions.value
    }
    addToCart(item)
    emit('close')
}

const isOptionAvailable = (label, value) => {
    return props.product?.variants?.some(variant =>
        variant.quantity > 0 &&
        variant.options.some(o => o.label === label && o.value === value)
    )
}


</script>

<style scoped>
@media (max-width: 768px) {
    .max-w-6xl {
        width: 100vw !important;
        height: 100vh !important;
        border-radius: 0 !important;
    }

    button.absolute {
        top: 0.5rem;
        right: 0.5rem;
    }
}
</style>