<script setup>
import { Eye, Heart } from "lucide-vue-next";
import { useRelativeTime } from "../../../lib/useRelativeTime";
import { useLongStore } from "../../../store/longStore";
import { ref } from "vue";

const { formatTime } = useRelativeTime();
const longStore = useLongStore();

const isLike = ref(false);
const props = defineProps({
  displayName: String,
  username: String,
  title: String,
  content: String,
  tag: String,
  created_at: String,
  views: Number,
  likes: Number,
  avatar: String,
  id: String,
});

const like = async () => {
  await longStore.likePost(props.id);
  isLike.value = longStore.isLike;
};
</script>
<template>
  <div class="flex gap-2 items-center">
    <div
      class="relative w-10 h-10 bg-[#252525] rounded-md text-3xl font-light font-quattrocento text-white flex items-center justify-center"
    >
      <p v-if="!props.avatar">{{ props.displayName?.slice(0, 1) || "" }}</p>
      <img
        v-else
        :src="props.avatar"
        alt="Preview"
        class="w-full h-full object-cover rounded-md absolute"
      />
    </div>
    <div class="flex-1">
      <h1 class="text-xl font-medium font-quattrocento leading-none">
        {{ props.displayName }}
      </h1>
      <p class="text-gray-500 text-sm font-quattrocento">
        @{{ props.username }}
      </p>
    </div>
  </div>
  <div class="mt-4">
    <p class="font-montserrat text-[10px] text-gray-800 italic">
      {{ props.tag }}
    </p>
    <h1
      class="font-quattrocento-sans font-bold text-3xl text-black/85 max-w-[410px] leading-6 mt-1"
    >
      {{ props.title }}
    </h1>
    <p class="leading-4 mt-2 text-gray-700 text-sm max-w-[400px] font-garamond">
      {{ props.content }}
    </p>
  </div>
  <div class="flex items-center space-x-4 [&_svg]:w-4 [&_svg]:h-4 mt-4">
    <div>
      <p class="font-montserrat text-xs">
        Post In • {{ formatTime(props.created_at) }}
      </p>
    </div>
    <div class="flex space-x-0.5 font-montserrat items-center text-xs">
      <Heart
        v-if="isLike"
        @click.stop="like"
        class="text-[#e63232]"
        :fill="'currentColor'"
        :stroke="'currentColor'"
      />
      <Heart v-else @click.stop="like" />
      <p class="min-w-[20px] text-center">{{ props.likes }}</p>
    </div>
    <div class="flex space-x-0.5 font-montserrat items-center text-xs">
      <Eye />
      <p class="min-w-[20px] text-center">{{ props.views }}</p>
    </div>
  </div>
</template>
