<script setup>
import { computed, defineProps, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useLongStore } from "../../../store/longStore";
import { Eye, Heart } from "lucide-vue-next";
import { useRelativeTime } from "../../../lib/useRelativeTime";

const { formatTime } = useRelativeTime();

const longStore = useLongStore();
const route = useRoute();
const post = ref([]);

onMounted(async () => {
  await longStore.fetchPosts();
  post.value = longStore.posts.find((p) => p.id === route.params.id);
});
</script>

<template>
  <p>{{ post.profiles.display_name }}</p>
  <div class="flex flex-col items-center mt-10">
    <h1 class="text-gray-800 font-montserrat text-sm mb-3">Written By</h1>
    <div class="flex gap-2 items-center">
      <div
        class="relative w-14 h-14 bg-[#252525] rounded-md text-5xl font-light font-quattrocento text-white flex items-center justify-center"
      >
        <p v-if="post.profiles?.avatar_url == null">
          {{ post.profiles?.display_name?.slice(0, 1) || "" }}
        </p>

        <img
          v-else
          :src="post.profiles.avatar_url"
          alt="Preview"
          class="w-full h-full object-cover rounded-md absolute"
        />
      </div>
      <div class="flex-1">
        <h1 class="text-2xl font-medium font-quattrocento leading-none">
          {{ post.profiles.display_name }}
        </h1>
        <p class="text-gray-500 text-sm font-quattrocento">
          @{{ post.profiles.username }}
        </p>
      </div>
    </div>
  </div>
  <div class="px-25 py-10">
    <h1 class="font-quattrocento-sans font-bold text-5xl">{{ post.title }}</h1>
    <div class="flex items-center space-x-4 [&_svg]:w-4 [&_svg]:h-4 mt-3">
      <div>
        <p class="font-montserrat text-[10px]">
          Post In • {{ formatTime(post.created_at) }}
        </p>
      </div>
      <div class="flex space-x-0.5 font-montserrat items-center text-xs">
        <Heart
          class="text-[#da8326]"
          :fill="'currentColor'"
          :stroke="'currentColor'"
        />
        <p class="min-w-[12px] text-center">{{ post.likes_count }}</p>
      </div>
      <div class="flex space-x-0.5 font-montserrat items-center text-xs">
        <Eye />
        <p class="min-w-[12px] text-center">{{ post.views_count }}</p>
      </div>
    </div>
    <p class="font-garamond text-gray-700 text-xl mt-12">{{ post.content }}</p>
  </div>
</template>
