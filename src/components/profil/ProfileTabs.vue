<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>
<template>
  <div
    class="mt-6 border-b border-black flex space-x-6 text-lg font-quattrocento"
  >
    <button class="font-semibold" @click="router.push('/profil/post')">
      Post
    </button>
    <button class="text-gray-500">writes</button>
  </div>
</template>
