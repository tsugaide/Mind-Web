<script setup>
import { RouterView, useRoute } from "vue-router";
import PostCard from "./PostCard.vue";
import InputBar from "./InputBar.vue";
import { usePostStore } from "../../../store/postStore";
import { computed, onMounted } from "vue";

const postStore = usePostStore();
const route = useRoute();

const parentPostReply = computed(() => {
  return postStore.posts.find((post) => post.id === route.params.id);
});

const postsReply = computed(() => {
  return postStore.posts.filter(
    (postReply) => postReply.parent_id === route.params.id
  );
});
</script>

<template>
  <div class="space-y-8 md:space-y-10 pb-8 mt-10 px-8 md:px-12">
    <PostCard
      :displayName="parentPostReply.profiles.display_name"
      :content="parentPostReply.content"
      :username="parentPostReply.profiles.username"
      :id="parentPostReply.id"
      :likeCount="parentPostReply.likes_count"
      :createdAt="parentPostReply.created_at"
      :comentCount="parentPostReply.coments_count"
      :avatar="parentPostReply.avatar_url"
    />
  </div>
  <div class="space-y-8 md:space-y-10 pb-16 px-18 md:px-22">
    <PostCard
      v-for="post in postsReply"
      :key="post.id"
      :displayName="post.profiles.display_name"
      :content="post.content"
      :username="post.profiles.username"
      :id="post.id"
      :likeCount="post.likes_count"
      :createdAt="post.created_at"
      :comentCount="post.coments_count"
      :avatar="post.avatar_url"
    />
  </div>
  <InputBar :parentId="parentPostReply.id" />
</template>
