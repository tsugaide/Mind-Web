<script setup>
import LongPost from "./LongPost.vue";
import WriteButton from "./WriteButton.vue";
import SkeletonLoading from "../../skeletonLoading/SkeletonLoading.vue";
import { useLongStore } from "../../../store/longStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const longStore = useLongStore();
const router = useRouter();

onMounted(async () => {
  await longStore.fetchPosts();
});
</script>
<template>
  <div class="py-6">
    <div class="px-8" v-for="n in 3" :key="n" v-if="longStore.loading">
      <div class="flex gap-2 items-center">
        <SkeletonLoading w="w-11" h="h-11" radius="rounded-md" />

        <div class="flex-1 space-y-1">
          <SkeletonLoading w="w-32" h="h-4" radius="rounded-sm" />
          <SkeletonLoading w="w-20" h="h-3" radius="rounded-sm" />
        </div>
      </div>

      <div class="mt-4 space-y-2">
        <SkeletonLoading w="w-16" h="h-3" radius="rounded-sm" />
        <SkeletonLoading w="w-2/3" h="h-5" radius="rounded-md" />
        <SkeletonLoading w="w-full" h="h-4" radius="rounded-md" />
        <SkeletonLoading w="w-5/6" h="h-4" radius="rounded-md" />
      </div>
      <div class="flex items-center space-x-4 mt-4">
        <SkeletonLoading w="w-20" h="h-3" radius="rounded-sm" />
        <div class="flex items-center space-x-1">
          <SkeletonLoading w="w-4" h="h-4" radius="rounded-sm" />
          <SkeletonLoading w="w-6" h="h-3" radius="rounded-sm" />
        </div>
        <div class="flex items-center space-x-1">
          <SkeletonLoading w="w-4" h="h-4" radius="rounded-sm" />
          <SkeletonLoading w="w-6" h="h-3" radius="rounded-sm" />
        </div>
      </div>
    </div>

    <div
      v-else
      @click="router.push(`/long-write/${post.id}`)"
      class="block px-8 py-6 hover:bg-gray-200 transition-all cursor-pointer"
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
        :id="post.id"
      />
    </div>
  </div>
  <WriteButton />
</template>
