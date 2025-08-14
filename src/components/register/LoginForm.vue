<script setup>
import InputField from "./InputField.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../store/authStore";
import { ref } from "vue";

const username = ref("");
const password = ref("");

const auth = useAuthStore();
const router = useRouter();
const handleLogIn = async () => {
  const success = await auth.logIn(username.value, password.value);
  if (success) {
    router.push("/beranda/discussion");
  }
};
</script>

<template>
  <form class="space-y-6">
    <InputField label="Username" v-model="username" />
    <InputField label="Password" type="password" v-model="password" />
    <p
      v-if="auth.errorMessageLogin"
      class="text-red-500 mt-2 text-xs font-montserrat"
    >
      {{ auth.errorMessageLogin }}
    </p>
    <button
      type="button"
      class="text-lg font-normal mt-4 border border-transparent hover:text-[#2b2b2b] hover:border hover:border-[#2b2b2b] cursor-pointer hover:bg-transparent transition-all font-quattrocento text-white bg-[#252525] px-2 rounded-xs"
      @click="handleLogIn"
    >
      Log in
    </button>
  </form>
</template>
