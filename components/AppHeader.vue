<template>
    <header class="w-full flex items-center justify-between px-6 py-4 bg-white">
        <!-- Logo -->
        <div class="text-2xl font-bold text-brown-700 flex items-center space-x-2">
            <span>🧵</span>
        </div>

        <!-- Menu và Sign In -->
        <div class="flex items-center justify-between w-full ml-8">
            <!-- Menu sát trái -->
            <nav class="flex space-x-6 text-gray-700 font-medium">
                <NuxtLink to="/learn">Learn</NuxtLink>
                <NuxtLink to="/shop">Shop</NuxtLink>
                <NuxtLink to="/explore">Explore</NuxtLink>
                <NuxtLink to="/support">Support</NuxtLink>
            </nav>

            <!-- Sign In sát phải -->
            <NuxtLink to="/login"
                      class="border px-4 py-1 rounded-full text-sm ml-auto">
                Sign In
            </NuxtLink>
        </div>
    </header>
</template>
