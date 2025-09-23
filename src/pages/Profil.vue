<script setup>
import UserHeader from "../components/profil/UserHeader.vue";
import ProfileTabs from "../components/profil/ProfileTabs.vue";
import { useUserStore } from "../store/userStore";
import { onMounted, ref, watch } from "vue";
import { RouterView, useRoute } from "vue-router";

const userStore = useUserStore();
const route = useRoute();

const props = defineProps({
  usr: String,
});

const fetchProfile = async () => {
  await userStore.init(props.usr);
  console.log(userStore.profile.id);
};
onMounted(fetchProfile);

watch(
  () => route.params.usr,
  () => {
    fetchProfile();
  }
);
</script>
<template>
  <div class="max-w-md mx-20" v-if="userStore.profile">
    <UserHeader
      :name="userStore.profile.display_name"
      :username="userStore.profile.username"
      :bio="userStore.profile.bio"
      :avatar="userStore.profile.avatar_url"
      :isUser="userStore.currentUser.username == props.usr"
    />
    <ProfileTabs :username="userStore.profile.username" />
    <RouterView> </RouterView>
  </div>
</template>
