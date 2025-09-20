<script setup>
import { RouterView } from "vue-router";
import { onMounted, ref } from "vue";
import { useUserStore } from "./store/userStore";

const userStore = useUserStore();

onMounted(async () => {
  await userStore.init();
});
</script>
<template>
  <div>
    <RouterView />
  </div>
</template>
