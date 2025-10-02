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
  await postStore.submitPost(newPost.value, props.parentId);
  await postStore.replyPost(props.parentId);
  newPost.value = "";
};
</script>
<template>
  <div
    class="bg-white py-4 flex items-center justify-between w-[250px] md:w-[500px]"
  >
    <textarea
      v-model="newPost"
      type="text"
      placeholder="Write Your Comment"
      class="flex-1 resize-none text-sm border-b border-gray-600 outline-none font-montserrat text-gray-700 placeholder:text-gray-400"
    />
    <SendHorizontal class="ml-4 text-2xl" @click="submit" />
  </div>
</template>
