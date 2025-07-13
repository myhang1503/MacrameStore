<template>
    <div v-if="show" class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div class="bg-white p-6 w-[90vw] max-w-4xl rounded-xl shadow-xl overflow-y-auto max-h-[95vh]">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold flex items-center gap-2">
                    Update sản phẩm
                </h2>
                <button @click="$emit('close')" class="text-xl">
                    <Icon name="lucide:x" />
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="font-bold">Tên sản phẩm</label>
                    <input v-model="form.name" type="text"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
                </div>

                <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="font-bold">Giá gốc</label>
                        <input v-model.number="form.original_price" type="number"
                            class="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                        <label class="font-bold">Giảm giá</label>
                        <input v-model.number="form.discount_price" type="number"
                            class="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                        <label class="font-bold">Giá sau giảm</label>
                        <input :value="form.original_price - form.discount_price" disabled
                            class="w-full border rounded px-3 py-2 bg-gray-100" />
                    </div>
                </div>

                <div class="md:col-span-2">
                    <label class="font-bold">Mô tả ngắn</label>
                    <textarea v-model="form.description" rows="2" class="w-full border rounded px-3 py-2" />
                </div>

                <div class="md:col-span-2">
                    <label class="font-bold">Mô tả chi tiết</label>
                    <textarea v-model="form.detail_description" rows="3" class="w-full border rounded px-3 py-2" />
                </div>

                <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div>
                        <p class="font-semibold">Hình chính</p>
                        <input type="file" @change="handleMainImage"
                            class="block w-full border rounded px-3 py-2 cursor-pointer file:cursor-pointer file:font-medium file:border-0 file:bg-blue-100 file:px-4 file:py-1 file:mr-2" />
                    </div>
                    <div v-if="mainImagePreview" class="flex justify-center items-center">
                        <img :src="mainImagePreview" alt="Preview" class="h-24 object-contain rounded border" />
                    </div>
                </div>

                <div class="md:col-span-2">
                    <p class="font-semibold">Hình chi tiết</p>
                    <input type="file" multiple @change="handleDetailImages"
                        class="block w-full border rounded px-3 py-2 cursor-pointer file:cursor-pointer file:font-medium file:border-0 file:bg-blue-100 file:px-4 file:py-1 file:mr-2" />
                    <div class="flex gap-2 mt-2">
                        <img v-for="img in detailImagePreviews" :key="img" :src="img"
                            class="w-20 h-20 object-cover border" />
                    </div>
                </div>

                <div class="md:col-span-2">
                    <p class="font-semibold">Option nâng cao</p>
                    <div v-for="(opt, idx) in advancedOptions" :key="idx" class="flex gap-2 mb-2">
                        <input v-model="opt.label" placeholder="Loại" class="border p-1 w-1/3 rounded" />
                        <input v-model="opt.value" placeholder="Tùy chọn" class="border p-1 w-1/3 rounded" />
                        <input v-model="opt.quantity" type="number" placeholder="SL" class="border p-1 w-1/3 rounded" />
                        <button @click="removeOption(idx)" class="text-red-600 font-bold">✕</button>
                    </div>
                    <button @click="addOption" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+ Thêm
                        Option</button>
                </div>

                <div class="md:col-span-2 flex flex-wrap gap-4 mt-2">
                    <label><input type="checkbox" v-model="form.is_new" /> Mới</label>
                    <label><input type="checkbox" v-model="form.is_sale_off" /> Giảm giá</label>
                    <label><input type="checkbox" v-model="form.is_hot" /> Hot</label>
                    <label><input type="checkbox" v-model="form.show_in_carousel" /> Hiển thị ở Carousel</label>
                </div>
            </div>

            <div class="mt-4 flex justify-end gap-2">
                <button @click="$emit('close')" class="px-4 py-2 bg-gray-300 rounded">Đóng</button>
                <button @click="handleUpdate" class="px-4 py-2 bg-blue-600 text-white rounded">Lưu</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'


const { public: { apiBaseUrl } } = useRuntimeConfig()

const props = defineProps({
    show: Boolean,
    productId: Number,
})
const emit = defineEmits(['close', 'updated'])

const form = ref({
    name: '',
    description: '',
    detail_description: '',
    original_price: 0,       // Giá gốc
    discount_price: 0,       // Giá giảm
    price: 0,                // Giá sau giảm (nếu có dùng)
    is_new: false,
    is_sale_off: false,
    is_hot: false,
    show_in_carousel: false,
    main_image: '',          // Ảnh chính (nếu cần hiển thị preview khi sửa)
    detail_images: [],       // Danh sách ảnh chi tiết
    option_plus: []          // Dùng nếu cần bind lại option_plus (nếu có)
})

let mainImagePath = ""
const detailImagePaths = []


const mainImageFile = ref(null)
const detailImageFiles = ref([])

const mainImagePreview = ref('')
const detailImagePreviews = ref([])

const advancedOptions = ref([])

const computedPrice = computed(() => {
    return form.original_price - form.discount_price;
});

watch(() => props.show, async (v) => {
    if (v && props.productId) {
        await fetchData()
    }
})

const fetchData = async () => {
    const product = await $fetch(`${apiBaseUrl}/products/${props.productId}`)
    Object.assign(form.value, product)

    mainImagePreview.value = product.main_image.startsWith('/')
        ? product.main_image
        : '/' + product.main_image;

    detailImagePreviews.value = product.detail_images.map(img =>
        img.startsWith('/') ? img : '/' + img
    );

    if (product.variants) {
        advancedOptions.value = product.variants.map(v => ({
            label: v.options[0]?.label || '',
            value: v.options[0]?.value || '',
            quantity: v.quantity
        }))
    }
}

const handleMainImage = (e) => {
    const file = e.target.files[0]
    mainImageFile.value = file
    mainImagePreview.value = URL.createObjectURL(file)
}

const handleDetailImages = (e) => {
    detailImageFiles.value = Array.from(e.target.files)
    detailImagePreviews.value = detailImageFiles.value.map(f => URL.createObjectURL(f))
}

const addOption = () => advancedOptions.value.push({ label: '', value: '', quantity: 0 })
const removeOption = (i) => advancedOptions.value.splice(i, 1)

const handleUpdate = async () => {
    try {
        // Update thông tin cơ bản
        form.value.price = form.value.original_price - form.value.discount_price;

        // Upload hình chính (nếu có)
        if (mainImageFile.value) {
            const fm = new FormData()
            fm.append('file', mainImageFile.value)
            const mainRes = await $fetch(`${apiBaseUrl}/upload/main/${props.productId}`, {
                method: 'POST',
                body: fm
            })

            mainImagePath = `/${mainRes.path}`
            form.main_image = mainImagePath;
        }

        // Upload hình chi tiết (nếu có)
        for (let i = 0; i < detailImageFiles.value.length; i++) {
            const fd = new FormData()
            fd.append('file', detailImageFiles.value[i])
            fd.append('index', i)
            const detailRes = await $fetch(`${apiBaseUrl}/upload/detail/${props.productId}`, {
                method: 'POST',
                body: fd
            })
            detailImagePaths.push(`/${detailRes.path}`)
        }

        if (detailImageFiles.value.length > 0) {
            form.detail_images = detailImagePaths
            console.log("form.detail_images trước gửi:", form.detail_images);
        }



        const grouped = {};

        advancedOptions.value.forEach(opt => {
            const type = (opt.label || '').trim();
            const option = (opt.value || '').trim();

            if (type && option) {
                if (!grouped[type]) grouped[type] = new Set();
                grouped[type].add(option);
            }
        });

        const option_plus = Object.entries(grouped).map(([type, values]) => ({
            type,
            options: Array.from(values)
        }));

        form.value.option_plus = option_plus;

        console.log("option_plus trước gửi:", form.value.option_plus);

        await $fetch(`${apiBaseUrl}/products/${props.productId}`, {
            method: "PUT",
            body: {
                ...form.value,
            }
        })
        // Update options
        for (let opt of advancedOptions.value) {
            await $fetch(`${apiBaseUrl}/product-options/${props.productId}`, {
                method: "PUT",
                body: {
                    options: advancedOptions.value.map(opt => ({
                        label: opt.label,
                        value: opt.value,
                        quantity: opt.quantity
                    }))
                }
            })
        }

        emit('updated')
        emit('close')
    } catch (err) {
        alert("Cập nhật thất bại!")
        console.error(err)
    }
}
</script>
