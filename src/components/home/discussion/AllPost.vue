<script setup>
import PostCard from "./PostCard.vue";
import { usePostStore } from "../../../store/postStore.js";
import { onMounted, computed, onUnmounted } from "vue";
import { useUserStore } from "../../../store/userStore.js";
import InputBar from "./InputBar.vue";
import SkeletonLoading from "../../skeletonLoading/SkeletonLoading.vue";

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
  <div
    class="space-y-8 md:space-y-10 pb-15 mt-10 px-10 md:px-12 md:pr-30 relative"
  >
    <div
      class="flex items-start gap-2"
      v-for="n in 5"
      :key="`skeleton-${n}`"
      v-if="postStore.loading"
    >
      <SkeletonLoading w="w-9" h="h-9" radius="rounded-md" />

      <div class="flex-1">
        <div class="flex space-x-1 items-center mb-1">
          <SkeletonLoading w="w-20" h="h-4" radius="rounded" />
          <SkeletonLoading w="w-10" h="h-3" radius="rounded" />
        </div>

        <SkeletonLoading w="w-full" h="h-4" radius="rounded" />
        <SkeletonLoading w="w-2/3" h="h-4" radius="rounded" class="mt-1" />

        <SkeletonLoading w="w-16" h="h-3" radius="rounded" class="mt-2" />
      </div>
    </div>

    <PostCard
      v-else
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
