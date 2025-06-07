<template>
    <footer class="py-10 px-5 w-full text-gray-700 font-sans">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <!-- Tên thương hiệu và mô tả -->
        <div class="footer-section">
          <h2 class="text-2xl font-normal mb-3">HP Macrame</h2>
          <p class="text-sm font-normal leading-relaxed">Handcrafted with love, inspired by nature.</p>
        </div>
  
        <!-- Liên kết điều hướng -->
        <div class="footer-section">
          <h3 class="text-lg font-normal mb-3">Quick Links</h3>
          <ul class="list-none p-0">
            <li class="mb-2"><ULink to="/" class="text-sm font-normal text-gray-700 hover:text-primary-500">Home</ULink></li>
            <li class="mb-2"><ULink to="/about" class="text-sm font-normal text-gray-700 hover:text-primary-500">About</ULink></li>
            <li class="mb-2"><ULink to="/products" class="text-sm font-normal text-gray-700 hover:text-primary-500">Products</ULink></li>
            <li class="mb-2"><ULink to="/contact" class="text-sm font-normal text-gray-700 hover:text-primary-500">Contact</ULink></li>
          </ul>
        </div>
  
        <!-- Liên kết mạng xã hội -->
        <div class="footer-section">
          <h3 class="text-lg font-normal mb-3">Follow Us</h3>
          <div class="flex gap-4">
            <ULink href="https://instagram.com" target="_blank" class="text-gray-700 hover:text-primary-500">
              <Icon name="simple-icons:instagram" class="w-5 h-5" />
            </ULink>
            <ULink href="https://facebook.com" target="_blank" class="text-gray-700 hover:text-primary-500">
              <Icon name="simple-icons:facebook" class="w-5 h-5" />
            </ULink>
            <ULink href="https://pinterest.com" target="_blank" class="text-gray-700 hover:text-primary-500">
              <Icon name="simple-icons:pinterest" class="w-5 h-5" />
            </ULink>
          </div>
        </div>
  
        <!-- Thông tin liên hệ -->
        <div class="footer-section">
          <h3 class="text-lg font-normal mb-3">Contact Us</h3>
          <p class="text-sm font-normal mb-1">
            Email: <ULink href="mailto:info@hpmacrame.com" class="text-gray-700 hover:text-primary-500">info@hpmacrame.com</ULink>
          </p>
          <p class="text-sm font-normal">Address: 123 Craft Street, Hanoi, Vietnam</p>
        </div>
      </div>
  
      <!-- Bản quyền -->
      <div class="border-t border-gray-200 pt-5 mt-5 text-center">
        <p class="text-sm font-normal text-gray-700">© 2025 HP Macrame. All rights reserved.</p>
      </div>
    </footer>
</template>