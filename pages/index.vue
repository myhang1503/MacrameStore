<template>
  <div class="w-full min-h-screen bg-[#f5f5f5]">
    <!-- Carousel (chỉ từ type Sản phẩm, ẩn khi đang search) -->
    <div v-if="carouselProducts.length"
      class="w-full sm:w-full md:w-[80vw] h-[35vh] sm:h-[60vh] md:h-[50vh] overflow-hidden relative mx-auto mt-7">
      <AppCarousel :products="carouselProducts" class="w-full h-full object-cover" />
    </div>

    <!-- ===== SẢN PHẨM ===== -->
    <div class="px-6 py-8">
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold root-text inline-block relative pb-2
                 after:content-[''] after:block after:w-20 after:h-[3px] after:bg-gray-400 after:mx-auto after:mt-2">
          Sản phẩm
        </h2>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="(product, index) in visibleProducts" :key="product.id || 'p-' + index"
          class="relative bg-white shadow-lg overflow-hidden">
          <img :src="resolveImg(product.main_image)" class="w-full object-cover aspect-[1/1]" />
          <div class="px-3 pt-2 pb-3 text-center flex flex-col justify-between h-[120px]">
            <div>
              <p @click="openProductDetail(product)"
                class="text-sm font-medium truncate root-text cursor-pointer hover:underline">
                {{ product.name }}
              </p>
              <div class="flex flex-col items-center mt-1">
                <p v-if="product.discount_price > 0 && product.original_price"
                  class="line-through text-gray-400 text-xs">
                  {{ Number(product.original_price).toLocaleString() }} đ
                </p>
                <p class="root-text font-bold text-sm">
                  {{ Number(product.price).toLocaleString() }} đ
                </p>
              </div>
            </div>
            <div class="flex justify-center mt-3">
              <button v-if="getProductButtonState(product) === 'single'"
                @click="(e) => { handleAddSingleOptionToCart(product); animateAddToCart(e, product); }"
                class="w-full sm:w-auto px-3 py-1 text-sm flex items-center justify-center gap-1 whitespace-nowrap root-border root-text transition">
                <Icon name="lucide:shopping-cart" class="w-4 h-4" /> Thêm vào giỏ hàng
              </button>
              <button v-else-if="getProductButtonState(product) === 'multiple'" @click="openProductDetail(product)"
                class="w-full sm:w-auto px-3 py-1 text-sm flex items-center justify-center gap-1 whitespace-nowrap root-border root-text transition">
                <Icon name="lucide:settings" class="w-4 h-4" /> Chọn Option
              </button>
              <button v-else disabled
                class="w-full sm:w-auto px-3 py-1 text-sm flex items-center justify-center gap-1 whitespace-nowrap border border-gray-300 text-gray-400 cursor-not-allowed rounded transition">
                <Icon name="lucide:x-circle" class="w-4 h-4" /> Hết hàng
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!loadingProducts && allProducts.length === 0" class="text-center py-6 text-gray-500">
        Chưa có sản phẩm thuộc loại "{{ PRODUCT_TYPE }}"
      </div>
      <div class="text-center py-6" v-if="!finishedProducts && allProducts.length > 0">
        <button @click="loadMoreProducts" :disabled="loadingProducts"
          class="px-4 py-2 text-sm root-border root-text rounded transition disabled:opacity-50">
          {{ loadingProducts ? 'Đang tải...' : 'Xem thêm' }}
        </button>
      </div>
      <div v-else-if="allProducts.length > 0" class="text-center py-6 text-gray-500">Đã hiển thị tất cả sản phẩm</div>
    </div>

    <hr class="border-t border-gray-300 my-8" />

    <!-- ===== DỤNG CỤ ===== -->
    <div class="px-6 pb-10">
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold root-text inline-block relative pb-2
                 after:content-[''] after:block after:w-20 after:h-[3px] after:bg-gray-400 after:mx-auto after:mt-2">
          Dụng cụ & Vật liệu
        </h2>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="(tool, index) in visibleTools" :key="tool.id || 't-' + index"
          class="relative bg-white shadow-lg overflow-hidden">
          <img :src="resolveImg(tool.main_image)" class="w-full object-cover aspect-[1/1]" />
          <div class="px-3 pt-2 pb-3 text-center flex flex-col justify-between h-[120px]">
            <div>
              <p @click="openProductDetail(tool)"
                class="text-sm font-medium truncate root-text cursor-pointer hover:underline">
                {{ tool.name }}
              </p>
              <div class="flex flex-col items-center mt-1">
                <p v-if="tool.discount_price > 0 && tool.original_price" class="line-through text-gray-400 text-xs">
                  {{ Number(tool.original_price).toLocaleString() }} đ
                </p>
                <p class="root-text font-bold text-sm">
                  {{ Number(tool.price).toLocaleString() }} đ
                </p>
              </div>
            </div>
            <div class="flex justify-center mt-3">
              <button v-if="getProductButtonState(tool) === 'single'"
                @click="(e) => { handleAddSingleOptionToCart(tool); animateAddToCart(e, tool); }"
                class="w-full sm:w-auto px-3 py-1 text-sm flex items-center justify-center gap-1 whitespace-nowrap root-border root-text transition">
                <Icon name="lucide:shopping-cart" class="w-4 h-4" /> Thêm vào giỏ hàng
              </button>
              <button v-else-if="getProductButtonState(tool) === 'multiple'" @click="openProductDetail(tool)"
                class="w-full sm:w-auto px-3 py-1 text-sm flex items-center justify-center gap-1 whitespace-nowrap root-border root-text transition">
                <Icon name="lucide:settings" class="w-4 h-4" /> Chọn Option
              </button>
              <button v-else disabled
                class="w-full sm:w-auto px-3 py-1 text-sm flex items-center justify-center gap-1 whitespace-nowrap border border-gray-300 text-gray-400 cursor-not-allowed rounded transition">
                <Icon name="lucide:x-circle" class="w-4 h-4" /> Hết hàng
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!loadingTools && allTools.length === 0" class="text-center py-6 text-gray-500">
        Chưa có sản phẩm thuộc loại "{{ TOOLS_TYPE }}"
      </div>
      <div class="text-center py-6" v-if="!finishedTools && allTools.length > 0">
        <button @click="loadMoreTools" :disabled="loadingTools"
          class="px-4 py-2 text-sm root-border root-text rounded transition disabled:opacity-50">
          {{ loadingTools ? 'Đang tải...' : 'Xem thêm' }}
        </button>
      </div>
      <div v-else-if="allTools.length > 0" class="text-center py-6 text-gray-500">Đã hiển thị tất cả dụng cụ</div>
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
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const { public: { apiBaseUrl } } = useRuntimeConfig()

const addToCart = inject('addToCart')
const showScrollTop = ref(false)
const PRODUCT_TYPE = 'Sản phẩm'
const TOOLS_TYPE = 'Dụng cụ'
const limit = 8

// ---- Carousel (chỉ Sản phẩm, ẩn khi search)
const carouselProducts = ref([])

// ---- SẢN PHẨM
const allProducts = ref([])
const visibleProducts = ref([])
const loadingProducts = ref(false)
const finishedProducts = ref(false)

// ---- DỤNG CỤ
const allTools = ref([])
const visibleTools = ref([])
const loadingTools = ref(false)
const finishedTools = ref(false)

// ---- CACHE để search client-side
const cacheAllProd = ref(null)
const cacheAllTools = ref(null)

// Route / Search
const route = useRoute()
watch(
  () => route.query.search,
  (q) => fetchProducts(typeof q === 'string' ? q : ''),
  { immediate: true }
)

// Helpers
function resolveImg(url) {
  if (!url) return '/placeholder.jpg'
  if (/^(https?:)?\/\//.test(url) || url.startsWith('/')) return url
  return '/' + url
}
function sameType(p, t) {
  return ((p.type_products || '').trim().toLowerCase() === t.trim().toLowerCase())
}
function normalize(s = '') {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
}

// API
async function fetchByType(type) {
  const res = await fetch(`${apiBaseUrl}/products?type=${encodeURIComponent(type)}`)
  if (!res.ok) throw new Error(`Lỗi khi tải ${type}`)
  const data = await res.json()
  // Lọc cứng theo type
  return data.filter(p => sameType(p, type))
}

// Core: fetch theo search từ cache
async function fetchProducts(q = '') {
  const query = (q || '').trim()
  // load cache nếu chưa có
  if (!cacheAllProd.value || !cacheAllTools.value) {
    const [prod, tools] = await Promise.all([
      fetchByType(PRODUCT_TYPE),
      fetchByType(TOOLS_TYPE),
    ])
    cacheAllProd.value = prod
    cacheAllTools.value = tools
  }

  if (!query) {
    // không search → trả về full + hiện carousel
    applyData(cacheAllProd.value || [], cacheAllTools.value || [], true)
    return
  }

  const nq = normalize(query)
  const prod = (cacheAllProd.value || []).filter(p => normalize(p.name).includes(nq))
  const tools = (cacheAllTools.value || []).filter(p => normalize(p.name).includes(nq))
  // đang search → ẩn carousel (nếu muốn giữ, đổi thành true)
  applyData(prod, tools, false)
}

// Áp data + reset paginate
function applyData(prod, tools, showCarousel) {
  allProducts.value = prod
  allTools.value = tools
  carouselProducts.value = showCarousel ? prod.filter(p => p.show_in_carousel === true) : []

  visibleProducts.value = []
  visibleTools.value = []
  finishedProducts.value = false
  finishedTools.value = false
  sliceNextProducts()
  sliceNextTools()
}

// Paginate
function sliceNextProducts() {
  if (finishedProducts.value || loadingProducts.value) return
  loadingProducts.value = true
  const start = visibleProducts.value.length
  const next = allProducts.value.slice(start, start + limit)
  visibleProducts.value.push(...next)
  if (next.length < limit) finishedProducts.value = true
  loadingProducts.value = false
}
function sliceNextTools() {
  if (finishedTools.value || loadingTools.value) return
  loadingTools.value = true
  const start = visibleTools.value.length
  const next = allTools.value.slice(start, start + limit)
  visibleTools.value.push(...next)
  if (next.length < limit) finishedTools.value = true
  loadingTools.value = false
}
function loadMoreProducts() { sliceNextProducts() }
function loadMoreTools() { sliceNextTools() }

// Scroll top btn
function onScroll() { showScrollTop.value = window.scrollY > window.innerHeight }
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }) })
onUnmounted(() => window.removeEventListener('scroll', onScroll))
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }

// Popup + nút
const selectedProduct = ref(null)
const showDetailPopup = ref(false)
function openProductDetail(p) { selectedProduct.value = p; showDetailPopup.value = true }

function getProductButtonState(product) {
  const variants = Array.isArray(product.variants) ? product.variants : []
  const available = variants.filter(v => Number(v.quantity) > 0)
  if (available.length === 0) return 'out_of_stock'
  if (available.length === 1) return 'single'
  return 'multiple'
}
function handleAddSingleOptionToCart(product) {
  const variants = Array.isArray(product.variants) ? product.variants : []
  const valid = variants.filter(v => Number(v.quantity) > 0)
  if (valid.length !== 1) return
  const rawOptions = Array.isArray(valid[0].options) ? valid[0].options : []
  const selectedOptions = {}
  for (const opt of rawOptions) if (opt?.label && opt?.value) selectedOptions[opt.label] = opt.value
  addToCart?.({ ...product, quantity: 1, selectedOptions })
}
function animateAddToCart(event, product) {
  const button = event.currentTarget
  const cartIcon = document.querySelector('.cart-icon')
  if (!cartIcon) return
  const img = document.createElement('img')
  img.src = resolveImg(product.main_image)
  img.className = 'flying-image'
  img.style.position = 'fixed'
  img.style.width = '100px'
  img.style.zIndex = 1000
  const rectStart = button.getBoundingClientRect()
  img.style.left = rectStart.left + 'px'
  img.style.top = rectStart.top + 'px'
  document.body.appendChild(img)
  const rectEnd = cartIcon.getBoundingClientRect()
  img.animate(
    [{ transform: 'translate(0, 0)' },
    { transform: `translate(${rectEnd.left - rectStart.left}px, ${rectEnd.top - rectStart.top}px) scale(0.2)` }],
    { duration: 600, easing: 'ease-in-out' }
  ).onfinish = () => img.remove()
}
</script>
