<template>
  <div class="w-full min-h-screen bg-[#f5f5f5]">
    <!-- Carousel full width -->
    <div class="w-full sm:w-full md:w-[80vw] h-[35vh] sm:h-[60vh] md:h-[50vh] overflow-hidden relative mx-auto mt-7">

      <AppCarousel :products="carouselProducts" class="w-full h-full object-cover" />
    </div>

    <!-- Grid phía dưới -->
    <div class="px-6 py-8">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="(product, index) in visibleProducts" :key="product.id || index"
          class="relative bg-white shadow-lg overflow-hidden">
          <!-- Ảnh sản phẩm -->
          <img :src="`${product.main_image}`" class="w-full object-cover aspect-[1/1]" />

          <div class="px-3 pt-2 pb-3 text-center flex flex-col justify-between h-[120px]">
            <div>
              <p @click="openProductDetail(product)"
                class="text-sm font-medium truncate root-text cursor-pointer hover:underline">
                {{ product.name }}
              </p>
              <div class="flex flex-col items-center mt-1">
                <p v-if="product.original_price" class="line-through text-gray-400 text-xs">
                  {{ product.original_price.toLocaleString() }} đ
                </p>
                <p class="root-text font-bold text-sm">
                  {{ product.price.toLocaleString() }} đ
                </p>
              </div>
            </div>

            <!-- Nút căn đều đáy -->
            <div class="flex justify-center mt-3">
              <!-- ✅ Trường hợp 1 option hợp lệ -->
              <button v-if="getProductButtonState(product) === 'single'"
                @click="(e) => { handleAddSingleOptionToCart(product); animateAddToCart(e, product); }" class="w-full sm:w-auto px-3 py-1 text-sm flex items-center justify-center gap-1
           whitespace-nowrap root-border root-text transition">
                <Icon name="lucide:shopping-cart" class="w-4 h-4" />
                Thêm vào giỏ hàng
              </button>

              <!-- ✅ Trường hợp nhiều option -->
              <button v-else-if="getProductButtonState(product) === 'multiple'" @click="openProductDetail(product)"
                class="w-full sm:w-auto px-3 py-1 text-sm flex items-center justify-center gap-1
           whitespace-nowrap root-border root-text transition">
                <Icon name="lucide:settings" class="w-4 h-4" />
                Chọn Option
              </button>

              <!-- ❌ Trường hợp hết hàng -->
              <button v-else disabled class="w-full sm:w-auto px-3 py-1 text-sm flex items-center justify-center gap-1
           whitespace-nowrap border border-gray-300 text-gray-400 cursor-not-allowed rounded transition">
                <Icon name="lucide:x-circle" class="w-4 h-4" />
                Hết hàng
              </button>
            </div>


          </div>

        </div>
      </div>

      <!-- Loading indicator -->
      <div v-if="loading" class="text-center py-6 text-gray-500">Đang tải thêm sản phẩm...</div>
    </div>
  </div>
  <!-- Nút Lên Đầu -->
  <button v-if="showScrollTop"
    class="fixed bottom-5 right-5 z-50 bg-black text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-gray-800 transition"
    @click="scrollToTop" aria-label="Lên đầu">
    <Icon name="lucide:arrow-up" class="w-6 h-6" />
  </button>
  <ProductDetailPopup :show="showDetailPopup" :product="selectedProduct" @close="showDetailPopup = false" />
</template>

<script setup>
import ProductDetailPopup from '@/components/ProductDetailPopup.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { inject } from 'vue'

const { public: { apiBaseUrl } } = useRuntimeConfig()

const showScrollTop = ref(false)
const addToCart = inject('addToCart')

const carouselProducts = ref([])
const visibleProducts = ref([])
const loading = ref(false)
const finished = ref(false)
const limit = 8
const allProducts = ref([])

const fetchProducts = async () => {
  if (loading.value || finished.value) return
  loading.value = true

  try {
    if (allProducts.value.length === 0) {
      const res = await fetch(`${apiBaseUrl}/products`)
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
    const res = await fetch(`${apiBaseUrl}/products`)
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
  window.addEventListener('scroll', handleWindowScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleWindowScroll)
})
function handleWindowScroll() {
  showScrollTop.value = window.scrollY > window.innerHeight
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
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
