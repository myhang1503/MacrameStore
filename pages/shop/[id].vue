<template>
    <div v-if="product" class="max-w-4xl mx-auto px-4 py-10">
        <div class="flex flex-col md:flex-row gap-8">
            <img :src="product.image_url || '/images/placeholder.jpg'"
                 class="w-full md:w-1/2 rounded-xl shadow object-cover" />
            <div class="flex-1">
                <h2 class="text-3xl font-bold mb-2">{{ product.name }}</h2>
                <p class="text-gray-500 mb-4">{{ product.description }}</p>
                <p class="text-xl font-semibold text-brown-700 mb-4">{{ product.price.toLocaleString() }} đ</p>
                <button class="bg-black text-white px-6 py-2 rounded-full">Mua ngay</button>
            </div>
        </div>
    </div>
    <div v-else class="text-center py-20 text-gray-400">Đang tải sản phẩm...</div>
</template>

<script setup>
    import { useRoute } from 'vue-router'
    import { ref, onMounted } from 'vue'

    const route = useRoute()
    const product = ref(null)

    onMounted(async () => {
        const res = await fetch(`http://127.0.0.1:5000/products/${route.params.id}`)
        product.value = await res.json()
    })
</script>
