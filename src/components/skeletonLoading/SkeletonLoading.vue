<script setup>
const props = defineProps({
  w: String,
  h: String,
  radius: String,
});
</script>

<template>
  <div
    class="bg-gray-300 animate-pulse"
    :class="`${props.w} ${props.h} ${props.radius}`"
  ></div>
</template>
