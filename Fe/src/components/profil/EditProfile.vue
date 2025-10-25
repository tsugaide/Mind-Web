<script setup>
import { Camera } from "lucide-vue-next";
import { CircleX } from "lucide-vue-next";
import { useUserStore } from "../../store/userStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const bio = ref("");
const displayName = ref("");
const previewUrl = ref(null);
const file = ref(null);

const props = defineProps({
  isClose: Boolean,
  username: String,
});

const emit = defineEmits(["update:isClose"]);

const close = () => {
  emit("update:isClose", false);
};

onMounted(() => {
  displayName.value = userStore.profile.display_name;
  bio.value = userStore.profile.bio;
  file.value = userStore.profile.avatar_url;
  previewUrl.value = userStore.profile.avatar_url;
});

const updateDataProfile = async () => {
  await userStore.uploadImage(file.value);
  await userStore.updateProfil(displayName.value, bio.value);
  await userStore.init(props.username);
  emit("update:isClose", false);
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
  <div
    class="fixed w-full top-0 left-0 h-[100vh] bg-[#00000034] z-20 flex flex-col items-center justify-center"
  >
    <div
      class="flex flex-col w-[350px] md:w-[400px] items-center mx-auto bg-white shadow-2xl rounded-lg px-4 py-5"
    >
      <CircleX @click="close" class="self-end" />
      <div class="w-full flex flex-col justify-center items-start space-y-10">
        <div
          class="relative w-20 h-20 bg-[#252525] rounded-md text-7xl font-medium font-quattrocento flex items-center justify-center"
        >
          <input
            type="file"
            name=""
            id="fileInput"
            @change="showPhoto"
            hidden
          />
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
            class="w-full border-b border-[#252525] bg-transparent focus:outline-none py-1 pr-5"
            v-model="displayName"
            maxlength="15"
          />
          <p class="text-xs text-gray-400 mt-2 justify-self-end">
            {{ displayName.length }}/15
          </p>
        </div>
        <div class="w-full">
          <label class="block text-sm font-quattrocento">About You</label>
          <textarea
            class="w-full h-24 border-b border-[#252525] bg-transparent focus:outline-none py-1 pr-5 resize-none"
            v-model="bio"
            maxlength="200"
          ></textarea>
          <p class="text-xs text-gray-400 mt-2 justify-self-end">
            {{ bio.length }}/200
          </p>
        </div>
        <button
          class="self-start border border-[#252525] text-[#252525] px-5 rounded-full text-base font-quattrocento hover:bg-black hover:text-white transition-all"
          @click="updateDataProfile"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
