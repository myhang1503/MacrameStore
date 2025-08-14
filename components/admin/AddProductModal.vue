<template>
    <div v-if="show" class="fixed inset-0 bg-black/30 z-[999] flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-lg w-[90vw] max-w-3xl max-h-[95vh] overflow-y-auto p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold flex items-center gap-2">
                    <Icon name="lucide:plus" /> Thêm sản phẩm
                </h2>
                <button @click="onClose" class="text-xl">
                    <Icon name="lucide:x" />
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="font-bold">Tên sản phẩm</label>
                    <input v-model="form.name" type="text"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
                </div>
                <div>
                    <label class="font-bold">Loại sản phẩm</label>
                    <input v-model="form.type_products" type="text" placeholder="Sản phẩm,Dịch vụ...."
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
                </div>
                <!-- Hàng giá -->
                <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="font-bold">Giá gốc</label>
                        <input v-model.number="form.original_price" type="number"
                            class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
                    </div>
                    <div>
                        <label class="font-bold">Giảm giá</label>
                        <input v-model.number="form.discount_price" type="number"
                            class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
                    </div>
                    <div>
                        <label class="font-bold">Giá sau giảm</label>
                        <input :value="computedPrice" disabled
                            class="w-full border rounded px-3 py-2 font-bold bg-gray-100 text-gray-800" />
                    </div>
                </div>

                <div class="md:col-span-2">
                    <label class="font-bold">Mô tả ngắn</label>
                    <textarea v-model="form.description" rows="2"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
                </div>

                <div class="md:col-span-2">
                    <label class="font-bold">Mô tả chi tiết</label>
                    <textarea v-model="form.detail_description" rows="3"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
                </div>

                <!-- Hình chính -->
                <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <!-- Cột chọn ảnh -->
                    <div>
                        <label class="font-bold block mb-1">Hình chính</label>
                        <input type="file" accept="image/*" @change="handleMainImage"
                            class="block w-full border rounded px-3 py-2 cursor-pointer file:cursor-pointer file:font-medium file:border-0 file:bg-blue-100 file:px-4 file:py-1 file:mr-2" />
                    </div>

                    <!-- Cột hiển thị ảnh preview -->
                    <div v-if="mainImagePreview" class="flex justify-center items-center">
                        <img :src="mainImagePreview" alt="Preview" class="h-24 object-contain rounded border" />
                    </div>
                </div>
                <!-- Ảnh chi tiết -->
                <div class="md:col-span-2">
                    <label class="font-bold block mb-1">Hình chi tiết</label>

                    <!-- Hàng 1: nút chọn -->
                    <input type="file" multiple accept="image/*" @change="handleDetailImages"
                        class="block w-full border rounded px-3 py-2 cursor-pointer file:cursor-pointer file:font-medium file:border-0 file:bg-blue-100 file:px-4 file:py-1 file:mr-2" />

                    <!-- Hàng 2: preview -->
                    <div class="flex flex-wrap gap-3 mt-2">
                        <div v-for="(img, idx) in detailImagePreviews" :key="idx"
                            class="w-20 h-20 rounded border overflow-hidden">
                            <img :src="img" class="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                <!-- Option nâng cao -->
                <div class="md:col-span-2">
                    <label class="font-bold block mb-1">Option nâng cao</label>

                    <div v-for="(opt, index) in advancedOptions" :key="index" class="flex items-center gap-2 mb-2">
                        <input v-model="opt.label" type="text" placeholder="Key"
                            class="w-[30%] border rounded px-2 py-1" />
                        <input v-model="opt.value" type="text" placeholder="Value"
                            class="w-[30%] border rounded px-2 py-1" />
                        <input v-model.number="opt.quantity" type="number" min="0" placeholder="Quantity"
                            class="w-[30%] border rounded px-2 py-1" />
                        <button @click="removeOption(index)" class="text-red-500 font-bold">✕</button>
                    </div>

                    <button @click="addOption" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+ Thêm
                        Option</button>
                </div>

                <div class="md:col-span-2 flex flex-wrap gap-4 mt-2">
                    <label><input type="checkbox" v-model="form.is_new" /> Mới</label>
                    <label><input type="checkbox" v-model="form.is_hot" /> Hot</label>
                    <label><input type="checkbox" v-model="form.is_sale_off" /> Giảm giá</label>
                    <label><input type="checkbox" v-model="form.show_in_carousel" /> Hiển thị ở Carousel</label>
                </div>
            </div>

            <div class="text-right mt-6">
                <button @click="handleSubmit" class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Lưu
                </button>
            </div>
        </div>
    </div>
</template>


<script setup>
const props = defineProps({ show: Boolean });
const emit = defineEmits(['close', 'submitted']);

const { public: { apiBaseUrl } } = useRuntimeConfig()
const form = reactive({
    name: '',
    type_products: '',
    description: '',
    detail_description: '',
    price: 0,
    original_price: 0,
    discount_price: 0,
    option_plus: [],
    is_new: false,
    is_sale_off: false,
    is_hot: false,
    show_in_carousel: false,
    main_image: null,
    detail_images: [],
});
const computedPrice = computed(() => {
    const result = (form.original_price || 0) - (form.discount_price || 0)
    return result >= 0 ? result : 0
})

const mainImageFile = ref(null)
const mainImagePreview = ref('')


function handleMainImage(event) {
    const file = event.target.files[0]
    if (!file) return
    mainImageFile.value = file
    mainImagePreview.value = URL.createObjectURL(file)
}


const detailImageFiles = ref([])
const detailImagePreviews = ref([])

function handleDetailImages(event) {
    const files = Array.from(event.target.files)
    detailImageFiles.value = files
    detailImagePreviews.value = files.map(file => URL.createObjectURL(file))
}

const advancedOptions = ref([
    { label: '', value: '', quantity: 1000 }
])

function addOption() {
    advancedOptions.value.push({ label: '', value: '', quantity: 1000 })
}

function removeOption(index) {
    advancedOptions.value.splice(index, 1)
}

const onClose = () => emit('close');

const isSaving = ref(false);

const handleSubmit = async () => {
    try {
        isSaving.value = true;

        // 1. Tính subprice
        const subprice = form.original_price - form.discount_price;

        // 2. Gộp optionPlus từ advancedOptions động
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

        console.log("advancedOptions:", advancedOptions.value);
        console.log("option_plus trước gửi:", option_plus);

        // 3. Tạo sản phẩm dạng draft
        const res = await $fetch(`${apiBaseUrl}/products`, {
            method: "POST",
            body: {
                ...form,
                price: subprice,
                option_plus: option_plus,
                status: "draft"
            }
        });

        const productId = res.product_id;
        console.log("productId:", productId);


        // 4. Upload ảnh chính (main image)
        const formMain = new FormData();
        let mainImagePath = ""
        const detailImagePaths = []

        formMain.append("file", mainImageFile.value);
        formMain.append("type", "main");
        formMain.append("product_id", productId);
        const mainRes = await $fetch(`${apiBaseUrl}/upload/main/${productId}`, {
            method: "POST",
            body: formMain
        });
        mainImagePath = `/${mainRes.path}`
        console.log("mainImagePath:", mainImagePath);
        // 5. Upload ảnh chi tiết
        for (let i = 0; i < detailImageFiles.value.length; i++) {
            const formDetail = new FormData();
            formDetail.append("file", detailImageFiles.value[i]);
            formDetail.append("type", "detail");
            formDetail.append("product_id", productId);
            formDetail.append("index", i);
            const detailRes = await $fetch(`${apiBaseUrl}/upload/detail/${productId}`, {
                method: "POST",
                body: formDetail
            });
            detailImagePaths.push(`/${detailRes.path}`)
        }
        console.log("detailImagePaths:", detailImagePaths);
        // 6. Thêm các option động
        for (let opt of advancedOptions.value) {
            await $fetch(`${apiBaseUrl}/product-options`, {
                method: "POST",
                body: {
                    product_id: productId,
                    options: [{ label: opt.label, value: opt.value }],
                    quantity: opt.quantity
                }
            });
        }

        // 7. Chuyển sang published
        await $fetch(`${apiBaseUrl}/products/${productId}`, {
            method: "PUT",
            body: {
                status: "published",
                main_image: mainImagePath,
                detail_images: detailImagePaths
            }
        });

        // ✅ Hoàn tất
        onClose();
        emit('submitted');

    } catch (error) {
        alert("Có lỗi xảy ra, dữ liệu chưa được lưu.");
        console.error(error);
    } finally {
        isSaving.value = false;
    }
};
</script>
