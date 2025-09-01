<script setup>
import { useLongStore } from "../../store/longStore";
import { useUserStore } from "../../store/userStore";
import { computed, ref, onMounted } from "vue";
import LongPost from "../home/longWrite/LongPost.vue";

const longStore = useLongStore();
const userStore = useUserStore();
const daftarLongStore = ref([]);

onMounted(async () => {
  await longStore.fetchPosts();
  daftarLongStore.value = longStore.posts.filter(
    (p) => p.user_id == userStore.profile.id
  );
});
</script>
<template>
  <div class="py-6">
    <RouterLink
      :to="`/beranda/long-write/${post.id}`"
      class="block px-2 py-3 hover:bg-gray-200 transition-all"
      v-for="post in daftarLongStore"
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
</template>
