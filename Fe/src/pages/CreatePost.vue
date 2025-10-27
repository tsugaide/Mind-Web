<template>
  <div class="mx-4 mt-5 pb-14">
    <div class="w-full max-w-lg rounded-md bg-white">
      <!-- Header -->

      <span class="px-3 text-base font-montserrat font-medium text-black"
        >Your Post</span
      >

      <!-- Textarea -->
      <div class="border rounded-md px-3 py-2 mx-3 mt-4">
        <textarea
          v-model="newPost"
          ref="textarea"
          @input="autoResize"
          placeholder="Write text here ..."
          class="w-full min-h-8 resize-none outline-none rounded-md text-base text-gray-700"
        >
        </textarea>
        <div
          class="flex gap-5 w-full overflow-x-scroll"
          v-if="imageUrl.length > 0"
        >
          <div v-for="img in imageUrl" class="w-[60%] shrink-0 relative">
            <img :src="img" alt="" class="rounded-lg border border-[#6b6b6b]" />
            <span
              @click="imageUrl = imageUrl.filter((i) => i !== img)"
              class="absolute top-3 right-4 text-white bg-[#00000071] rounded-full p-1"
              ><X class="w-4 h-4"
            /></span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-between items-center px-3 py-4">
        <!-- Tombol -->
        <button
          @click="createPost"
          class="bg-[#252525] text-white px-4 py-2 rounded-md text-sm font-medium font-montserrat transition flex items-center gap-3"
        >
          <AlertTriangle class="w-4 h-4" />
          <p v-if="postStore.loading">Posting...</p>
          <p v-else>Create Post</p>
        </button>

        <!-- Icon -->
        <div class="flex items-center gap-3 text-gray-500">
          <label class="hover:text-gray-700" for="image">
            <ImagePlus class="w-5 h-5" />
            <input
              type="file"
              name=""
              id="image"
              class="hidden"
              @change="handleImage"
            />
          </label>
          <button class="hover:text-gray-700">
            <Paperclip class="w-5 h-5" />
          </button>
          <button class="hover:text-gray-700">
            <MapPin class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
    <p class="whitespace-pre-wrap">{{ newPost }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  AlertTriangle,
  Paperclip,
  MapPin,
  ImagePlus,
  X,
} from "lucide-vue-next";
import { usePostStore } from "../store/postStore";
import { useRouter } from "vue-router";

const postStore = usePostStore();
const route = useRouter();
const newPost = ref("");
const textarea = ref(null);
const imageUrl = ref([]);
const fileList = ref([]);

const autoResize = () => {
  const el = textarea.value;
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
};

const handleImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    imageUrl.value.push(URL.createObjectURL(file));
    fileList.value.push(file);
  }
};
const createPost = async () => {
  await postStore.submitPost(newPost.value, null, fileList.value);
  route.push("/discussion");
};
</script>
