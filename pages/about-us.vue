<template>
  <section class="bg-white py-10">
    <div class="max-w-6xl mx-auto px-4">
      <!-- Tiêu đề -->
      <h2 class="text-2xl md:text-3xl font-bold text-center mb-10">
        <Icon name="mdi:clover" class="text-green-600 text-2xl" /> 
        Giới thiệu về <span class="text-green-700">Saturday Macrame</span>
      </h2>

      <!-- Phần 1 -->
      <div class="grid md:grid-cols-2 gap-12 items-center mb-10">
        <div>
          <h3 class="text-2xl font-semibold root-text mb-4">
            1. Khởi nguồn từ một ngày Thứ Bảy
          </h3>
          <p class="text-gray-800 leading-relaxed">
            Giữa nhịp sống văn phòng bận rộn và áp lực, tôi chọn dành riêng một ngày Thứ Bảy 
            để thở, để tìm lại sự cân bằng. Và chính trong khoảnh khắc ấy, tôi tình cờ gặp gỡ macrame – 
            những nút thắt tưởng chừng giản đơn nhưng lại mở ra một thế giới sáng tạo đầy cảm hứng.
          </p>
        </div>
        <div>
          <img
            src="/about-us/mustard-sheft.jpg"
            alt="Khởi nguồn Saturday Macrame"
            class="rounded-xl shadow-md"
          />
        </div>
      </div>

      <!-- Phần 2 -->
      <div class="grid md:grid-cols-2 gap-12 items-center mb-10">
        <div class="order-2 md:order-1">
          <img
            src="/about-us/handmade.jpg"
            alt="Trang trí decor không gian sống"
            class="rounded-xl shadow-md"
          />
        </div>
        <div class="order-1 md:order-2">
          <h3 class="text-2xl font-semibold root-text mb-4">
            2. Saturday Macrame – câu chuyện bằng sợi và nút thắt
          </h3>
          <p class="text-gray-800 leading-relaxed">
            Từ niềm đam mê đó, <span class="font-medium">Saturday Macrame</span>
            ra đời như một không gian nhỏ để gửi gắm tình yêu với sự thủ công.  
            Chúng tôi tập trung vào các sản phẩm macrame handmade mang hơi thở boho phóng khoáng 
            và nét vintage tinh tế – từ túi xách, wall hanging đến kệ treo và những món décor độc đáo.
            <br/><br/>
            Mỗi sản phẩm không chỉ là một phụ kiện, mà còn là mảnh ghép cá tính, 
            phản chiếu phong cách riêng của bạn.
          </p>
        </div>
      </div>

      <!-- Phần 3 -->
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 class="text-2xl font-semibold root-text mb-4">
            3. Định hướng
          </h3>
          <p class="text-gray-800 leading-relaxed">
            <span class="font-medium">Saturday Macrame</span> mong muốn mang đến cho bạn 
            những sản phẩm thủ công bền đẹp, tinh tế trong từng chi tiết, 
            thân thiện với môi trường và đậm chất cá nhân.
            <br/><br/>
            Bên cạnh việc sáng tạo, chúng tôi cũng chia sẻ kiến thức và cảm hứng về macrame, 
            để bất cứ ai yêu thích cũng có thể tự tay tạo nên những tác phẩm mang dấu ấn riêng.
          </p>
        </div>
        <div>
          <img
            src="/about-us/bucket-bag.jpg"
            alt="Túi xách macrame handmade"
            class="rounded-xl shadow-md"
          />
        </div>
      </div>

      <!-- Phần 4: Cam kết CTA -->
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 class="text-2xl font-semibold root-text mb-4">
            4. Cam kết
          </h3>
          <p class="text-gray-600 leading-relaxed">
            Chúng tôi cam kết mang đến những sản phẩm macrame thủ công tinh tế, bền đẹp và độc đáo.  
            Hãy khám phá bộ sưu tập để tìm món đồ phù hợp, hoặc đặt hàng theo yêu cầu riêng dành cho bạn.
          </p>
        </div>
        <div>
          <a 
            href="/" 
            class="inline-flex items-center gap-2 root-bg text-white px-2 py-1 shadow-md"
          >
            <Icon name="mdi:shopping-outline" class="text-lg" />
            Khám phá sản phẩm
          </a>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "Về chúng tôi | Saturday Macrame",
        description: "Khám phá câu chuyện Saturday Macrame – thương hiệu Macrame handmade tinh tế, sáng tạo và mang đậm dấu ấn cá nhân.",
        mainEntity: {
          "@type": "Organization",
          name: "Saturday Macrame",
          url: "https://saturdaymacrame.com",
          logo: "https://saturdaymacrame.com/logo.png",
          sameAs: [
            "https://www.facebook.com/saturdaymacrame",
            "https://www.instagram.com/saturdaymacrame"
          ]
        }
      })
    } as any // 👈 ép kiểu để không bị lỗi
  ]
})
useSeoMeta({
  title: 'Về chúng tôi',
  description: 'Khám phá câu chuyện Saturday Macrame – mỗi sản phẩm handmade là sự kết hợp của đam mê, sáng tạo và sự tỉ mỉ. Khám phá ngay!',
  ogTitle: 'Saturday Macrame – Hành trình thương hiệu handmade',
  ogDescription: 'Khám phá hành trình Saturday Macrame cùng những sản phẩm macrame handmade tinh tế, sáng tạo và mang đậm dấu ấn cá nhân.',
  ogImage: '/cover.png'
})
</script>
