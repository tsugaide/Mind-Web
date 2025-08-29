<script setup>
import { SendHorizontal } from "lucide-vue-next";
import { ref, defineProps } from "vue";
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
    class="fixed bottom-0 left-1/2 -translate-x-1/2 md:-translate-x-0 bg-white p-4 flex items-center justify-between w-[380px] md:w-[500px]"
  >
    <input
      v-model="newPost"
      type="text"
      placeholder="Tulis argumenmu"
      class="flex-1 border-b border-gray-600 outline-none font-montserrat text-gray-700 placeholder:text-gray-400"
    />
    <SendHorizontal class="ml-4 text-2xl" @click="submit" />
  </div>
</template>
