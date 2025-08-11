<!-- pages/index.vue -->
<template>
    <div class="min-h-screen w-full bg-[#fff7ef] text-slate-800">
        <!-- HERO -->
        <section class="relative pt-10 pb-6">
            <div class="max-w-6xl mx-auto px-4">
                <!-- Banner: mobile auto-height, desktop cố định -->
                <div class="mt-8 relative rounded-3xl overflow-hidden ring-1 ring-black/5 text-white md:h-[360px]">
                    <!-- Ảnh nền phủ toàn khối -->
                    <img src="/d_1_3.jpg" alt="Pedicure banner" class="absolute inset-0 w-full h-full object-cover" />
                    <!-- Overlay giúp chữ rõ -->
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent md:from-black/40">
                    </div>

                    <!-- Nội dung: mobile = flow bình thường (tự giãn chiều cao); md+ = định vị góc trái trên -->
                    <div class="relative z-10 p-4
           md:absolute md:p-0 md:left-6 md:top-16 md:w-[62%]" style="text-shadow:1px 1px 4px rgba(0,0,0,.7)">
                        <div
                            class="inline-block bg-[#27c4a8] text-white font-semibold rounded-2xl px-3 py-1 shadow text-xs sm:text-sm md:text-base">
                            Dịch vụ liên quan đến sản phẩm
                        </div>

                        <ul class="mt-3 list-disc pl-5 space-y-1 text-sm md:text-lg leading-relaxed">
                            <li>Bảo trì & làm mới: làm sạch, gỡ rối sợi, chỉnh sửa phần lỏng (áp dụng cho sản phẩm mua
                                tại cửa hàng).</li>
                            <li>Custom size/màu sắc: nhận làm theo kích thước, màu, hoa văn yêu cầu.</li>
                            <li>Gói quà & viết thiệp: phong cách boho, kèm thiệp viết tay.</li>
                            <li>Bộ quà tặng macrame: túi + móc khóa + vòng treo.</li>
                            <li>Workshop cuối tuần: hướng dẫn làm móc khóa/vòng treo.</li>
                            <li>DIY Kit: bộ nguyên liệu + hướng dẫn tại nhà.</li>
                        </ul>
                    </div>
                </div>

            </div>

            <!-- confetti dots -->
            <div class="pointer-events-none absolute inset-0">
                <div v-for="i in 18" :key="i" class="absolute w-2 h-2 rounded-full" :style="dotStyle(i)"
                    :class="['bg-rose-400', 'bg-amber-400', 'bg-cyan-400', 'bg-lime-400'][i % 4]" />
            </div>
        </section>
        <!-- FEATURES -->
        <section id="products" class="py-10">
            <div class="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div class="rounded-3xl bg-white p-6 shadow ring-1 ring-black/5">
                    <div class="text-3xl">🚚</div>
                    <h4 class="mt-2 font-bold">Free Shipping Worldwide</h4>
                    <p class="text-sm opacity-70 mt-1">
                        Applicable for selected products.
                    </p>
                </div>
                <div class="rounded-3xl bg-white p-6 shadow ring-1 ring-black/5">
                    <div class="text-3xl">⏰</div>
                    <h4 class="mt-2 font-bold">24/7 Customer Support</h4>
                    <p class="text-sm opacity-70 mt-1">
                        We’re here whenever you need.
                    </p>
                </div>
                <div class="rounded-3xl bg-white p-6 shadow ring-1 ring-black/5">
                    <div class="text-3xl">🧴</div>
                    <h4 class="mt-2 font-bold">Our Safe Packaging</h4>
                    <p class="text-sm opacity-70 mt-1">
                        Secure and eco-friendly materials.
                    </p>
                </div>
            </div>
            <div class="h-14"></div>
        </section>
    </div>
</template>

<script setup lang="ts">
/** random vị trí cho các chấm trang trí */
const dotStyle = (i: number) => {
    const top = Math.random() * 90 + "%";
    const left = Math.random() * 90 + "%";
    const opacity = 0.4 + Math.random() * 0.5;
    return `top:${top};left:${left};opacity:${opacity}`;
};
</script>
