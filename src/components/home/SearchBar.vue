<script setup>
import { Search } from "lucide-vue-next";
</script>
<template>
  <div class="flex items-center justify-center mt-6 px-8">
    <div
      class="flex items-center w-full max-w-md bg-gray-200 rounded-md px-4 py-2"
    >
      <input
        type="text"
        placeholder="Cari..."
        class="flex-1 bg-transparent outline-none font-montserrat text-gray-700 placeholder:text-gray-500"
      />
      <Search class="w-5 h-5 text-gray-600" />
    </div>
  </div>
</template>
