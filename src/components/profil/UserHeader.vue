<script setup>
import { useAuthStore } from "../../store/authStore";
import { useRouter } from "vue-router";
import EditProfile from "./EditProfile.vue";
import { ref } from "vue";

const authStore = useAuthStore();

const isEditProfil = ref(false);
const logOut = async () => {
  authStore.logout();
};
const props = defineProps({
  name: String,
  username: String,
  bio: String,
  avatar: String,
  isUser: Boolean,
});
</script>
<template>
  <div class="relative">
    <div>
      <div class="flex gap-4 items-end">
        <div
          class="relative md:w-20 md:h-20 w-20 h-20 bg-[#252525] rounded-md md:text-7xl text-6xl font-medium font-quattrocento text-white flex items-center justify-center"
        >
          <p v-if="!props.avatar">{{ props.name?.slice(0, 1) || "" }}</p>
          <img
            v-else
            :src="props.avatar"
            alt="Preview"
            class="w-20 h-20 object-cover rounded-md absolute"
          />
        </div>

        <div class="flex-1">
          <h1
            class="md:text-2xl text-xl font-medium font-quattrocento leading-none"
          >
            {{ name }}
          </h1>
          <p class="text-gray-500 md:text-sm text-xs font-quattrocento">
            @{{ username }}
          </p>
          <div class="mt-2 flex gap-2">
            <button
              v-if="isUser"
              class="bg-[#252525] text-white px-3 rounded-full md:text-[10px] text-[8px] font-quattrocento"
              @click="isEditProfil = true"
            >
              Edit Profile
            </button>
            <button
              v-else
              class="bg-[#252525] text-white px-3 rounded-full md:text-sm text-xs font-quattrocento"
            >
              Follow
            </button>
            <button
              v-if="isUser"
              @click="logOut"
              class="border border-[#252525] text-[#252525] px-3 md:text-sm rounded-full text-xs font-quattrocento"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
      <p class="text-base mt-4 font-quattrocento">{{ bio }}</p>
    </div>
    <div
      class="w-full h-[100vh] top-0 bg-transparent absolute"
      v-if="isEditProfil"
    ></div>
    <EditProfile v-if="isEditProfil" v-model:is-close="isEditProfil" />
  </div>
</template>
