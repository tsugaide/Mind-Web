<script setup>
import { Heart, MessageSquare, CornerUpRight } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import { usePostStore } from "../../../store/postStore";
import { RouterLink, useRouter } from "vue-router";
import { useRelativeTime } from "../../../lib/useRelativeTime";

const { formatTime } = useRelativeTime();
const postStore = usePostStore();
const router = useRouter();
const isLike = ref(false);
const props = defineProps({
  content: String,
  displayName: String,
  username: String,
  createdAt: String,
  comentCount: Number,
  id: String,
  avatar: String,
  likeCount: {
    type: Number,
    default: 0,
  },
});

const like = async () => {
  await postStore.likePost(props.id);
  isLike.value = postStore.isLike;
};
</script>
<template>
  <div class="">
    <div class="flex items-start gap-2">
      <RouterLink
        :to="`/${props.username}`"
        class="bg-[#252525] w-9 aspect-square rounded flex items-center justify-center text-white font-light font-montserrat text-2xl cursor-pointer"
      >
        <p v-if="!props.avatar">{{ props.displayName?.slice(0, 1) || "" }}</p>
        <img
          v-else
          :src="props.avatar"
          alt="Preview"
          class="w-full h-full object-cover rounded-md absolute"
        />
      </RouterLink>

      <div>
        <div class="flex space-x-1 items-center">
          <p class="font-semibold font-montserrat text-[#252525]">
            {{ props.displayName }}
          </p>
          <p class="font-light text-[10px] text-gray-500 font-montserrat">
            @{{ props.username }}
          </p>
        </div>
        <p class="font-montserrat text-sm md:text-base">
          {{ props.content }}
        </p>
        <p class="text-[7px] md:text-[9px] text-gray-500 font-montserrat">
          Post in • {{ formatTime(props.createdAt) }}
        </p>
      </div>
    </div>
    <div class="flex mt-2 px-11">
      <div class="flex items-center space-x-3 [&_svg]:w-4 [&_svg]:h-4">
        <div class="flex space-x-0.5 font-montserrat items-center text-xs">
          <Heart
            v-if="isLike"
            @click="like"
            class="text-[#e63232]"
            :fill="'currentColor'"
            :stroke="'currentColor'"
          />
          <Heart v-else @click="like" />
          <p class="min-w-[20px] text-center">{{ props.likeCount }}</p>
        </div>
        <div class="flex space-x-0.5 font-montserrat items-center text-xs">
          <MessageSquare @click="router.push(`/discussion/${props.id}`)" />
          <p class="min-w-[20px] text-center">{{ props.comentCount }}</p>
        </div>
        <CornerUpRight
          class="ml-10 cursor-pointer"
          @click="router.push(`/discussion/${props.id}`)"
        />
      </div>
    </div>
  </div>
</template>
