<script setup>
import { PencilLine } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();
</script>
<template>
  <div class="fixed bottom-8 right-9">
    <button
      @click="router.push('/create-long-write')"
      class="w-13 h-13 bg-[#252525] rounded-full flex justify-center items-center text-white"
    >
      <PencilLine />
    </button>
  </div>
</template>
