<template>
    <div class="max-w-6xl mx-auto px-4 py-10">
        <h2 class="text-3xl font-bold mb-6 text-center">🧵 Macrame Shop</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div v-for="product in products"
                 :key="product.id"
                 class="bg-white rounded-xl shadow hover:shadow-lg transition">
                <img :src="product.image_url || '/images/placeholder.jpg'"
                     alt="Product"
                     class="w-full h-48 object-cover rounded-t-xl" />
                <div class="p-4 flex flex-col justify-between h-[140px]">
                    <div>
                        <h3 class="font-semibold text-lg text-gray-800 truncate">{{ product.name }}</h3>
                        <p class="text-gray-500">{{ product.price.toLocaleString() }} đ</p>
                    </div>
                    <NuxtLink :to="`/shop/${product.id}`"
                              class="mt-4 inline-block bg-black text-white px-4 py-2 rounded-full text-sm text-center">
                        Xem chi tiết
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    const products = ref([])

    onMounted(async () => {
        const res = await fetch('http://127.0.0.1:5000/products')
        products.value = await res.json()
    })
</script>
