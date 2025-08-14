<script setup>
import PostCard from "../../components/home/discussion/PostCard.vue";
import { usePostStore } from "../../store/postStore";
import { computed } from "vue";
import { useUserStore } from "../../store/userStore";

const postStore = usePostStore();
const userStore = useUserStore();

const postsList = computed(() => {
  return postStore.posts.filter(
    (postList) => postList.user_id === userStore.profile.id
  );
});
</script>

<template>
  <div class="py-6 space-y-8">
    <PostCard
      v-for="postList in postsList"
      :key="postList.id"
      :displayName="postList.profiles.display_name"
      :content="postList.content"
      :username="postList.profiles.username"
      :id="postList.id"
      :likeCount="postList.likes_count"
      :createdAt="postList.created_at"
      :comentCount="postList.coments_count"
      :avatar="null"
    />
  </div>
</template>
