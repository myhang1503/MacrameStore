<template>
  <footer class="w-full">
    <!-- MAIN FOOTER -->
    <section class="root-bg text-[#e7e7e7] flex justify-center">
      <div class="max-w-[1600px] w-full px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Col 1 -->
        <div>
          <h3 class="font-bold text-white mb-3">SATURDAY MACRAME</h3>
          <p class="text-sm leading-relaxed">
            Saturday Macrame là nơi gửi gắm những câu chuyện bằng sợi và nút thắt tay. Mỗi sản phẩm là một món quà
            được làm thủ công với tâm huyết và sự tỉ mỉ – độc đáo, tinh tế và mang dấu ấn cá nhân.
          </p>
          <br/>
          <p class="text-sm leading-relaxed">Cuối tuần cùng macrame với mình nhé!</p>
        </div>

        <!-- Col 2 -->
        <div>
          <h3 class="font-bold text-white mb-3">Thông tin</h3>
          <ul class="space-y-2 text-sm"> 
            <li>
              <NuxtLink to="/product-care">
                • Hướng dẫn bảo quản <span class="ml-1">›</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/policy">
                • Chính sách và hỗ trợ <span class="ml-1">›</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Col 3 -->
        <div>
          <h3 class="font-bold text-white mb-3">Liên hệ</h3>

          <p class="text-sm flex items-center gap-2">
            <Icon name="lucide:map-pin" class="text-xl" />TP.Hồ Chí Minh
          </p>
          <div class="mt-4 flex items-center gap-4 text-white/90">
            <p class="text-sm flex items-center gap-2">
              <Icon name="lucide:phone" class="text-xl" /> (+84) 932 842 053
            </p>
          </div>
          <p class="text-sm mt-2 flex items-center gap-2">
            <Icon name="lucide:mail" class="text-xl" />
            saturdaymacrame.store@gmail.com
          </p>
          <div class="mt-4 flex items-center gap-4 text-white/90">
            <span class="text-sm">Theo dõi chúng tôi tại: </span>
            <a href="https://www.instagram.com/saturday.macrame" aria-label="Instagram" class="hover:opacity-80">
              <Icon name="lucide:instagram" class="text-2xl" />
            </a>
            <a href="https://youtube.com/@saturdaymacrame" aria-label="YouTube" class="hover:opacity-80">
              <Icon name="lucide:youtube" class="text-2xl" />
            </a>
            <a href="https://www.facebook.com/saturdaymacrame.store" aria-label="Facebook" class="hover:opacity-80">
              <Icon name="lucide:facebook" class="text-2xl" />
            </a>
          </div>
        </div>

      </div>

    </section>


    <!-- COPYRIGHT -->
    <div class="bg-[#262626] text-[#bdbdbd] text-center text-xs py-4 flex justify-center items-center">
      © {{ new Date().getFullYear() }} Saturday Macrame. All rights reserved.
    </div>

    <!-- Floating socials
    <div class="hidden md:flex flex-col gap-3 fixed right-4 bottom-24 z-40">
      <a href="#"
        class="w-11 h-11 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-500 shadow-lg flex items-center justify-center hover:scale-105 transition"
        aria-label="Instagram">
        <Icon name="lucide:instagram" class="w-6 h-6 text-white" />
      </a>
      <a href="#"
        class="w-11 h-11 rounded-full bg-[#1877F2] shadow-lg flex items-center justify-center hover:scale-105 transition"
        aria-label="Facebook">
        <Icon name="lucide:facebook" class="w-6 h-6 text-white" />
      </a>
      <a href="#"
        class="w-11 h-11 rounded-full bg-[#0078FF] shadow-lg flex items-center justify-center hover:scale-105 transition"
        aria-label="Messenger">
        <Icon name="lucide:message-circle" class="w-6 h-6 text-white" />
      </a>
    </div> -->
  </footer>
</template>
