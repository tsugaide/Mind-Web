<script setup>
import HeadingWelcome from "../components/register/HeadingWelcome.vue";
import AuthTabs from "../components/register/AuthTabs.vue";
import { RouterView, useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore.js";
import { ref, watch, onMounted } from "vue";

const auth = useAuthStore();
const router = useRouter();

const alert = ref("");
watch(
  () => auth.isSignUp,
  (newVal) => {
    if (newVal) {
      alert.value = "Berhasil sign in, silahkan log in";
    }
  }
);

onMounted(async () => {
  await auth.checkLogin();
  auth.listenAuth();

  if (auth.isLoggedIn) {
    router.push("/beranda/discussion");
  }
});
</script>

<template>
  <div
    class="min-h-screen bg-[#f8f6f1] flex items-center justify-center px-8 md:px-4"
  >
    <div class="max-w-md w-full space-y-8 relative">
      <HeadingWelcome />
      <AuthTabs />
      <p class="text-xs font-light absolute top-54">{{ alert }}</p>
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in" class="relative">
          <component :is="Component" class="absolute h-56" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>
