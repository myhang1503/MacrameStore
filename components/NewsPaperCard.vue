<template>
    <article
        class="group relative cursor-pointer overflow-hidden ring-1 ring-black/5 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        @click="$emit('card-click')">
        <div class="relative w-full aspect-[16/10]">
            <img :src="cover" :alt="title"
                class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

            <span v-if="label"
                class="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-gray-800 shadow">
                {{ label }}
            </span>
        </div>

        <div class="flex items-start gap-3 p-4">
            <img v-if="thumb" :src="thumb" :alt="title"
                class="mt-0.5 h-11 w-11 flex-none rounded-lg object-cover ring-1 ring-black/5" />
            <h3 class="text-[15px] sm:text-[16px] font-semibold leading-snug text-gray-900 line-clamp-2">
                {{ title }}
            </h3>
        </div>
    </article>
</template>

<script setup>
defineProps({
    title: { type: String, required: true },
    cover: { type: String, required: true },
    thumb: { type: String, default: '' },
    label: { type: String, default: '' },
})
defineEmits(['card-click'])
</script>
