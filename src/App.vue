<script setup>
import { RouterView } from "vue-router";
import { useUserStore } from "./store/userStore";
import { onMounted } from "vue";

const userStore = useUserStore();
onMounted(async () => {
  await userStore.init();
});
</script>
<template>
  <RouterView />
</template>
