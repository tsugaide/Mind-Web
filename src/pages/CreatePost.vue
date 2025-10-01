<template>
  <div class="mx-4 mt-5">
    <div class="w-full max-w-lg rounded-md bg-white">
      <!-- Header -->

      <span class="px-3 text-base font-montserrat font-medium text-black"
        >Your Post</span
      >

      <!-- Textarea -->
      <div class="p-3">
        <textarea
          v-model="newPost"
          placeholder="Write text here ..."
          class="w-full h-28 resize-none outline-none border rounded-md px-3 py-2 text-sm text-gray-700"
        ></textarea>
      </div>

      <!-- Footer -->
      <div class="flex justify-between items-center px-3 py-2">
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
          <button class="hover:text-gray-700">
            <Paperclip class="w-5 h-5" />
          </button>
          <button class="hover:text-gray-700">
            <MapPin class="w-5 h-5" />
          </button>
          <button class="hover:text-gray-700">
            <File class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { AlertTriangle, Paperclip, MapPin, File } from "lucide-vue-next";
import { usePostStore } from "../store/postStore";
import { useRouter } from "vue-router";

const postStore = usePostStore();
const route = useRouter();
const newPost = ref("");

const createPost = async () => {
  await postStore.submitPost(newPost.value, null);
  route.push("/discussion");
};
</script>
