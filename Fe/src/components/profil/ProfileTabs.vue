<script setup>
import { Route } from "lucide-vue-next";

const props = defineProps({
  username: String,
});
</script>
<template>
  <div
    class="mt-6 border-b border-black flex space-x-6 text-lg font-quattrocento"
  >
    <RouterLink
      :class="
        $route.path === `/${props.username}/post`
          ? 'text-black font-semibold'
          : 'text-gray-500'
      "
      :to="`/${props.username}/post`"
    >
      Post
    </RouterLink>
    <RouterLink
      :to="`/${props.username}/long-write`"
      :class="
        $route.path === `/${props.username}/long-write`
          ? 'text-black font-semibold'
          : 'text-gray-500'
      "
      >writes</RouterLink
    >
  </div>
</template>
