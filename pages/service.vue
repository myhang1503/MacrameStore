<template>
  <section class="bg-white py-10">
    <div class="max-w-6xl mx-auto px-4">
      <!-- Hero -->
      <h1 class="text-3xl md:text-4xl font-bold text-center mb-10">
        <Icon name="mdi:clover" class="text-green-600 text-2xl" /> 
        Dịch vụ tại <span class="text-green-700">Saturday Macrame</span>
      </h1>

      <!-- Services Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="bg-gray-50 rounded-xl shadow-sm p-6 flex flex-col justify-between"
        >
          <!-- Image -->
          <div class="flex justify-center mb-4">
            <img
              :src="service.image"
              :alt="service.alt"
              class="w-20 h-20 object-contain"
            />
          </div>

          <!-- Title -->
          <h2 class="text-xl font-semibold text-gray-700 mb-3 text-center">
            {{ service.title }}
          </h2>

          <!-- Description -->
          <ul class="text-gray-600 space-y-1 text-sm mb-4">
            <li v-for="(item, idx) in service.items" :key="idx">
              - {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <!-- CTA chung -->
      <div class="mt-12 text-center">
        <!-- Nút chính -->
        <a
          href="mailto:saturdaymacrame.store@gmail.com?subject=Tư vấn dịch vụ&body=Chào Saturday Macrame,%0D%0ATôi quan tâm đến dịch vụ của bạn. Vui lòng tư vấn giúp tôi."
          class="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-medium hover:bg-green-700"
        >
          <Icon name="mdi:email-outline" class="mr-2" /> Liên hệ qua Email
        </a>

        <!-- Nút phụ -->
        <div class="flex justify-center gap-4 mt-4">
          <a
            href="https://m.me/saturdaymacrame.store"
            target="_blank"
            class="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <Icon name="mdi:facebook-messenger" class="mr-2" /> Messenger
          </a>
          <a
            href="https://zalo.me/932842053"
            target="_blank"
            class="inline-flex items-center bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600"
          >
            <Icon name="simple-icons:zalo" class="mr-2" /> Zalo
          </a>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script setup>
import { useHead } from '#app'

const services = [
  {
    title: "Bảo trì & Làm mới",
    image: "/services/maintenance.jpg",
    alt: "Dịch vụ bảo trì và làm mới sản phẩm Macrame",
    items: [
      "Làm sạch, gỡ rối sợi",
      "Chỉnh sửa những phần lỏng",
      "Áp dụng cho sản phẩm đã mua tại cửa hàng",
    ],
  },
  {
    title: "Thiết kế theo yêu cầu",
    image: "/services/custom.jpg",
    alt: "Dịch vụ thiết kế Macrame theo yêu cầu",
    items: [
      "Làm theo kích thước, màu sắc, hoa văn riêng",
      "Hoàn hảo cho nhà cửa, quán cà phê, quà tặng",
    ],
  },
  {
    title: "Gói quà & Viết thiệp",
    image: "/services/gift.jpg",
    alt: "Dịch vụ gói quà Macrame và viết thiệp",
    items: [
      "Gói quà phong cách boho tinh tế",
      "Thiệp viết tay gửi gắm lời nhắn",
    ],
  },
  {
    title: "DIY Kit – Tự tay làm tại nhà",
    image: "/services/diy.jpg",
    alt: "Bộ DIY Kit Macrame – tự tay làm tại nhà",
    items: [
      "Bộ nguyên liệu + hướng dẫn chi tiết",
      "Trải nghiệm niềm vui sáng tạo thủ công",
    ],
  },
];

// SEO + JSON-LD FAQPage
useHead({
  title: 'Dịch vụ | Thiết kế & làm Macrame theo yêu cầu',
  meta: [
    { name: 'description', content: 'Saturday Macrame cung cấp dịch vụ Macrame handmade theo yêu cầu – độc đáo, tinh tế và mang dấu ấn cá nhân.' },
  ],
  link: [],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Saturday Macrame có nhận thiết kế theo yêu cầu không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Có, chúng tôi nhận thiết kế Macrame handmade theo kích thước, màu sắc và hoa văn riêng của bạn."
            }
          },
          {
            "@type": "Question",
            "name": "Có thể bảo trì sản phẩm Macrame đã mua không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Có, chúng tôi cung cấp dịch vụ làm sạch, gỡ rối sợi và chỉnh sửa các phần lỏng cho sản phẩm Macrame."
            }
          },
          {
            "@type": "Question",
            "name": "DIY Kit có hướng dẫn chi tiết không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Có, mỗi bộ DIY Kit đi kèm hướng dẫn chi tiết giúp bạn tự tay hoàn thành sản phẩm tại nhà."
            }
          }
        ]
      })
    }
  ]
})
</script>
