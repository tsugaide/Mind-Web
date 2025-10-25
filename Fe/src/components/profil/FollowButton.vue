<script setup>
import { useUserStore } from "../../store/userStore";
import { computed, watchEffect, ref } from "vue";

const userStore = useUserStore();

const props = defineProps({
  userId: String,
});

const isFollow = ref(false);

watchEffect(() => {
  isFollow.value = userStore.currentUser.following.includes(props.userId);
});
const follow = async () => {
  await userStore.addFollowing(userStore.currentUser.id, props.userId);
  await userStore.addFollower(props.userId, userStore.currentUser.id);
  isFollow.value = true;
};

const unFollow = async () => {
  await userStore.removeFollowing(userStore.currentUser.id, props.userId);
  await userStore.removeFollower(props.userId, userStore.currentUser.id);
  isFollow.value = false;
};
</script>
<template>
  <div>
    <button
      v-if="isFollow"
      @click="unFollow"
      class="bg-transparent w-18 py-1 border text-[#252525] px-3 rounded-full md:text-sm text-xs font-quattrocento"
    >
      Followed
    </button>
    <button
      v-else
      @click="follow"
      class="bg-[#252525] w-18 py-1 text-white px-3 rounded-full md:text-sm text-xs font-quattrocento"
    >
      Follow
    </button>
  </div>
</template>
