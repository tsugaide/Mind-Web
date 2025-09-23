<script setup>
import { useRouter, RouterLink } from "vue-router";

const router = useRouter();

const props = defineProps({
  display_name: String,
  avatar: String,
  username: String,
});
</script>
<template>
  <div class="flex items-center justify-between py-5 px-8">
    <img src="/src/assets/logo.png" alt="Mind" class="w-24 md:w-30" />
    <RouterLink
      :to="props.username"
      class="relative cursor-pointer w-10 h-10 rounded-sm bg-[#252525] flex items-center justify-center text-white font-quattrocento text-2xl"
    >
      <p v-if="!props.avatar">{{ props.display_name?.slice(0, 1) || "" }}</p>
      <img
        v-else
        :src="props.avatar"
        alt="Preview"
        class="w-full h-full object-cover rounded-md absolute"
      />
    </RouterLink>
  </div>
</template>
