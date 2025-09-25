<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div
    class="flex justify-around mt-6 font-quattrocento text-lg top-0 z-50 bg-white py-2"
  >
    <RouterLink
      class="pb-1"
      :class="{
        'border-b-2 border-black': $route.path.startsWith('/discussion'),
      }"
      to="/discussion"
      >Discussion</RouterLink
    >
    <RouterLink
      class="pb-1"
      :class="{
        'border-b-2 border-black': $route.path.startsWith('/long-write'),
      }"
      to="/long-write"
      >Long Write</RouterLink
    >
  </div>
</template>
