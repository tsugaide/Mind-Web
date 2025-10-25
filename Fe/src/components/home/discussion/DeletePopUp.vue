<script setup>
import { ref } from "vue";
import { usePostStore } from "../../../store/postStore";

const postStore = usePostStore();

const props = defineProps({
  isClose: Boolean,
  id: String,
});

const deletePost = async () => {
  await postStore.deletePost(props.id);
  await postStore.fetchPosts();
  emit("update:isClose", false);
};

const emit = defineEmits(["update:isClose"]);

const close = () => {
  emit("update:isClose", false);
};
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-transparent z-50"
  >
    <div class="bg-[#1a1a1a] text-white rounded-xl shadow-lg w-72 p-6">
      <h2 class="text-xl font-semibold mb-1 font-quattrocento">Delete Post?</h2>
      <p class="text-gray-300 mb-6 font-montserrat text-xs">
        Are you sure you want to delete this post? This action cannot be undone.
      </p>
      <div class="flex justify-end gap-3">
        <button @click="close" class="px-4 py-2 rounded-lg border-white border">
          Cancel
        </button>
        <button
          @click="deletePost"
          class="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-700"
        >
          <p v-if="postStore.loading">Deleteing...</p>
          <p v-else>Delete</p>
        </button>
      </div>
    </div>
  </div>
</template>
