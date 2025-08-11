<template>
    <section class="w-screen h-[100svh] bg-[#f5f5f5] overflow-hidden">
        <div class="h-full grid grid-rows-[45%_55%] lg:grid-rows-1 lg:grid-cols-2">

            <!-- Ảnh (mobile trên, desktop bên trái) -->
            <div class="relative order-first lg:order-first flex items-center justify-center">
                <img class="w-full h-full object-cover lg:w-[70%] lg:h-auto" src="/d_1_1.jpg" alt="Decor" />
                <div class="hidden lg:block absolute inset-0 pointer-events-none"></div>
            </div>

            <!-- Text (canh giữa theo chiều dọc) -->
            <div class="h-full flex items-center">
                <div class="w-full px-5 sm:px-8 lg:px-16">
                    <div class="mt-3 space-y-3 root-text text-sm md:text-base leading-relaxed">
                        <p>
                            Saturday Macrame được sinh ra từ mong muốn tạo nên một không gian thư giãn và tĩnh tại – nơi
                            mỗi người có thể tạm rời khỏi những bộn bề, căng thẳng của công việc thường ngày. Chúng tôi
                            tìm thấy
                            niềm vui, sự cân bằng và cảm hứng sáng tạo trong nghệ thuật macrame thủ công – và từ đó,
                            Saturday
                            Macrame ra đời.
                        </p>

                        <p class="hidden md:block">
                            Chúng tôi mang đến những sản phẩm macrame handmade tinh tế và độc đáo, không chỉ để trang
                            trí không gian sống,
                            mà còn để truyền cảm hứng và lan tỏa sự thư thái, nhẹ nhàng đến mỗi khách hàng.
                        </p>

                        <h3 class="pt-1 text-sm md:text-base font-semibold root-text">GIÁ TRỊ CỐT LÕI</h3>
                        <dl class="grid grid-cols-3 gap-2 md:gap-4">
                            <div class="p-3 md:p-4 bg-white/70 shadow-sm ring-1 ring-[#0d6b63]/10">
                                <dt class="root-text font-bold text-sm md:text-xl mb-1 md:mb-2">ART.</dt>
                                <dd class="text-xs md:text-sm">Tác phẩm từ sợi, bàn tay và trái tim.</dd>
                            </div>
                            <div class="p-3 md:p-4 bg-white/70 shadow-sm ring-1 ring-[#0d6b63]/10">
                                <dt class="root-text font-bold text-sm md:text-xl mb-1 md:mb-2">UNIQUE.</dt>
                                <dd class="text-xs md:text-sm">Không rập khuôn; đậm dấu ấn cá nhân.</dd>
                            </div>
                            <div class="p-3 md:p-4 bg-white/70 shadow-sm ring-1 ring-[#0d6b63]/10">
                                <dt class="root-text font-bold text-sm md:text-xl mb-1 md:mb-2">STORY.</dt>
                                <dd class="text-xs md:text-sm">Mỗi sản phẩm mang một câu chuyện.</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>
