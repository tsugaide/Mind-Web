<script setup>
import { useAuthStore } from "../../store/authStore.js";
import InputField from "./InputField.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const displayName = ref("");

const auth = useAuthStore();
const router = useRouter();
const handleSignUp = async () => {
  const success = await auth.signUp(
    username.value,
    password.value,
    displayName.value
  );
  if (success) {
    router.push("/login");
  }
};
</script>

<template>
  <form class="space-y-6">
    <InputField label="Displayname" v-model="displayName" />
    <InputField label="Username" v-model="username" />
    <InputField label="Password" type="password" v-model="password" />
    <p
      v-if="auth.errorMessageSignIn"
      class="text-red-500 mt-2 text-xs font-montserrat"
    >
      {{ auth.errorMessageSignIn }}
    </p>

    <button
      type="button"
      class="text-lg font-normal mt-4 border border-transparent hover:text-[#2b2b2b] hover:border hover:border-[#2b2b2b] cursor-pointer hover:bg-transparent transition-all font-quattrocento text-white bg-[#252525] px-2 rounded-xs"
      @click="handleSignUp"
    >
      Sign in
    </button>
  </form>
</template>
