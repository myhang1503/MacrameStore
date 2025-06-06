<template>
    <div class="flex-1 flex items-center justify-center">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-6xl flex overflow-hidden">
            <!-- Left content -->
            <div class="w-1/2 p-6 flex flex-col">
                <div class="grid grid-cols-4 gap-4 mb-4">
                    <div v-for="product in visibleProducts"
                         :key="product.id"
                         class="bg-white rounded shadow p-2 flex flex-col items-center text-center">
                        <img :src="`/${product.main_image}`" class="h-20 object-contain mb-2" />
                        <p class="text-xs font-semibold truncate">{{ product.name }}</p>
                        <p class="text-xs text-gray-500">{{ product.price.toLocaleString() }} đ</p>
                    </div>
                </div>
                <button @click="nextGroup"
                        class="self-end bg-black text-white px-4 py-1 rounded text-sm hover:bg-gray-800">
                    Next →
                </button>
            </div>

            <!-- Right image -->
            <div class="w-1/2 h-full">
                <AppCarousel :products="products" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import AppCarousel from "~/components/AppCarousel.vue";
    import { ref, onMounted } from "vue";

    const products = ref([]);
    const visibleProducts = ref([]);
    const currentGroup = ref(0);
    const groupSize = 8; // 2 dòng x 4 cột

    onMounted(async () => {
        const res = await fetch("http://127.0.0.1:5000/products");
        const all = await res.json();
        products.value = all;
        updateVisibleProducts();
    });

    const updateVisibleProducts = () => {
        const start = currentGroup.value * groupSize;
        visibleProducts.value = products.value.slice(start, start + groupSize);
    };

    const nextGroup = () => {
        const total = Math.ceil(products.value.length / groupSize);
        currentGroup.value = (currentGroup.value + 1) % total;
        updateVisibleProducts();
    };
</script>