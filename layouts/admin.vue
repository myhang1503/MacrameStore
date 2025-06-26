<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    router.push('/login')
}
</script>

<template>
    <div class="min-h-screen bg-white">
        <!-- Top navbar -->
        <header class="flex items-center justify-between px-8 py-5 bg-[#dcd2c8] shadow-md">
            <!-- Menu trái -->
            <nav class="flex gap-8 text-lg font-semibold text-gray-700">
                <NuxtLink to="/admin" active-class="text-blue-600 underline">📊 Dashboard</NuxtLink>
                <NuxtLink to="/admin/orders" active-class="text-blue-600 underline">🧾 Orders</NuxtLink>
                <NuxtLink to="/admin/product" active-class="text-blue-600 underline">📦 Products</NuxtLink>
            </nav>

            <!-- User phải -->
            <div class="flex items-center gap-4">
                <img src="/logo.jpg" class="w-12 h-12 rounded-full border object-cover" />
                <div class="text-right leading-tight">
                    <p class="font-bold text-base">Admin</p>
                    <button @click="logout" class="text-sm text-red-500 hover:underline">🔒 Logout</button>
                </div>
            </div>
        </header>

        <!-- Nội dung chính -->
        <main class="p-6">
            <slot />
        </main>
    </div>
</template>
