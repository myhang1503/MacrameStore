<template>
    <header class="w-full">
      <!-- Announcement bar -->
      <div class="text-center">
        <hr class="border-t border-gray-200" />
        <ULink to="/" class="inline-flex items-center gap-2 py-2 text-lg font-sans text-gray-700 hover:text-primary-500">
          Welcome to HP Macrame!
          <Icon name="heroicons:arrow-right" class="w-5 h-5 text-gray-700 hover:text-primary-500" />
        </ULink>
        <hr class="border-t border-gray-200" />
      </div>
      <UContainer class="py-4 flex items-center justify-between">
    <!-- Logo -->
    <div class="text-2xl font-bold">
      <nuxt-link to="/">MyShop</nuxt-link>
    </div>
    <!-- Shopping Cart Icon -->
    <div>
      <nuxt-link to="/cart">
        <Icon name="heroicons:shopping-cart" class="w-6 h-6 text-gray-800 hover:text-primary-500" />
      </nuxt-link>
    </div>
  </UContainer>
    </header>
</template>