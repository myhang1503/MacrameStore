<template>
  <footer class="w-full">
    <!-- MAIN FOOTER -->
    <section class="root-bg text-[#e7e7e7]">
      <div class="max-w-[1600px] mx-auto px-8 py-10 grid grid-cols-4 gap-8">
        <!-- Col 1 -->
        <div>
          <h3 class="font-bold text-white mb-3">SATURDAY MACRAME</h3>
          <p class="text-sm leading-relaxed opacity-90">
            SATURDAY MACRAME<br />

            Saturday Macrame là nơi gửi gắm những câu chuyện bằng sợi và nút thắt tay. Mỗi sản phẩm là một món quà
            mang phong cách boho, được làm thủ công với tâm huyết và sự tỉ mỉ – độc đáo, tinh tế và mang dấu ấn cá nhân.
          </p>
        </div>

        <!-- Col 2 -->
        <div>
          <h3 class="font-bold text-white mb-3">HDSD &amp; HĐBQ</h3>
          <ul class="space-y-2 text-sm">
            <li>• Túi macrame</li>
            <li>• Phụ kiện trang trí</li>
            <li>• Quà tặng thủ công</li>
            <li>• Đồ treo tường hoho</li>
            <li>• Keychain và móc khóa</li>
            <li>• Thiết kế theo yêu cầu</li>
          </ul>
        </div>

        <!-- Col 3 -->
        <div>
          <h3 class="font-bold text-white mb-3">Chính sách và hỗ trợ</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:underline">• Hướng dẫn bảo quản sản phẩm</a></li>
            <li><a href="#" class="hover:underline">• Chính sách đổi/trả hàng</a></li>
            <li><a href="#" class="hover:underline">• Chính sách vận chuyển</a></li>
            <li><a href="#" class="hover:underline">• Chính sách kiểm hàng</a></li>
            <li><a href="#" class="hover:underline">• Chính sách giao hàng</a></li>
            <li><a href="#" class="hover:underline">• Chính sách thanh toán</a></li>
          </ul>
        </div>

        <!-- Col 4 -->
        <div>
          <h3 class="font-bold text-white mb-3">Liên hệ</h3>

          <p class="text-sm flex items-center gap-2">
            <Icon name="lucide:map-pin" class="w-4 h-4" />Chung cư Charm Plaza 1,Ngã tư 550, đường
            ĐT743C,Khu phố Thống Nhất 1, Phường Dĩ An, Thành phố
            Hồ Chí Minh

          </p>
          <div class="mt-4 flex items-center gap-4 text-white/90">
            <p class="text-sm flex items-center gap-2">
              <Icon name="lucide:phone" class="w-4 h-4" /> (+84) 932 842 053
            </p>
          </div>
          <p class="text-sm mt-2 flex items-center gap-2">
            <Icon name="lucide:mail" class="w-4 h-4" />
            <a href="mailto:myhang1503@gmail.com" class="hover:underline break-all">myhang1503@gmail.com</a>
          </p>
          <div class="mt-4 flex items-center gap-4 text-white/90">
            <a href="#" aria-label="Instagram" class="hover:opacity-80">
              <Icon name="lucide:instagram" class="w-5 h-5" />
            </a>
            <a href="#" aria-label="YouTube" class="hover:opacity-80">
              <Icon name="lucide:youtube" class="w-5 h-5" />
            </a>
            <a href="#" aria-label="Facebook" class="hover:opacity-80">
              <Icon name="lucide:facebook" class="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>

    </section>


    <!-- COPYRIGHT -->
    <div class="bg-[#262626] text-[#bdbdbd] text-center text-xs py-4">
      © {{ new Date().getFullYear() }} Saturday Macrame. All rights reserved.
    </div>

    <!-- Floating socials -->
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
    </div>
  </footer>
</template>
