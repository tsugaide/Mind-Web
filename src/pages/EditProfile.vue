<script setup>
import { Camera } from "lucide-vue-next";
import { CircleX } from "lucide-vue-next";
import { useUserStore } from "../store/userStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const bio = ref("");
const displayName = ref("");
const previewUrl = ref(null);
const file = ref(null);

onMounted(async () => {
  await userStore.init();
  displayName.value = userStore.profile.display_name;
  bio.value = userStore.profile.bio;
  file.value = userStore.profile.avatar_url;
  previewUrl.value = userStore.profile.avatar_url;
});

const updateDataProfile = async () => {
  await userStore.uploadImage(file.value);
  await userStore.updateProfil(displayName.value, bio.value);
  router.push("/profil");
};

const showPhoto = (e) => {
  file.value = e.target.files[0];
  if (file.value && file.value.type.startsWith("image/")) {
    previewUrl.value = URL.createObjectURL(file.value);
  }
};

const removePhoto = () => {
  file.value = null;
  previewUrl.value = null;
};
</script>
<template>
  <div class="flex justify-center">
    <div
      class="w-80 flex flex-col justify-center items-center space-y-10 mt-10"
    >
      <div
        class="relative w-20 h-20 bg-[#252525] rounded-md text-7xl font-medium font-quattrocento flex items-center justify-center"
      >
        <input type="file" name="" id="fileInput" @change="showPhoto" hidden />
        <label for="fileInput" class="z-10">
          <Camera class="text-white bg-black/10 w-10 h-10 p-2 rounded-full" />
        </label>
        <img
          v-if="previewUrl"
          :src="previewUrl"
          alt="Preview"
          class="w-full h-full object-cover rounded-md absolute"
        />
        <CircleX
          class="absolute -top-3 -right-4 w-4 h-4 cursor-pointer"
          v-if="file"
          @click="removePhoto"
        />
      </div>
      <div class="w-full">
        <label class="block text-sm font-quattrocento">Display Name</label>
        <input
          class="w-full border-b border-[#252525] bg-transparent focus:outline-none py-1 pr-10"
          v-model="displayName"
        />
      </div>
      <div class="w-full">
        <label class="block text-sm font-quattrocento">About You</label>
        <textarea
          class="w-full h-24 border-b border-[#252525] bg-transparent focus:outline-none py-1 pr-10 resize-none"
          v-model="bio"
        ></textarea>
      </div>
      <button
        class="self-start border border-[#252525] text-[#252525] px-3 rounded-full text-sm font-quattrocento"
        @click="updateDataProfile"
      >
        Save
      </button>
    </div>
  </div>
</template>
