<template>
  <div class="min-h-screen bg-white">
    <!-- COVER -->
    <div class="relative h-[200px] bg-gray-100">
      <img
        v-if="coverSrc"
        :src="coverSrc"
        :alt="post?.title || 'cover'"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <!-- BACK -->
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

      <!-- TITLE -->
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
    </div>

    <!-- BODY -->
    <div class="px-6 py-5 space-y-4">
      <div v-if="pending">⏳ Đang tải...</div>
      <div v-else-if="error" class="text-red-500">Không tìm thấy bài viết</div>
      <template v-else>
        <div v-if="post?.summary" class="text-[15px] text-gray-700">
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
</template>

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
</script>
