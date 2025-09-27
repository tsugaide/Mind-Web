<script setup>
import { SendHorizontal } from "lucide-vue-next";
import { ref } from "vue";
import { usePostStore } from "../../../store/postStore.js";

const postStore = usePostStore();
const newPost = ref("");

const props = defineProps({
  parentId: String,
});
const submit = async () => {
  await postStore.submitPost(newPost.value, props.parentId ?? null);
  if (props.parentId) await postStore.replyPost(props.parentId);
  newPost.value = "";
};
</script>
<template>
  <div
    class="fixed md:bottom-0 bottom-16 left-1/2 -translate-x-1/2 md:-translate-x-0 bg-white py-4 px-8 flex items-center justify-between w-[380px] md:w-[500px]"
  >
    <textarea
      v-model="newPost"
      type="text"
      placeholder="Tulis argumenmu"
      class="flex-1 resize-none border-b border-gray-600 outline-none font-montserrat text-gray-700 placeholder:text-gray-400"
    />
    <SendHorizontal class="ml-4 text-2xl" @click="submit" />
  </div>
</template>
