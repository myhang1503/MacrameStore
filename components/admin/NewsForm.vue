<template>
    <teleport to="body">
        <div v-if="open" class="fixed inset-0 z-[1000]">
            <div class="absolute inset-0 bg-black/60" @click="saving ? null : close()"></div>

            <div class="absolute inset-0">
                <!-- khung full screen -->
                <div class="relative h-[100dvh] w-full bg-white overflow-hidden">
                    <!-- header -->
                    <header class="sticky top-0 z-10 border-b bg-white px-4 py-3">
                        <div class="flex items-center justify-between">
                            <h2 class="font-semibold">{{ form.id ? 'Sửa bài' : 'Thêm bài' }}</h2>
                            <button class=" border px-3 py-1.5" @click="close" :disabled="saving">Đóng</button>
                        </div>
                    </header>

                    <!-- nội dung 2 cột -->
                    <div class="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6 p-4 h-[calc(100dvh-120px)]">
                        <!-- Cột trái: form fields (cuộn riêng) -->
                        <div class="overflow-y-auto pr-1">
                            <div class="space-y-4">
                                <div>
                                    <label class="text-sm">Tiêu đề</label>
                                    <input v-model="form.title" class="w-full border px-3 py-2" />
                                </div>

                                <div>
                                    <label class="text-sm">Slug</label>
                                    <input v-model="form.slug" class="w-full border px-3 py-2" />
                                </div>

                                <div>
                                    <label class="text-sm">Tóm tắt</label>
                                    <textarea v-model="form.summary" rows="4"
                                        class="w-full border px-3 py-2"></textarea>
                                </div>

                                <!-- Cover -->
                                <div>
                                    <label class="text-sm font-medium">Cover image</label>
                                    <div class="mt-1 flex items-start gap-3">
                                        <!-- Preview -->
                                        <div class="h-24 w-24 border bg-gray-50 overflow-hidden flex-shrink-0">
                                            <img v-if="coverSrc" :src="coverSrc" class="h-full w-full object-cover" />
                                            <div v-else
                                                class="h-full w-full flex items-center justify-center text-xs text-gray-400">
                                                No image</div>
                                        </div>
                                        <!-- Controls -->
                                        <div class="flex-1 space-y-2">
                                            <input v-model="form.cover_path" class="w-full  border px-3 py-2"
                                                placeholder="/news/m_1.jpg" />
                                            <div class="flex items-center gap-2">
                                                <input ref="coverInput" type="file" accept="image/*" class="hidden"
                                                    @change="onSelectCover" />
                                                <button type="button" class=" border px-3 py-1.5"
                                                    @click="coverInput.click()">Chọn ảnh</button>
                                                <button v-if="coverSrc" type="button"
                                                    class=" border px-3 py-1.5 text-red-600" @click="clearCoverPreview">
                                                    Xoá xem trước
                                                </button>
                                                <span v-if="coverFile"
                                                    class="text-xs text-gray-500 truncate max-w-[14rem]">{{
            coverFile.name }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Thumb -->
                                <div class="mt-4">
                                    <label class="text-sm font-medium">Thumb image</label>
                                    <div class="mt-1 flex items-start gap-3">
                                        <div class="h-20 w-20 border bg-gray-50 overflow-hidden flex-shrink-0">
                                            <img v-if="thumbSrc" :src="thumbSrc" class="h-full w-full object-cover" />
                                            <div v-else
                                                class="h-full w-full flex items-center justify-center text-xs text-gray-400">
                                                No image</div>
                                        </div>
                                        <div class="flex-1 space-y-2">
                                            <input v-model="form.thumb_path" class="w-full  border px-3 py-2"
                                                placeholder="/news/t_1.jpg" />
                                            <div class="flex items-center gap-2">
                                                <input ref="thumbInput" type="file" accept="image/*" class="hidden"
                                                    @change="onSelectThumb" />
                                                <button type="button" class="border px-3 py-1.5"
                                                    @click="thumbInput.click()">Chọn ảnh</button>
                                                <button v-if="thumbSrc" type="button"
                                                    class="border px-3 py-1.5 text-red-600" @click="clearThumbPreview">
                                                    Xoá xem trước
                                                </button>
                                                <span v-if="thumbFile"
                                                    class="text-xs text-gray-500 truncate max-w-[14rem]">{{
            thumbFile.name
        }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div>
                                    <label class="text-sm">Tags (comma)</label>
                                    <input v-model="tagsStr" class="w-full border px-3 py-2"
                                        placeholder="nuxt,vue,tailwind" />
                                </div>

                                <div>
                                    <label class="text-sm block">Status</label>
                                    <select v-model="form.status" class="w-full border px-3 py-2">
                                        <option value="draft">draft</option>
                                        <option value="published">published</option>
                                    </select>
                                </div>
                            </div>
                            <div class="h-6"></div>
                        </div>

                        <!-- Cột phải: CKEditor chiếm toàn bộ -->
                        <div class="min-h-0 flex flex-col">
                            <label class="text-sm mb-2">Nội dung</label>
                            <div class="flex-1 min-h-0">
                                <ClientOnly>
                                    <div class="h-full ck-wrapper" v-if="open">
                                        <ckeditor :key="open + '-' + (form.id ?? 'new')" :editor="ClassicEditor"
                                            :model-value="form.content" @update:model-value="onEditorUpdate"
                                            :config="editorConfig" @ready="onEditorReady" />
                                    </div> <template #fallback> <textarea v-model="form.content" rows="12"
                                            class="w-full h-full border px-3 py-2 font-mono"></textarea>
                                    </template>
                                </ClientOnly>
                            </div>
                        </div>
                    </div>

                    <!-- footer cố định đáy -->
                    <footer class="sticky bottom-0 border-t bg-white px-4 py-3">
                        <div class="flex justify-end gap-2">
                            <button class="border px-4 py-2" @click="close">Hủy</button>
                            <button class="bg-black text-white px-4 py-2" @click="save" :disabled="saving">Lưu</button>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    </teleport>
</template>

<style scoped>
/* cho editor cao toàn khung phải */
.ck-wrapper :deep(.ck-editor__editable_inline) {
    min-height: calc(100vh - 220px);
    overflow-y: auto !important;
}
</style>

<script setup>
import ClassicEditor from '~/lib/ckeditor-custom'
import { ref, reactive, computed, watch, onBeforeUnmount } from 'vue'
const IMAGE_BASE = '/news/'
const coverInput = ref(null)
const thumbInput = ref(null)
const coverFile = ref(null)
const thumbFile = ref(null)
const coverPreviewUrl = ref('')
const thumbPreviewUrl = ref('')

// Ưu tiên hiển thị: file vừa chọn (objectURL) -> path đang có
const coverSrc = computed(() => coverPreviewUrl.value || toImgSrc(form.cover_path) || '')
const thumbSrc = computed(() => thumbPreviewUrl.value || toImgSrc(form.thumb_path) || '')

const preferredName = () => (form.slug?.trim() || slugify(form.title || '') || `tmp_${Date.now()}`)
const makePath = (kind, file) => {
    const ext = (file?.name?.split('.').pop() || 'jpg').toLowerCase()
    const prefix = kind === 'cover' ? 'm_' : 't_'
    return `${IMAGE_BASE}${prefix}${preferredName()}.${ext}`
}

const props = defineProps({
    open: { type: Boolean, default: false },
    value: { type: Object, default: null }, // news để edit
    imageBase: { type: String, default: '/news/' }
})
const emit = defineEmits(['update:open', 'saved'])
const { public: { apiBaseUrl } } = useRuntimeConfig()
const close = () => emit('update:open', false)

/* ===== 1) MODEL ===== */
const empty = {
    id: null, title: '', slug: '', summary: '', content: '',
    cover_path: '', thumb_path: '', category_id: null, tags: [], status: 'draft'
}
const form = reactive(structuredClone(empty))
const rawContent = ref('')

/* ===== 2) NHẬN DATA TỪ CHA + DEBUG ===== */
watch(() => props.value, (v) => {
    Object.assign(form, structuredClone(empty), v || {})

    rawContent.value = v?.content || '' // lấy nội dung từ props
    console.log('[DEBUG] rawContent nhận từ props:', {
        length: rawContent.value.length,
        preview: rawContent.value.slice(0, 100) // in trước 100 ký tự
    })

    form.content = rawContent.value // gán vào v-model CKEditor
}, { immediate: true })

/* ===== 3) CKEDITOR CONFIG ===== */
const editorConfig = {
    licenseKey: 'GPL',
    // bỏ heading khỏi toolbar nếu build không có plugin Heading
    toolbar: {
        items: [
            'bold', 'italic', 'underline', 'link',
            'bulletedList', 'numberedList', 'alignment',
            'fontSize', 'fontColor', 'fontBackgroundColor',
            'imageUpload', 'insertTable', 'undo', 'redo'
        ]
    },
    image: {
        toolbar: ['imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight', '|', 'resizeImage'],
        resizeUnit: 'px'
    },
    extraPlugins: [MyUploadAdapterPlugin],
}
function MyUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => new UploadAdapter(loader)
}
class UploadAdapter {
    constructor(loader) { this.loader = loader }
    upload() {
        return this.loader.file.then((file) => {
            const fd = new FormData()
            fd.append('upload', file)
            const id = form.id ?? 0
            return fetch(`${apiBaseUrl}/admin/news/upload-content-image`, { method: 'POST', body: fd })
                .then(res => { if (!res.ok) throw new Error('Upload failed'); return res.json() })
                .then(data => ({ default: data.url }))
        })
    }
    abort() { }
}

/* ===== 4) DEBUG LUỒNG V-MODEL EDITOR ===== */
// 4.1 ready: ép set lại data + log
const onEditorReady = (ed) => {
    console.log('[editor ready] current len =', ed.getData().length,
        '→ setData len =', (form.content || '').length)
    ed.setData(form.content || '')
}
// 4.2 log mỗi khi editor cập nhật model (giữ v-model)
const onEditorUpdate = (val) => {
    console.log('[editor update:model-value] len =', (val || '').length,
        'preview =', (val || '').slice(0, 80))
    form.content = val
}

/* ===== 5) SAVE (giữ nguyên style) ===== */
const saving = ref(false)
async function save() {
    if (saving.value) return
    saving.value = true
    try {
        if (!form.title?.trim()) throw new Error('Thiếu tiêu đề')
        if (!form.slug?.trim()) form.slug = slugify(form.title)

        const creating = !form.id
        const url = creating ? `${apiBaseUrl}/admin/news` : `${apiBaseUrl}/admin/news/${form.id}`
        const method = creating ? 'POST' : 'PUT'

        console.log('[save] start', { creating, method })

        const created = await $fetch(url, {
            method,
            body: creating ? { ...form, cover_path: '', thumb_path: '' } : { ...form }
        })

        const id = creating ? created.id : form.id


        // ⬇⬇⬇ CHỜ upload xong
        const { coverUrl, thumbUrl } = await uploadSelectedImages(id)

        // cập nhật model (để input thấy giá trị)
        if (coverUrl) form.cover_path = coverUrl
        if (thumbUrl) form.thumb_path = thumbUrl


        // Emit/đóng popup SAU KHI upload xong
        emit('saved')
        close()
    } catch (e) {
        console.error('[save] error', e)
        alert(e?.data?.message || e.message || 'Lỗi')
    } finally {
        saving.value = false
    }
}


async function uploadSelectedImages(id) {
    const out = { coverUrl: '', thumbUrl: '' }
    const tasks = []

    if (coverFile.value) {
        tasks.push((async () => {
            console.log('[upload] cover start:', coverFile.value.name)
            const fd = new FormData()
            fd.append('upload', coverFile.value)
            const res = await fetch(`${apiBaseUrl}/admin/news/${id}/upload-image?kind=cover`, { method: 'POST', body: fd })
            const data = await res.json()
            if (!res.ok) throw new Error(data?.error || 'Upload cover failed')
            out.coverUrl = data.url
            console.log('[upload] cover done:', out.coverUrl)
            // quan trọng: clear preview để computed hiển thị URL thật thay vì blob
            if (coverPreviewUrl.value) { URL.revokeObjectURL(coverPreviewUrl.value); coverPreviewUrl.value = '' }
            coverFile.value = null
        })())
    }

    if (thumbFile.value) {
        tasks.push((async () => {
            console.log('[upload] thumb start:', thumbFile.value.name)
            const fd = new FormData()
            fd.append('upload', thumbFile.value)
            const res = await fetch(`${apiBaseUrl}/admin/news/${id}/upload-image?kind=thumb`, { method: 'POST', body: fd })
            const data = await res.json()
            if (!res.ok) throw new Error(data?.error || 'Upload thumb failed')
            out.thumbUrl = data.url
            console.log('[upload] thumb done:', out.thumbUrl)
            if (thumbPreviewUrl.value) { URL.revokeObjectURL(thumbPreviewUrl.value); thumbPreviewUrl.value = '' }
            thumbFile.value = null
        })())
    }

    await Promise.all(tasks)
    return out
}

const slugify = (s) =>
    s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
        .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function onSelectCover(e) {
    const f = e.target.files?.[0]; if (!f) return
    if (coverPreviewUrl.value) URL.revokeObjectURL(coverPreviewUrl.value)
    coverFile.value = f
    coverPreviewUrl.value = URL.createObjectURL(f)

    form.cover_path = makePath('cover', f)
    console.log('[cover] file =', f.name, '→ form.cover_path =', form.cover_path)
}
function onSelectThumb(e) {
    const f = e.target.files?.[0]; if (!f) return
    if (thumbPreviewUrl.value) URL.revokeObjectURL(thumbPreviewUrl.value)
    thumbFile.value = f
    thumbPreviewUrl.value = URL.createObjectURL(f)

    form.thumb_path = makePath('thumb', f)
    console.log('[thumb] file =', f.name, '→ form.thumb_path =', form.thumb_path)
}

function clearCoverPreview() {
    if (coverPreviewUrl.value) URL.revokeObjectURL(coverPreviewUrl.value)
    coverPreviewUrl.value = ''; coverFile.value = null
    if (coverInput.value) coverInput.value.value = ''
}
function clearThumbPreview() {
    if (thumbPreviewUrl.value) URL.revokeObjectURL(thumbPreviewUrl.value)
    thumbPreviewUrl.value = ''; thumbFile.value = null
    if (thumbInput.value) thumbInput.value.value = ''
}
function toImgSrc(p) {
    if (!p) return '';
    if (/^(blob:|data:|https?:\/\/|\/news\/|\/public\/news\/)/i.test(p)) return p;
    if (/^(news\/|public\/news\/)/i.test(p)) return '/' + p.replace(/^\/+/, '');
    const base = props.imageBase.endsWith('/') ? props.imageBase : props.imageBase + '/';
    return base + p.replace(/^\/+/, '');
}
// Dọn dẹp khi đổi bài/đóng popup
watch(() => form.id, () => { clearCoverPreview(); clearThumbPreview() })
watch(() => props.open, v => { if (!v) { clearCoverPreview(); clearThumbPreview() } })
onBeforeUnmount(() => { clearCoverPreview(); clearThumbPreview() })

</script>
