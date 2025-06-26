<template>
    <div class="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
        <h2 class="text-center text-2xl font-bold mb-6 text-gray-800">🔐 Đăng nhập</h2>

        <div v-if="error" class="text-red-500 text-sm text-center mb-4">{{ error }}</div>

        <input v-model="username" type="text" placeholder="Tên đăng nhập"
            class="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input v-model="password" type="password" placeholder="Mật khẩu"
            class="w-full mb-6 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />

        <button @click="login" class="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition">
            Đăng nhập
        </button>
    </div>

</template>

<script setup>
const username = ref('');
const password = ref('');
const error = ref('');
const { public: { apiBaseUrl } } = useRuntimeConfig()
const router = useRouter();

const login = async () => {
    error.value = '';

    try {
        const res = await $fetch(`${apiBaseUrl}/login`, {
            method: 'POST',
            body: { username: username.value, password: password.value },
        });

        // Lưu token và role
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);

        router.push('/admin'); // Chuyển tới dashboard admin
    } catch (err) {
        error.value = err.data?.error || 'Đăng nhập thất bại';
    }
};
</script>
