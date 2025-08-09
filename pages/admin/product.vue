<template>
    <div class="p-6">
        <div class="flex justify-between items-center mb-4">
            <!-- Tìm kiếm -->
            <input v-model="searchQuery" type="text" placeholder="Tìm kiếm sản phẩm..."
                class="border px-4 py-2 rounded w-1/2" />

            <!-- Nút thêm sản phẩm -->

            <button @click="showAdd = true" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                ➕ Thêm sản phẩm
            </button>
        </div>

        <!-- Bảng sản phẩm -->
        <table class="w-full table-auto border text-sm">
            <thead class="bg-gray-100">
                <tr>
                    <th class="w-[5%] px-2 py-2 text-left">#</th>
                    <th class="w-[30%] px-2 py-2 text-left">Tên sản phẩm</th>
                    <th class="w-[20%] px-2 py-2 text-center">Hình ảnh</th>
                    <th class="w-[10%]">Trạng thái</th>
                    <th class="w-[25%] px-2 py-2 text-center">Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in paginatedProducts" :key="product.id" class="border-t">
                    <td class="px-2 py-1">{{ product.id }}</td>
                    <td class="px-2 py-1">{{ product.name }}</td>
                    <td class="px-2 py-1 text-center">
                        <img :src="product.main_image" alt="main image" class="w-20 h-20 object-contain mx-auto" />
                    </td>
                    <td class="text-center">
                        <span :class="product.status === 'draft' ? 'text-red-500 font-bold' : 'text-green-600'">
                            {{ product.status }}
                        </span>
                    </td>
                    <td class="text-center space-x-1">
                        <button class="px-2 py-1 rounded-full bg-blue-100 text-blue-600 text-sm hover:bg-blue-200"
                            @click="openProductDetail(product)">Chi tiết</button>
                        <button class="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm hover:bg-yellow-200"
                            @click="editProduct(product.id)">Sửa</button>
                        <button class="px-2 py-1 rounded-full bg-red-100 text-red-600 text-sm hover:bg-red-200"
                            @click="deleteProduct(product.id)">Xoá</button>
                    </td>

                </tr>
            </tbody>
        </table>

        <!-- Phân trang -->
        <div class="flex justify-end mt-4 gap-2">
            <button v-for="page in totalPages" :key="page" @click="currentPage = page"
                class="px-3 py-1 border rounded hover:bg-gray-200"
                :class="{ 'bg-blue-500 text-white': page === currentPage }">
                {{ page }}
            </button>
        </div>
    </div>
    <AddProductModal :show="showAdd" @close="showAdd = false" @submitted="fetchProducts" />
    <ProductDetailPopup :show="showDetailPopup" :product="selectedProduct" @close="showDetailPopup = false" />
    <EditProductModal :show="showEdit" :productId="selectedProductId" @close="showEdit = false"
        @updated="fetchProducts" />



</template>
<script setup>
definePageMeta({
    layout: 'admin'
})

import { ref, computed, onMounted } from 'vue'
import AddProductModal from '@/components/admin/AddProductModal.vue'
import ProductDetailPopup from '@/components/ProductDetailPopup.vue'
import EditProductModal from '@/components/admin/EditProductModal.vue'

const { public: { apiBaseUrl } } = useRuntimeConfig()

const selectedProduct = ref(null)
const showDetailPopup = ref(false)

const showEdit = ref(false)
const selectedProductId = ref(null)

const allProducts = ref([])
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = 10

const paginatedProducts = computed(() => {
    const filtered = allProducts.value.filter(p =>
        p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    const start = (currentPage.value - 1) * pageSize
    return filtered.slice(start, start + pageSize)
})

const totalPages = computed(() => {
    return Math.ceil(
        allProducts.value.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase())).length / pageSize
    )
})

const fetchProducts = async () => {
    const res = await fetch(`${apiBaseUrl}/showAllproducts`)
    allProducts.value = await res.json()
}

const showAdd = ref(false)

const viewDetail = (product) => {
    // TODO: Mở popup chi tiết
}

const editProduct = (id) => {
    selectedProductId.value = id
    showEdit.value = true
}

const deleteProduct = async (id) => {
    if (confirm('Xác nhận xoá sản phẩm?')) {
        await $fetch(`${apiBaseUrl}/products/${id}`, {
            method: "PUT",
            body: {
                status: "deleted",
            }
        })
        fetchProducts()
    }
}

const openProductDetail = (product) => {
    selectedProduct.value = product
    showDetailPopup.value = true
}


onMounted(fetchProducts)
</script>
