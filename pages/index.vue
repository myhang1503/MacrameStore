<template>
    <div class="w-full min-h-screen bg-[#f5f5f5]">
        <!-- Carousel full width -->
        <div class="w-full sm:w-full md:w-[75vw] h-[50vh] overflow-hidden relative mx-auto mt-7">
            <AppCarousel :products="carouselProducts" class="w-full h-full object-cover" />
        </div>

        <!-- Grid phía dưới -->
        <div class="px-6 py-8">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div v-for="(product, index) in visibleProducts"
                     :key="product.id || index"
                     class="relative bg-white shadow-lg overflow-hidden">
                    <!-- Ảnh sản phẩm -->
                    <img :src="`/${product.main_image}`"
                         class="w-full object-cover aspect-[1/1]" />

                    <div class="px-3 pt-2 pb-3 text-center flex flex-col justify-between h-[120px]">
                        <div>
                            <p class="text-sm font-medium truncate">{{ product.name }}</p>
                            <div class="flex flex-col items-center mt-1">
                                <p v-if="product.original_price" class="line-through text-gray-400 text-xs">
                                    {{ product.original_price.toLocaleString() }} đ
                                </p>
                                <p class="text-orange-500 font-bold text-sm">
                                    {{ product.price.toLocaleString() }} đ
                                </p>
                            </div>
                        </div>

                        <!-- Nút căn đều đáy -->
                        <div class="flex justify-center mt-3">
                            <button @click="(e) => { addToCart(product); animateAddToCart(e,product); }"
                                    class="w-full sm:w-auto px-3 py-1 text-sm flex items-center justify-center gap-1
                                          whitespace-nowrap
                                          border border-orange-500 text-orange-500
                                          hover:bg-orange-500 hover:text-white transition">
                                <Icon name="lucide:shopping-cart" class="w-4 h-4" />
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Loading indicator -->
            <div v-if="loading" class="text-center py-6 text-gray-500">Đang tải thêm sản phẩm...</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { inject } from 'vue'

const addToCart = inject('addToCart')

const carouselProducts = ref([])
const visibleProducts = ref([])
const currentPage = ref(1)
const loading = ref(false)
const finished = ref(false)
const limit = 8
const allProducts = ref([])

const fetchProducts = async () => {
  if (loading.value || finished.value) return
  loading.value = true

  try {
    if (allProducts.value.length === 0) {
        const res = await fetch('http://127.0.0.1:5000/products')
      if (!res.ok) throw new Error('Lỗi khi tải sản phẩm')
      allProducts.value = await res.json()
    }

    const next = allProducts.value.slice(
      visibleProducts.value.length,
      visibleProducts.value.length + limit
    )

    visibleProducts.value.push(...next)
    if (next.length < limit) finished.value = true
  } catch (err) {
    console.error('Lỗi khi tải sản phẩm:', err)
  } finally {
    loading.value = false
  }
}

const fetchCarouselProducts = async () => {
  try {
    const res = await fetch('http://127.0.0.1:5000/products')
    if (!res.ok) throw new Error('Lỗi khi tải carousel')
    const data = await res.json()
    carouselProducts.value = data.filter(p => p.show_in_carousel === true)
  } catch (err) {
    console.error('Lỗi khi tải carousel:', err)
  }
}

const handleScroll = () => {
  const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
  if (bottom) fetchProducts()
}

onMounted(() => {
  fetchCarouselProducts()
  fetchProducts()
  window.addEventListener('scroll', handleScroll)
})


function getBadges(p) {
  const isNew = p.is_new
  const isHot = p.is_hot
  const isSale = p.is_sale_off

  if (isNew && isSale) return [badgeNew(), badgeSale()]
  if (isNew && isHot) return [badgeNew(), badgeHot()]
  if (isHot && isSale) return [badgeHot(), badgeSale()]
  if (isNew) return [badgeNew()]
  if (isHot) return [badgeHot()]
  if (isSale) return [badgeSale()]
  return []
}

function badgeNew() {
  return {
    label: 'New',
    icon: '🆕',
    class: 'bg-blue-500'
  }
}
function badgeHot() {
  return {
    label: 'Hot',
    icon: '🔥',
    class: 'bg-yellow-500'
  }
}
function badgeSale() {
  return {
    label: 'Sale',
    icon: '💸',
    class: 'bg-red-500'
  }
}
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
