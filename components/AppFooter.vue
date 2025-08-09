<template>
  <footer class="w-full">
    <!-- SUBSCRIBE (static, không binding) -->
    <section class="root-bg text-[#e7e7e7]">
      <div class="max-w-[1400px] mx-auto px-6 py-12 text-center">
        <h2 class="text-3xl md:text-4xl font-semibold">Subscribe to our emails</h2>
        <p class="mt-3 text-sm md:text-base opacity-80">
          Subscribe to our mailing list for insider news, product launches, and more.
        </p>

        <div class="max-w-md mx-auto mt-6 flex gap-3">
          <input type="email" placeholder="Email"
            class="flex-1 rounded-md bg-transparent border border-[#a9b3ad] px-4 py-2 outline-none focus:ring-2 focus:ring-white/40 transition" />
          <button class="rounded-md border border-[#a9b3ad] px-4 py-2 hover:bg-white/10 transition"
            aria-label="Subscribe">
            <Icon name="lucide:arrow-right" class="w-5 h-5" />
          </button>
        </div>

        <p class="mt-5 text-sm tracking-wide">
          <a href="mailto:flora@florastreetatelier.com" class="hover:underline">flora@florastreetatelier.com</a>
        </p>
        <p class="mt-1 text-xs opacity-80">
          Email us for wholesale inquiries and special occasion gift inquiries
        </p>
      </div>
    </section>

    <!-- MAIN FOOTER -->
    <section class="root-bg text-[#e7e7e7]">
      <div class="max-w-[1800px] mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-7 gap-6">
        <!-- Col 1 -->
        <div class="lg:col-span-3">
          <h3 class="font-bold text-white mb-3">SATURDAY MACRAME</h3>
          <p class="text-sm leading-relaxed opacity-90">
            SATURDAY MACRAME<br />
            Mã số hộ kinh doanh: [bổ sung mã nếu có] Đăng ký ngày [bổ sung ngày] tại UBND [địa phương bạn đăng ký]<br />
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
            <Icon name="lucide:phone" class="w-4 h-4" /> 0903.286.321
          </p>
          <p class="text-sm mt-2 flex items-center gap-2">
            <Icon name="lucide:mail" class="w-4 h-4" />
            <a href="mailto:myhang1503@gmail.com" class="hover:underline">myhang1503@gmail.com</a>
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

        <!-- Col 5 -->
        <div>
          <h4 class="font-semibold">Địa chỉ</h4>
          <p class="mt-2 text-sm flex items-start gap-2 opacity-90">
            <Icon name="lucide:map-pin" class="w-4 h-4 mt-0.5" />
            Charm charm charm abc abc meo moe
          </p>
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
