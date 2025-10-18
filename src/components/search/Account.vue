<script setup>
import { RouterLink } from "vue-router";
import FollowButton from "../profil/FollowButton.vue";
const props = defineProps({
  avatar: String,
  name: String,
  username: String,
  isFollow: Boolean,
  userId: String,
  currentUserId: String,
  isUser: Boolean,
});
</script>
<template>
  <div class="flex justify-between items-end w-72">
    <div class="flex gap-3">
      <RouterLink
        :to="`/${props.username}`"
        class="relative bg-[#252525] w-10 aspect-square rounded flex items-center justify-center text-white font-light font-quattrocento text-2xl cursor-pointer"
      >
        <p v-if="!props.avatar">{{ props.name?.slice(0, 1) || "" }}</p>
        <img
          v-else
          :src="props.avatar"
          alt="Preview"
          class="w-full h-full object-cover rounded-md absolute"
        />
      </RouterLink>
      <div class="flex justify-between items-center gap-20">
        <div>
          <h1
            class="md:text-2xl text-xl font-medium font-quattrocento leading-none"
          >
            {{ props.name }}
          </h1>
          <p class="text-gray-500 md:text-sm text-xs font-quattrocento">
            @{{ props.username }}
          </p>
        </div>
      </div>
    </div>
    <div>
      <FollowButton
        v-if="!props.isUser"
        :user-id="props.userId"
        :current-user-id="props.currentUserId"
      />
    </div>
  </div>
</template>
