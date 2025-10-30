<template>
  <section class="bg-white py-10">
    <div class="max-w-6xl mx-auto px-4">
      <!-- Hero -->
      <h1 class="text-3xl md:text-4xl font-bold text-center mb-10">
        🌿 Chính sách & Hỗ trợ tại <span class="text-green-700">Saturday Macrame</span>
      </h1>

      <!-- Chính sách & Dịch vụ -->
      <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        <div
          v-for="(policy, index) in policies"
          :key="index"
          class="bg-gray-50 rounded-xl shadow-sm p-6 flex flex-col justify-between"
        >
          <!-- Icon -->
          <div class="flex justify-center mb-4 text-4xl">
            {{ policy.icon }}
          </div>

          <!-- Title -->
          <h2
            class="text-xl font-semibold text-gray-700 mb-3 text-center"
          >
            {{ policy.title }}
          </h2>

          <!-- Description -->
          <ul class="text-gray-600 space-y-1 text-sm mb-4">
            <li v-for="(item, idx) in policy.items" :key="idx">
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
useSeoMeta({
  title: 'Chính sách & Hỗ trợ',
  description: 'Xem chi tiết chính sách mua hàng, đổi trả, bảo hành và hỗ trợ khách hàng tại Saturday Macrame.',
  ogTitle: 'Chính sách & Hỗ trợ | Saturday Macrame',
  ogDescription: 'Chính sách đổi trả, bảo hành và hỗ trợ khách hàng khi mua sản phẩm Macrame handmade tại Saturday Macrame.',
  ogImage: '/cover.png'
})

const policies = [
  {
    icon: '🧶',
    title: 'Đặt hàng',
    items: [
      'Tất cả sản phẩm được làm thủ công theo yêu cầu.',
      'Thời gian hoàn thiện: từ 10–15 ngày kể từ khi nhận cọc.'
    ]
  },
  {
    icon: '💳',
    title: 'Thanh toán',
    items: [
      'Cọc tối thiểu 50% để bắt đầu làm.',
      'Phần còn lại thanh toán khi sản phẩm hoàn thiện.'
    ]
  },
  {
    icon: '📦',
    title: 'Giao hàng',
    items: [
      'Gửi qua Giao Hàng Nhanh hoặc Viettel Post.',
      'Thời gian giao: 1–5 ngày tùy khu vực.'
    ]
  },
  {
    icon: '🔄',
    title: 'Đổi trả',
    items: [
      'Vì sản phẩm được làm riêng, không hỗ trợ đổi trả.',
      'Liên hệ trong 24h sau khi nhận hàng để được hỗ trợ.'
    ]
  }
]
</script>

