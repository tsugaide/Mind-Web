<script setup>
import { Route } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();
</script>
<template>
  <div
    class="mt-6 border-b border-black flex space-x-6 text-lg font-quattrocento"
  >
    <RouterLink
      :class="
        $route.path === '/profil/post'
          ? 'text-black font-semibold'
          : 'text-gray-500'
      "
      to="/profil/post"
    >
      Post
    </RouterLink>
    <RouterLink
      to="/profil/long-write"
      :class="
        $route.path === '/profil/long-write'
          ? 'text-black font-semibold'
          : 'text-gray-500'
      "
      >writes</RouterLink
    >
  </div>
</template>
