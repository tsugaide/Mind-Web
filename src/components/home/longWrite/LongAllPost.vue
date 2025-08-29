<script setup>
import LongPost from "./LongPost.vue";
import WriteButton from "./WriteButton.vue";
import { useLongStore } from "../../../store/longStore";
import { onMounted, ref } from "vue";

const longStore = useLongStore();

onMounted(async () => {
  await longStore.fetchPosts();
});
</script>
<template>
  <div class="py-6">
    <RouterLink
      :to="`/beranda/long-write/${post.id}`"
      class="block px-8 py-3 hover:bg-gray-200 transition-all"
      v-for="post in longStore.posts"
      :key="post.id"
    >
      <LongPost
        :displayName="post.profiles.display_name"
        :username="post.profiles.username"
        :avatar="post.profiles.avatar_url"
        :title="post.title"
        :content="post.content"
        :tag="post.tag"
        :views="post.views_count"
        :likes="post.likes_count"
        :created_at="post.created_at"
      />
    </RouterLink>
  </div>
  <WriteButton />
</template>
