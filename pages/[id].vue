<template>
  <section class="bg-white py-3">
    <div class="max-w-6xl mx-auto px-4 mt-10">
      
      <!-- <div class="relative h-[200px] bg-gray-100">
        <img
          v-if="coverSrc"
          :src="coverSrc"
          :alt="post?.title || 'cover'"
          class="absolute inset-0 h-full w-full object-cover"
        />

        <button
          class="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-white/95 hover:bg-white px-3 py-1.5 shadow ring-1 ring-black/5"
          @click="goBack"
        >
          <svg viewBox="0 0 24 24" class="h-5 w-5">
            <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="text-sm">Quay lại</span>
        </button>

        <div class="absolute left-3 right-3 bottom-3">
          <div class="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
            <h1 class="text-xl font-semibold leading-snug root-text">
              {{ post?.title }}
            </h1>
            <div class="mt-0.5 text-xs font-medium root-text">
              {{ fmtDate(post?.published_at || post?.created_at) }}
            </div>
          </div>
        </div>
      </div> -->

      <h1 class="text-xl font-bold text-center mb-10">
        {{ post?.title }}
      </h1>

      <!-- BODY -->
      <div class="px-4 sm:px-6 lg:px-8 py-5 space-y-4">
        <div v-if="pending">⏳ Đang tải...</div>
        <div v-else-if="error" class="text-red-500">Không tìm thấy bài viết</div>
        <template v-else>
          <div v-if="post?.summary" class="text-[15px] text-gray-700 hidden">
            <div class="font-medium mb-1">Tóm tắt</div>
            <p class="leading-relaxed whitespace-pre-wrap">{{ post.summary }}</p>
          </div>

          <div class="prose prose-zinc max-w-none">
            <div v-if="post?.content" v-html="post.content"></div>
            <div v-else class="text-gray-500">Chưa có nội dung.</div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style>
/* Base: mobile-first (<= 640px) */
figure.image,
figure.image.image-style-align-center {
  margin-left: auto !important;
  margin-right: auto !important;
  text-align: center;
  display: block;
  max-width: 100%;       /* figure không tràn */
  overflow: hidden;
}

figure.image img,
figure.image.image-style-align-center img {
  display: block;
  margin: 0 auto;
  max-width: 100% !important; /* không vượt container */
  width: auto !important;     /* hủy width cứng do CKEditor set */
  height: auto !important;    /* giữ tỉ lệ */
}

/* Tablet nhỏ: sm ≥ 640px */
@media (min-width: 640px) {
  figure.image img {
    max-width: 95% !important;
  }
}

/* Tablet lớn: md ≥ 768px */
@media (min-width: 768px) {
  figure.image img {
    max-width: 85% !important;
  }
}

/* Desktop: lg ≥ 1024px */
@media (min-width: 1024px) {
  figure.image img {
    max-width: 75% !important;
  }
}

/* Màn hình rộng: xl ≥ 1280px */
@media (min-width: 1280px) {
  figure.image img {
    max-width: 65% !important;
  }
}


.text-big {
  font-size: 1.25rem;   /* ~20px nếu gốc là 16px */
  line-height: 1.6;
  font-weight: 500;     /* tuỳ chọn: cho chữ đậm nhẹ hơn */
}
</style>

<script setup>
const route = useRoute()
const router = useRouter()
const { public: { apiBaseUrl } } = useRuntimeConfig()

// lấy id từ params
const id = route.params.id

// fetch dữ liệu theo id
const { data: raw } = await useFetch(() => `${apiBaseUrl}/news/${id}`)

// ánh xạ thủ công từ mảng -> object
const post = computed(() => {
  if (!raw.value) return null

  const fields = [
    "id",
    "slug",
    "title",
    "summary",
    "content",
    "cover_path",
    "thumb_path",
    "category_id",
    "category_slug",
    "category_name",
    "status",
    "published_at",
    "created_at",
    "updated_at",
    "extra_field_1",
    "extra_field_2"
  ]

  return Object.fromEntries(fields.map((f, i) => [f, raw.value[i]]))
})

const toImgSrc = (p) => {
  if (!p) return ''
  if (/^(blob:|data:|https?:\/\/)/i.test(p)) return p
  if (p.startsWith('/news/')) return p
  if (p.startsWith('news/')) return '/' + p
  return '/news/' + p.replace(/^\/+/, '')
}

const coverSrc = computed(() =>
  toImgSrc(post.value?.cover_path || post.value?.thumb_path || '')
)

const fmtDate = (s) => {
  try {
    return s ? new Date(s).toLocaleDateString() : ''
  } catch {
    return s || ''
  }
}

function goBack() {
  router.back()
}

useSeoMeta({
  title: () => post.value?.title,
  description: () => post.value?.summary,
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.summary,
  ogImage: () => post.value?.coverImage || '/cover.png'
})
</script>
