<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useLongStore } from "../../../store/longStore";
import { Eye, Heart } from "lucide-vue-next";
import { useRelativeTime } from "../../../lib/useRelativeTime";

const { formatTime } = useRelativeTime();

const longStore = useLongStore();
const route = useRoute();
const post = ref(null);

onMounted(async () => {
  await longStore.fetchPosts();
  post.value = longStore.posts.find((p) => p.id === route.params.id);
});
</script>

<template>
  <div v-if="post">
    <div class="flex flex-col items-center mt-10">
      <h1 class="text-gray-800 font-montserrat md:text-sm text-xs mb-3">
        Written By
      </h1>
      <div class="flex gap-2 items-center">
        <div
          class="relative md:w-14 md:h-14 w-11 h-11 bg-[#252525] rounded-md md:text-5xl text-4xl font-light font-quattrocento text-white flex items-center justify-center"
        >
          <p v-if="post.profiles.avatar_url == ''">
            {{ post.profiles.display_name[0] || "" }}
          </p>

          <img
            v-else
            :src="post.profiles.avatar_url"
            alt="Preview"
            class="w-full h-full object-cover rounded-md absolute"
          />
        </div>
        <div class="flex-1">
          <h1
            class="md:text-2xl text-lg font-medium font-quattrocento leading-none"
          >
            {{ post.profiles.display_name }}
          </h1>
          <p class="text-gray-500 md:text-sm text-xs font-quattrocento">
            @{{ post.profiles.username }}
          </p>
        </div>
      </div>
    </div>
    <div class="md:px-25 px-10 py-10">
      <h1 class="font-quattrocento-sans font-bold md:text-5xl text-4xl">
        {{ post.title }}
      </h1>
      <div
        class="flex items-center md:space-x-4 space-x-2 md:[&_svg]:w-4 md:[&_svg]:h-4 [&_svg]:w-2 [&_svg]:h-2 md:mt-3 mt-2"
      >
        <div>
          <p class="font-montserrat md:text-[10px] text-[8px]">
            Post In • {{ formatTime(post.created_at) }}
          </p>
        </div>
        <div
          class="flex space-x-0.5 font-montserrat items-center md:text-xs text-[8px]"
        >
          <Heart
            class="text-[#da8326]"
            :fill="'currentColor'"
            :stroke="'currentColor'"
          />
          <p class="min-w-[12px] text-center">{{ post.likes_count }}</p>
        </div>
        <div
          class="flex space-x-0.5 font-montserrat items-center md:text-xs text-[8px]"
        >
          <Eye />
          <p class="min-w-[12px] text-center">{{ post.views_count }}</p>
        </div>
      </div>
      <p class="font-garamond text-gray-700 md:text-xl text-lg md:mt-12 mt-8">
        {{ post.content }}
      </p>
    </div>
  </div>
</template>
