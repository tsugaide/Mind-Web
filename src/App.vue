<script setup>
import { RouterView, useRoute } from "vue-router";
import { onMounted, ref, computed } from "vue";
import { useUserStore } from "./store/userStore";
import MainLayout from "./components/layout/MainLayout.vue";
import AuthLayout from "./components/layout/AuthLayout.vue";

const route = useRoute();
const userStore = useUserStore();

onMounted(async () => {
  await userStore.initCurrentUser();
});

const layout = computed(() => {
  if (route.meta.layout === "Auth") return AuthLayout;
  return MainLayout;
});
</script>
<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
