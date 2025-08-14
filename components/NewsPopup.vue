<template>
    <teleport to="body">
        <div v-if="open" class="fixed inset-0 z-[1000]">
            <div class="absolute inset-0 bg-black/60" @click="close"></div>

            <div class="absolute inset-0 flex items-center justify-center p-4">
                <div
                    class="relative w-[min(1100px,95vw)] h-[min(90vh,900px)] bg-white rounded-2xl shadow-xl overflow-hidden">

                    <!-- COVER nhỏ hơn -->
                    <div class="relative h-[200px] bg-gray-100">
                        <img v-if="coverSrc" :src="coverSrc" :alt="item?.title || 'cover'"
                            class="absolute inset-0 h-full w-full object-cover" />

                        <!-- BACK nút ở mép ảnh, góc trái -->
                        <button
                            class="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-white/95 hover:bg-white px-3 py-1.5 shadow ring-1 ring-black/5"
                            @click="close">
                            <svg viewBox="0 0 24 24" class="h-5 w-5">
                                <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <span class="text-sm">Quay lại</span>
                        </button>

                        <!-- NỀN TRẮNG MỜ + Title + Publish date -->
                        <div class="absolute left-3 right-3 bottom-3">
                            <div class="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
                                <h1 class="text-xl font-semibold leading-snug root-text">
                                    {{ item?.title }}
                                </h1>
                                <div class="mt-0.5 text-xs font-medium root-text">
                                    {{ fmtDate(item?.published_at || item?.created_at) }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- BODY cao hơn do cover nhỏ lại -->
                    <div class="h-[calc(100%-200px)] overflow-y-auto">
                        <div class="px-6 py-5 space-y-4">
                            <div v-if="item?.summary" class="text-[15px] text-gray-700">
                                <div class="font-medium mb-1">Tóm tắt</div>
                                <p class="leading-relaxed whitespace-pre-wrap">{{ item.summary }}</p>
                            </div>

                            <div class="prose prose-zinc max-w-none">
                                <div v-if="item?.content" v-html="item.content"></div>
                                <div v-else class="text-gray-500">Chưa có nội dung.</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
const props = defineProps({
    open: { type: Boolean, default: false },
    item: { type: Object, default: null },   // đổi từ news -> item
})
const emit = defineEmits(['update:open'])
const close = () => emit('update:open', false)

const toImgSrc = (p) => {
    if (!p) return ''
    if (/^(blob:|data:|https?:\/\/)/i.test(p)) return p
    if (p.startsWith('/news/')) return p
    if (p.startsWith('news/')) return '/' + p
    return '/news/' + p.replace(/^\/+/, '')
}

// ưu tiên cover -> fallback thumb
const coverSrc = computed(() => toImgSrc(props.item?.cover_path || props.item?.thumb_path || ''))

const fmtDate = (s) => { try { return s ? new Date(s).toLocaleDateString() : '' } catch { return s || '' } }
</script>
