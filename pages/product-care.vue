<template>
  <section class="bg-white py-6">
    <div class="max-w-6xl mx-auto px-4">
      
      <!-- Hero -->
      <div class="relative bg-green-50 py-6 px-6 rounded-lg mb-6 text-center">
        <Icon name="mdi:clover" class="text-green-600 text-4xl mb-3 mx-auto" />
        <h1 class="text-3xl md:text-4xl font-bold mb-4">
          Hướng dẫn bảo quản túi Macrame
        </h1>
        <p class="text-gray-700 max-w-2xl mx-auto">
          Túi macrame handmade từ sợi cotton tự nhiên cần chăm sóc đúng cách để giữ form và độ bền. Tham khảo các hướng dẫn sau.
        </p>
      </div>

      <!-- Hình minh họa -->
      <figure class="mb-12">
        <img
          src="/services/huong-dan-bao-quan.jpg"
          alt="Cách bảo quản và vệ sinh túi macrame handmade"
          class="rounded-lg shadow-md mx-auto"
        />
        <figcaption class="text-center text-sm text-gray-500 mt-2">
          Bảo quản và vệ sinh túi macrame handmade đúng cách
        </figcaption>
      </figure>

      <!-- Hướng dẫn -->
      <div class="grid md:grid-cols-2 gap-6 mb-10">
        <div class="p-5 border rounded-lg shadow-sm md:col-span-2">
          <h2 class="text-lg font-semibold mb-2">🧺 Giặt & vệ sinh</h2>
          <ul class="list-disc list-inside text-gray-700 space-y-1">
            <li>Giặt tay bằng nước lạnh, ấn nhẹ, không chà xát mạnh.</li>
            <li>Không giặt máy, không dùng chất tẩy mạnh.</li>
            <li>Vết bẩn nhẹ: lau bằng khăn trắng ẩm với xà phòng dịu nhẹ.</li>
            <li>Vết bẩn nặng (cà phê, rượu vang): xả nước lạnh 3–5 phút từ mặt sau, chà nhẹ, dùng xà phòng dịu nhẹ nếu cần.</li>
            <li>Ép nhẹ bằng khăn, trải phẳng, phơi trong bóng râm, tránh ánh nắng trực tiếp.</li>
          </ul>
        </div>

        <div class="p-5 border rounded-lg shadow-sm md:col-span-2">
          <h2 class="text-lg font-semibold mb-2">📦 Bảo quản khi không sử dụng</h2>
          <ul class="list-disc list-inside text-gray-700 space-y-1">
            <li>Nhét giấy mềm hoặc vải cotton để giữ form.</li>
            <li>Cất trong túi vải/bao cotton, nơi khô ráo, thoáng mát.</li>
            <li>Tránh ánh nắng trực tiếp, môi trường ẩm mốc, nguồn nhiệt cao.</li>
            <li>Không treo túi quá lâu để quai không biến dạng.</li>
          </ul>
        </div>
      </div>

      <!-- Checklist / Quick tips -->
      <div class="bg-green-50 border border-green-200 rounded-xl shadow-sm p-8 text-center">
        <h2 class="text-xl md:text-2xl font-bold text-green-700 mb-6">
          ✅ Checklist bảo quản nhanh
        </h2>
        <div class="grid sm:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
          <div class="flex items-start space-x-3">
            <Icon name="mdi:hand-wash" class="text-green-600 text-2xl" />
            <p>Giặt tay bằng nước lạnh, không chà xát mạnh.</p>
          </div>
          <div class="flex items-start space-x-3">
            <Icon name="mdi:washing-machine-off" class="text-green-600 text-2xl" />
            <p>Không giặt máy, không dùng chất tẩy mạnh.</p>
          </div>
          <div class="flex items-start space-x-3">
            <Icon name="mdi:weather-sunny-off" class="text-green-600 text-2xl" />
            <p>Phơi trong bóng râm, tránh ánh nắng trực tiếp.</p>
          </div>
          <div class="flex items-start space-x-3">
            <div class="relative">
              <Icon name="mdi:iron" class="text-green-600 text-2xl" />
              <Icon name="mdi:slash-forward" class="absolute inset-0 text-2xl text-green-600 transform -scale-x-100" />
            </div>
            <p>Không ủi, không sấy khô.</p>
          </div>
          <div class="flex items-start space-x-3">
            <Icon name="mdi:bag-personal" class="text-green-600 text-2xl" />
            <p>Nhét giấy/vải cotton để giữ form.</p>
          </div>
          <div class="flex items-start space-x-3">
            <Icon name="mdi:home-roof" class="text-green-600 text-4xl" />
            <p>Cất ở nơi khô ráo, thoáng mát, tránh ẩm mốc và nguồn nhiệt cao.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Hướng dẫn bảo quản túi Macrame',
  description:
    'Hướng dẫn chi tiết cách giặt, vệ sinh và bảo quản túi macrame handmade. Giữ form dáng, tránh xù sợi, kéo dài tuổi thọ sản phẩm.',
  keywords:
    'bảo quản túi macrame, cách giặt túi macrame, vệ sinh túi handmade, giặt túi macrame',
  ogTitle: 'Hướng dẫn bảo quản túi Macrame | Saturday Macrame',
  ogDescription:
    'Hướng dẫn vệ sinh, sử dụng và bảo quản sản phẩm Macrame handmade đúng cách.',
  ogImage: '/cover.png'
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Làm sao để giặt túi macrame đúng cách?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Giặt tay bằng nước lạnh, ấn nhẹ, không chà xát mạnh. Không giặt máy, không dùng chất tẩy mạnh.'
            }
          },
          {
            '@type': 'Question',
            name: 'Nếu túi macrame bị dính cà phê hoặc rượu vang thì làm sao?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Xả nước lạnh 3–5 phút từ mặt sau, chà nhẹ. Có thể dùng xà phòng dịu nhẹ.'
            }
          },
          {
            '@type': 'Question',
            name: 'Có được ủi hoặc sấy khô túi macrame không?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Không. Túi macrame không nên ủi hoặc sấy khô. Phơi nơi thoáng mát, tránh ánh nắng trực tiếp.'
            }
          },
          {
            '@type': 'Question',
            name: 'Nên bảo quản túi macrame như thế nào khi không sử dụng?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nhét giấy mềm hoặc vải cotton để giữ form, cất trong túi vải/bao cotton, nơi khô ráo, thoáng mát, tránh ẩm mốc.'
            }
          }
        ]
      })
    }
  ]
})
</script>
