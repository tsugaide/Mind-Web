<script setup>
import PostCard from "../../components/home/discussion/PostCard.vue";
import { usePostStore } from "../../store/postStore";
import { computed, onMounted, ref } from "vue";
import { useUserStore } from "../../store/userStore";
import { useRoute } from "vue-router";

const postStore = usePostStore();
const userStore = useUserStore();

const props = defineProps({
  isUser: Boolean,
});

onMounted(async () => {
  await postStore.fetchPosts();
});

const postsList = computed(() => {
  return postStore.posts.filter(
    (post) => post.user_id === userStore.profile.id && post.parent_id == null
  );
});
</script>

<template>
  <div class="py-6 pb-20 space-y-8">
    <PostCard
      v-if="postsList"
      v-for="postList in postsList"
      :key="postList.id"
      :displayName="postList.profiles.display_name"
      :content="postList.content"
      :username="postList.profiles.username"
      :id="postList.id"
      :likeCount="postList.likes_count"
      :createdAt="postList.created_at"
      :comentCount="postList.coments_count"
      :avatar="postList.profiles.avatar_url"
      :isUser="props.isUser"
    />
  </div>
</template>
