<script setup>
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";
import { useRouter } from "vue-router";
import EditProfile from "./EditProfile.vue";
import { computed, ref } from "vue";

const authStore = useAuthStore();
const userStore = useUserStore();
const isEditProfil = ref(false);

const props = defineProps({
  name: String,
  username: String,
  bio: String,
  avatar: String,
  isUser: Boolean,
  userId: String,
  currentUserId: String,
  following: Number,
  follower: Number,
});

const isFollow = ref(userStore.currentUser.following.includes(props.userId));

const logOut = async () => {
  authStore.logout();
};

const follow = async () => {
  await userStore.addFollowing(props.currentUserId, props.userId);
  await userStore.addFollower(props.userId, props.currentUserId);
  isFollow.value = true;
};

const unFollow = async () => {
  await userStore.removeFollowing(props.currentUserId, props.userId);
  await userStore.removeFollower(props.userId, props.currentUserId);
  isFollow.value = false;
};
</script>
<template>
  <div>
    <div class="flex gap-4 items-end">
      <div
        class="relative md:w-20 md:h-20 w-20 h-20 bg-[#252525] rounded-md md:text-7xl text-6xl font-medium font-quattrocento text-white flex items-center justify-center"
      >
        <p v-if="!props.avatar">{{ props.name?.slice(0, 1) || "" }}</p>
        <img
          v-else
          :src="props.avatar"
          alt="Preview"
          class="w-20 h-20 object-cover rounded-md absolute"
        />
      </div>

      <div class="flex-1">
        <div class="flex items-end justify-between">
          <div>
            <h1
              class="md:text-2xl text-xl font-medium font-quattrocento leading-none"
            >
              {{ name }}
            </h1>
            <p class="text-gray-500 md:text-sm text-xs font-quattrocento">
              @{{ username }}
            </p>
          </div>
          <div>
            <div
              v-if="isUser"
              class="flex gap-1 flex-col justify-center md:flex-row"
            >
              <button
                class="bg-[#252525] text-white px-2 py-0.5 rounded-full md:text-sm text-[10px] font-quattrocento"
                @click="isEditProfil = true"
              >
                Edit Profile
              </button>
              <button
                @click="logOut"
                class="border border-[#252525] text-[#252525] px-2 md:text-sm rounded-full text-xs font-quattrocento"
              >
                Log Out
              </button>
            </div>
            <template v-else>
              <button
                v-if="isFollow"
                @click="unFollow"
                class="bg-transparent border text-[#252525] px-3 rounded-full md:text-sm text-xs font-quattrocento"
              >
                Followed
              </button>
              <button
                v-else
                @click="follow"
                class="bg-[#252525] text-white px-3 rounded-full md:text-sm text-xs font-quattrocento"
              >
                Follow
              </button>
            </template>
          </div>
        </div>
        <div class="mt-2 flex gap-2">
          <div class="flex gap-2 font-quattrocento text-xs items-center">
            <p>
              <span class="font-semibold">{{ props.following }}</span> Following
            </p>
            <p>
              <span class="font-semibold">{{ props.follower }}</span> Follower
            </p>
          </div>
        </div>
      </div>
    </div>
    <p class="text-base mt-4 font-quattrocento">{{ bio }}</p>
  </div>

  <EditProfile
    v-if="isEditProfil"
    v-model:is-close="isEditProfil"
    :username="props.username"
  />
</template>
