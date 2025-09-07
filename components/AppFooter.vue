<template>
  <footer class="w-full">
    <!-- MAIN FOOTER -->
    <section class="root-bg text-[#e7e7e7] flex justify-center">
      <div class="max-w-[1600px] w-full px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Col 1 -->
        <div>
          <h3 class="font-bold text-white mb-3">SATURDAY MACRAME</h3>
          <p class="text-sm leading-relaxed">Saturday Macrame – nơi gửi gắm câu chuyện bằng sợi và nút thắt tay.</p>
          <p class="text-sm leading-relaxed">Mỗi sản phẩm là món quà thủ công đầy tâm huyết, tinh tế và mang dấu ấn cá nhân.</p>
          <p class="text-sm leading-relaxed">
            <Icon name="emojione:four-leaf-clover" class="text-green-600" />
            Hãy cùng khám phá thế giới Macrame – mang hơi thở thủ công vào cuộc sống.
          </p>
        </div>

        <!-- Col 2 -->
        <div>
          <h3 class="font-bold text-white mb-3">Thông tin</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink to="/policy">
                • Hướng dẫn mua hàng <span class="ml-1">›</span>
              </NuxtLink>
            </li>
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
            <Icon name="logos:google-maps" class="text-xl" />TP.Hồ Chí Minh
          </p>
          <div class="mt-4 flex items-center gap-4 text-white/90">
            <PhoneNumber phone="+84 932 842 053" :show-actions="true" />
          </div>
          <p class="text-sm mt-2 flex items-center gap-2">
            <Icon name="logos:google-gmail"/>
            <a 
              href="mailto:saturdaymacrame.store@gmail.com?subject=Y%C3%AAu%20c%E1%BA%A7u%20h%E1%BB%97%20tr%E1%BB%A3&body=Xin%20ch%C3%A0o%20Saturday%20Macrame,%0A%0AT%C3%B4i%20mu%E1%BB%91n%20h%E1%BB%8Fi%20v%E1%BB%81%20s%E1%BA%A3n%20ph%E1%BA%A9m%20c%E1%BB%A7a%20b%E1%BA%A1n.%0A%0AXin%20c%E1%BA%A3m%20%C6%A1n!"
              class="hover:underline"
            >
              saturdaymacrame.store@gmail.com
            </a>
          </p>
          <div class="mt-4 flex items-center gap-4 text-white/90">
            <span class="text-sm">Theo dõi chúng tôi tại: </span>
            <a href="https://www.instagram.com/saturday.macrame" aria-label="Instagram" class="hover:opacity-80">
              <Icon name="skill-icons:instagram" class="text-2xl" />
            </a>
            <a href="https://youtube.com/@saturdaymacrame" aria-label="YouTube" class="hover:opacity-80">
              <Icon name="logos:youtube-icon" class="text-2xl" />
            </a>
            <a href="https://www.facebook.com/saturdaymacrame.store" aria-label="Facebook" class="hover:opacity-80">
              <Icon name="logos:facebook" class="text-2xl" />
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
