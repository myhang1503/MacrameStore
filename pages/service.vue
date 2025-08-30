<template>
  <section class="bg-white py-16">
    <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-2xl md:text-3xl font-bold text-center mb-10">
            <Icon name="mdi:clover" class="text-green-600 text-2xl" /> 
            Dịch vụ tại <span class="text-green-700">Saturday Macrame</span>
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Service Item -->
            <div
            v-for="(service, index) in services"
            :key="index"
            class="bg-gray-50 rounded-xl shadow-sm p-6 hover:shadow-lg transition"
            >
            <!-- Image/Icon -->
            <div class="flex justify-center mb-4">
                <img
                :src="service.image"
                :alt="service.title"
                class="w-20 h-20 object-contain"
                />
            </div>
            <!-- Title -->
            <h3 class="text-xl font-semibold text-gray-700 mb-3 text-center">
                {{ service.title }}
            </h3>
            <!-- Description -->
            <ul class="text-gray-600 space-y-1 text-sm">
                <li v-for="(item, idx) in service.items" :key="idx">
                - {{ item }}
                </li>
            </ul>
            </div>
        </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    title: "Bảo trì & Làm mới",
    image: "/services/maintenance.jpg",
    items: [
      "Làm sạch, gỡ rối sợi",
      "Chỉnh sửa những phần lỏng",
      "Áp dụng cho sản phẩm đã mua tại cửa hàng",
    ],
  },
  {
    title: "Thiết kế theo yêu cầu",
    image: "/services/custom.jpg",
    items: [
      "Làm theo kích thước, màu sắc, hoa văn riêng",
      "Hoàn hảo cho nhà cửa, quán cà phê, quà tặng",
    ],
  },
  {
    title: "Gói quà & Viết thiệp",
    image: "/services/gift.jpg",
    items: [
      "Gói quà phong cách boho tinh tế",
      "Thiệp viết tay gửi gắm lời nhắn",
    ],
  },
  {
    title: "Bộ quà tặng Macrame",
    image: "/services/set.jpg",
    items: [
      "Túi tote + Móc khóa + Vòng treo",
      "Phù hợp cho sinh nhật, kỷ niệm, quà tặng",
    ],
  },
  {
    title: "DIY Kit – Tự tay làm tại nhà",
    image: "/services/diy.jpg",
    items: [
      "Bộ nguyên liệu + hướng dẫn chi tiết",
      "Trải nghiệm niềm vui sáng tạo thủ công",
    ],
  },
  {
    title: "Tư vấn trang trí",
    image: "/services/consulting.jpg",
    items: [
      "Gợi ý sản phẩm phù hợp không gian",
      "Giúp macrame thật 'ăn ý' với ngôi nhà của bạn",
    ],
  },
];
</script>
