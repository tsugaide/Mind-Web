<script setup>
import PostCard from "./PostCard.vue";
import { usePostStore } from "../../../store/postStore.js";
import { onMounted, computed, onUnmounted } from "vue";
import InputBar from "./InputBar.vue";

const postStore = usePostStore();
onMounted(() => {
  let cleanup;

  onUnmounted(() => {
    if (cleanup) cleanup();
  });

  (async () => {
    await postStore.fetchPosts();
    cleanup = postStore.subscribeToPosts();
  })();
});

const parentPosts = computed(() => {
  return postStore.posts.filter((post) => post.parent_id === null);
});
</script>
<template>
  <div class="space-y-8 md:space-y-10 pb-15 mt-10 px-8 md:px-12 relative">
    <PostCard
      v-for="parentPost in parentPosts"
      :key="parentPost.id"
      :displayName="parentPost.profiles.display_name"
      :content="parentPost.content"
      :username="parentPost.profiles.username"
      :id="parentPost.id"
      :likeCount="parentPost.likes_count"
      :createdAt="parentPost.created_at"
      :comentCount="parentPost.coments_count"
      :avatar="parentPost.avatar_url"
    />
    <InputBar />
  </div>
</template>
