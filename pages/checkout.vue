<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-center p-4">
    <div class="bg-white w-full max-w-5xl rounded-lg shadow-lg flex flex-col overflow-hidden relative">

      <div class="w-full p-4 border-b border-gray-300">
        <h3 class="text-lg font-semibold mb-2">Đơn hàng</h3>
        <div v-for="(item, index) in cartItems" :key="index" class="flex items-start gap-4 py-3">
          <div>{{ index + 1 }}.</div>
          <img :src="item.main_image" alt="Image" class="w-16 h-16 object-cover rounded" />
          <div class="flex-1">
            <p class="font-medium">{{ item.name }}</p>
            <div class="text-sm text-gray-500">
              <div v-for="(val, key) in item.selectedOptions" :key="key">
                {{ key }}: {{ val }}
              </div>
              Số lượng: {{ item.quantity }}
            </div>
          </div>
          <p class="font-semibold whitespace-nowrap">{{ item.price.toLocaleString() }}đ</p>
        </div>
      </div>

      <div class="w-full p-4">
        <h2 class="text-xl font-bold mb-4">Thông tin khách hàng</h2>

        <!-- === FORM === -->
        <div class="flex flex-col gap-4">
          <!-- Họ tên -->
          <div>
            <label class="block text-sm font-medium mb-1">Họ tên người nhận <b class="text-red-600">*</b></label>
            <input v-model="form.buyer_name"
              :class="['border p-2 rounded w-full', errorFields.buyer_name ? 'border-red-500' : '']" />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium mb-1">Email người nhận <b class="text-red-600">*</b></label>
            <input v-model="form.receiver_email" type="email"
              :class="['border p-2 rounded w-full', errorFields.receiver_email ? 'border-red-500' : '']" />
          </div>

          <!-- Điện thoại -->
          <div>
            <label class="block text-sm font-medium mb-1">Số điện thoại <b class="text-red-600">*</b></label>
            <input v-model="form.receiver_phone" @input="form.receiver_phone = form.receiver_phone.replace(/\D/g, '')"
              :class="['border p-2 rounded w-full', errorFields.receiver_phone ? 'border-red-500' : '']" />
          </div>

          <!-- Địa chỉ -->
          <div>
            <label class="block text-sm font-medium mb-1">Địa chỉ nhận hàng <b class="text-red-600">*</b></label>
            <input v-model="form.address_detail" placeholder="Nhập số nhà, tên đường..."
              :class="['border p-2 rounded w-full', errorFields.address_detail ? 'border-red-500' : '']" />
          </div>

          <!-- Tỉnh / Huyện / Xã -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tỉnh / Thành phố</label>
              <select v-model.number="form.province_id" :disabled="!provinces.length"
                :class="['border p-2 rounded w-full', errorFields.province_id ? 'border-red-500' : '']">
                <option disabled value="">Chọn tỉnh</option>
                <option v-for="p in provinces" :key="p.PROVINCE_ID" :value="p.PROVINCE_ID">
                  {{ toTitleCase(p.PROVINCE_NAME) }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Quận / Huyện</label>
              <select v-model.number="form.district_id"
                :class="['border p-2 rounded w-full', errorFields.district_id ? 'border-red-500' : '']">
                <option disabled value="">Chọn quận/huyện</option>
                <option v-for="d in districts" :key="d.DISTRICT_ID" :value="d.DISTRICT_ID">
                  {{ toTitleCase(d.DISTRICT_NAME) }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Xã / Phường</label>
              <select v-model.number="form.ward_code" :disabled="!wards.length"
                :class="['border p-2 rounded w-full', errorFields.ward_code ? 'border-red-500' : '']">
                <option disabled value="">Chọn phường/xã</option>
                <option v-for="w in wards" :key="w.WARDS_ID" :value="w.WARDS_ID">
                  {{ toTitleCase(w.WARDS_NAME) }}
                </option>
              </select>
            </div>
          </div>

          <!-- Địa chỉ đầy đủ -->
          <div>
            <label class="block text-sm font-medium mb-1 text-gray-600">Địa chỉ đầy đủ:</label>
            <p class="text-sm text-gray-700">{{ form.shipping_address }}</p>
          </div>
          <p v-if="shipping_fee_error" class="text-sm mt-1" :class="shipping_fee_error ? 'text-red-500' : ''">
            {{ shipping_fee_error_Message }}
          </p>
          <!-- Hóa đơn VAT -->
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="form.invoice_required" />
            Yêu cầu xuất hóa đơn VAT
          </label>

          <div v-if="form.invoice_required" class="space-y-3">
            <div>
              <label class="block text-sm font-medium mb-1">Tên công ty <b class="text-red-600">*</b></label>
              <input v-model="form.buyer_company"
                :class="['border p-2 rounded w-full', errorFields.buyer_company ? 'border-red-500' : '']" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Địa chỉ công ty <b class="text-red-600">*</b></label>
              <input v-model="form.company_address"
                :class="['border p-2 rounded w-full', errorFields.company_address ? 'border-red-500' : '']" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Mã số thuế công ty <b class="text-red-600">*</b></label>
              <input v-model="form.buyer_tax_code" @input="form.buyer_tax_code = form.buyer_tax_code.replace(/\D/g, '')"
                :class="['border p-2 rounded w-full', errorFields.buyer_tax_code ? 'border-red-500' : '']" />
            </div>
          </div>

          <!-- Mã giảm giá -->
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Mã giảm giá</label>
            <div class="flex gap-2">
              <input v-model="form.discount_code" class="border p-2 rounded flex-1" placeholder="Nhập mã giảm giá" />
              <button @click="applyDiscount" type="button" class="bg-black text-white px-4 py-2 rounded">
                Áp dụng
              </button>
            </div>
            <p v-if="discountMessage" class="text-sm mt-1" :class="discountSuccess ? 'text-green-600' : 'text-red-500'">
              {{ discountMessage }}
            </p>
          </div>

          <!-- Phương thức thanh toán -->
          <div>
            <label class="block text-sm font-medium mb-1">
              Phương thức thanh toán <b class="text-red-600">*</b>
            </label>

            <div class="flex flex-col gap-2">
              <label class="flex items-center">
                <input type="radio" value="BANK" v-model="form.payment_method" class="mr-2" />
                Chuyển khoản ngân hàng (BANK)
              </label>
              <label class="flex items-center">
                <input type="radio" value="COD" v-model="form.payment_method" class="mr-2" />
                Thanh toán khi nhận hàng (COD)
              </label>


            </div>

            <!-- Thông báo cọc 50% khi chọn COD -->
            <div v-if="form.payment_method === 'COD'" class="mt-2 text-sm text-orange-600 bg-orange-50 p-2 rounded">
              * Vui lòng cọc trước ({{ (totalPrice / 2).toLocaleString() }}₫). Thông tin tài
              khoản sẽ được shop gửi qua mail sau khi xác nhận đặt hàng
            </div>
            <div v-if="form.payment_method === 'BANK'" class="mt-2 text-sm text-orange-600 bg-orange-50 p-2 rounded">
              * Thông tin tài khoản sẽ được shop gửi qua mail sau khi xác nhận đặt hàng
            </div>


          </div>
          <div class="mb-4">
            <p class="text-sm mt-1 text-red-500">
              *Lưu ý: Sau khi shop xác nhận nhận cọc, đơn hàng sẽ được giao dự kiến trong khoảng 15 ngày.
            </p>
          </div>
          <!-- Tổng tiền -->
          <div class="text-right text-sm pt-4 border-t">
            <p class="text-gray-600">Tạm tính: {{ subtotal.toLocaleString() }}đ</p>
            <p class="text-gray-600">VAT ({{ form.vat_rate }}%): {{ vatAmount.toLocaleString() }}đ</p>
            <p class="text-gray-600">Giảm giá: {{ form.discount_amount.toLocaleString() }}đ</p>
            <p class="text-lg font-bold">Tổng cộng: {{ totalPrice.toLocaleString() }}đ</p>
          </div>

          <!-- Nút xác nhận -->
          <div class="text-right">
            <button @click="submitOrder" class="bg-black text-white px-6 py-2 rounded">
              Xác nhận đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="isLoading" class="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center text-white text-lg">
    <div class="flex flex-col items-center">
      <!-- LOGO -->
      <img src="/loading.gif" alt="Loading..." class="w-32 h-32 mb-4 object-contain" />
      <!-- TEXT -->
      <p class="text-white text-lg font-semibold mb-1">
        {{ loadingMessage }}
      </p>

      <!-- Mô tả phụ -->
      <p class="text-white text-sm" v-if="loadingStatus === 'processing'">
        Vui lòng không tắt trình duyệt hoặc làm mới trang.
      </p>

      <!-- Nút Xem đơn hàng -->
      <button v-if="loadingStatus !== 'processing'" @click="isLoading = false"
        class="mt-4 px-4 py-2 bg-white root-text rounded hover:bg-gray-100 transition">
        Xem đơn hàng </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, inject } from "vue";
const { public: { apiBaseUrl } } = useRuntimeConfig();

const cartItems = ref([])
const emit = defineEmits(['close', 'submit'])
const clearCart = inject('clearCart')
onMounted(() => {
  const saved = localStorage.getItem('checkoutCart')
  if (saved) {
    cartItems.value = JSON.parse(saved)
  }
})
// === FORM DATA ===
const form = reactive({
  receiver_phone: "",
  receiver_email: "",
  buyer_name: "",
  buyer_company: "",
  company_address: "",
  buyer_tax_code: "",
  shipping_address: "",
  address_detail: "",
  province_id: "",
  district_id: "",
  ward_code: "",
  payment_method: "BANK",
  invoice_required: false,
  shipping_fee: 0,
  vat_rate: 10,
  discount_code: "",
  discount_amount: 0,
  cartItems: cartItems.value,
  user_id: 1,
});

const errorFields = ref({});
Object.assign(errorFields.value, {
  buyer_name: false,
  receiver_email: false,
  receiver_phone: false,
  shipping_address: false,
  address_detail: false,
  payment_method: false,
  buyer_company: false,
  company_address: false,
  buyer_tax_code: false,
  province_id: false,
  district_id: false,
  ward_code: false,
});

const initialForm = {
  discount_code: '',
  discount_amount: 0,
};

//const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

const vatAmount = computed(() => Math.round((subtotal.value * form.vat_rate) / 100));

const totalPrice = computed(() =>
  subtotal.value + form.shipping_fee + vatAmount.value - form.discount_amount
);

const provinces = ref([]);
const districts = ref([]);
const wards = ref([]);

const provinceName = ref("");
const districtName = ref("");
const wardName = ref("");

const toTitleCase = (str) =>
  str.toLowerCase().split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

const loadProvinces = async () => {
  provinces.value = await $fetch(`${apiBaseUrl}/viettel/provinces`).then((res) => res.data);
};
const loadDistricts = async (provinceId) => {
  if (!provinceId) return;
  districts.value = await $fetch(`${apiBaseUrl}/viettel/districts?provinceId=${provinceId}`);
};
const loadWards = async (districtId) => {
  if (!districtId) return;
  wards.value = await $fetch(`${apiBaseUrl}/viettel/wards?districtId=${districtId}`).then(
    (res) => res || []
  );
};

onMounted(() => loadProvinces());

watch(() => form.province_id, (newVal) => {

  form.district_id = ''
  form.ward_code = ''
  form.shipping_address = ''
  form.shipping_fee = 0

  districtName.value = ''
  wardName.value = ''

  districts.value = []
  wards.value = []
  loadDistricts(newVal)
})

const shipping_fee_error = ref(false)
const shipping_fee_error_Message = ref('')


watch(() => form.district_id, async (newVal) => {
  form.ward_code = ''
  form.shipping_address = ''
  form.shipping_fee = 0
  wardName.value = ''
  wards.value = []
  await loadWards(newVal)

  shipping_fee_error.value = false
  shipping_fee_error_Message.value = ''
  // 👉 Check đủ dữ liệu thì mới gọi API
  provinceName.value = provinces.value.find(p => p.PROVINCE_ID === form.province_id)?.PROVINCE_NAME || ''
  districtName.value = districts.value.find(d => d.DISTRICT_ID === form.district_id)?.DISTRICT_NAME || ''
  wardName.value = wards.value.find(w => w.WARDS_ID === form.ward_code)?.WARDS_NAME || ''

  if (form.province_id && form.district_id && provinceName.value && districtName.value) {
    try {
      const response = await $fetch(`${apiBaseUrl}/viettel/shipfee`, {
        method: 'POST',
        body: {
          quantity: totalQuantity,
          total_price_before_tax: subtotal.value,
          vat: vatAmount.value,
          discount: form.discount_amount,
          receiver_province: form.province_id,
          receiver_district: form.district_id,
        }
      })

      form.shipping_fee = response.data?.MONEY_TOTAL || 0
    } catch (err) {

      form.shipping_fee = 0
      shipping_fee_error.value = true
      shipping_fee_error_Message.value = 'Tạm thời chưa thể hiển thị phí vận chuyển, shop sẽ báo lại sau khi xác nhận đơn nhé!'

    }
  }
})


watch(
  [() => form.ward_code, () => form.district_id, () => form.province_id, () => form.address_detail],
  async () => {
    // 🔄 Cập nhật tên tương ứng
    provinceName.value = provinces.value.find(p => p.PROVINCE_ID === form.province_id)?.PROVINCE_NAME || ''
    districtName.value = districts.value.find(d => d.DISTRICT_ID === form.district_id)?.DISTRICT_NAME || ''
    wardName.value = wards.value.find(w => w.WARDS_ID === form.ward_code)?.WARDS_NAME || ''

    // ✅ Chỉ xử lý khi đủ cả 3 giá trị
    if (provinceName.value && districtName.value && wardName.value) {
      form.shipping_address = `${form.address_detail}, ${toTitleCase(wardName.value)}, ${toTitleCase(provinceName.value)}`

    } else {
      form.shipping_address = ''
    }
  }
)

// === Giảm giá ===
const discountMessage = ref("");
const discountSuccess = ref(false);
const applyDiscount = async () => {
  discountMessage.value = "";
  discountSuccess.value = false;
  form.discount_amount = 0;
  try {
    const res = await fetch(`${apiBaseUrl}/discounts/${form.discount_code}`);
    if (!res.ok) throw new Error("Không tìm thấy mã giảm giá");
    const discount = await res.json();
    let discountAmount = 0;
    if (discount.discount_type === "percent") {
      discountAmount = (subtotal.value * discount.discount_value) / 100;
      if (discount.max_discount_value)
        discountAmount = Math.min(discountAmount, discount.max_discount_value);
    } else {
      discountAmount = discount.max_discount_value;
    }
    form.discount_amount = Math.floor(discountAmount);
    discountMessage.value = `Áp dụng mã thành công! Giảm ${form.discount_amount.toLocaleString()}đ`;
    discountSuccess.value = true;
  } catch {
    discountMessage.value = "Không tìm thấy hoặc có lỗi khi áp dụng mã.";
  }
};

// === Submit ===
const submitOrder = () => {
  // Reset tất cả lỗi
  Object.keys(errorFields.value).forEach(key => errorFields.value[key] = false);

  let hasError = false;

  // Check các trường bắt buộc chung
  if (!form.buyer_name) {
    errorFields.value.buyer_name = true;
    hasError = true;
  }
  if (!form.receiver_email) {
    errorFields.value.receiver_email = true;
    hasError = true;
  } else {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.receiver_email);
    if (!isValidEmail) {
      alert("Email không hợp lệ.");
      errorFields.value.receiver_email = true;
      hasError = true;
      return;
    }
  }
  if (!form.receiver_phone) {
    errorFields.value.receiver_phone = true;
    hasError = true;

  }
  if (!form.address_detail) {
    errorFields.value.address_detail = true;
    hasError = true;
  }
  // Kiểm tra địa chỉ (các trường select)
  if (!form.province_id) {
    errorFields.value.province_id = true;
    hasError = true;
  }
  if (!form.district_id) {
    errorFields.value.district_id = true;
    hasError = true;
  }
  if (!form.ward_code) {
    errorFields.value.ward_code = true;
    hasError = true;
  }
  // Nếu yêu cầu xuất hóa đơn, check thêm
  if (form.invoice_required) {
    ['buyer_company', 'company_address', 'buyer_tax_code'].forEach(field => {
      if (!form[field]) {
        errorFields.value[field] = true;
        hasError = true;
      }
    });
  }
  if (hasError) {
    alert('Vui lòng điền đầy đủ thông tin bắt buộc.');
    return;
  }
  // Gửi dữ liệu
  handleCheckoutSubmit({
    ...form,
    total_price: totalPrice.value,
    total_price_before_tax: subtotal.value,
    vat_amount: vatAmount.value,
    province_id: form.province_id,
    district_id: form.district_id,
    ward_code: form.ward_code,
    cartItems: cartItems.value // ✅ quan trọng
  });

  form.discount_code = initialForm.discount_code;
  form.discount_amount = initialForm.discount_amount;
  discountMessage.value = '';
  discountSuccess.value = false;
  emit('close');
};

const isLoading = ref(false);
const loadingStatus = ref('processing'); // 'processing', 'success', 'error'
const loadingMessage = ref('Đang xử lý đơn hàng...');

console.log("Start");
const handleCheckoutSubmit = (orderData) => {
  console.log(orderData);
  isLoading.value = true;
  fetch(`${apiBaseUrl}/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  })
    .then(async res => {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Lỗi không xác định")
      }

      loadingStatus.value = 'success';
      loadingMessage.value = "Đặt hàng thành công!";

      clearCart();

    })
    .catch(err => {
      loadingStatus.value = 'error';
      loadingMessage.value = 'Lỗi khi đặt hàng: ' + err.message;
    })
};


</script>
