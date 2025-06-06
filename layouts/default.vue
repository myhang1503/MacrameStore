<template>
    <div class="min-h-screen bg-[#dcd2c8] flex items-center justify-center px-4">
        <!-- Toàn bộ layout chính giữa -->
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">

            <!-- Header nằm trong khối trắng -->
            <AppHeader />

            <!-- Nội dung chính -->
            <div class="flex-1 flex items-center justify-center">
                <slot />
            </div>

            <!-- Footer nằm trong khối trắng -->
            <AppFooter />
        </div>
    </div>
</template>
