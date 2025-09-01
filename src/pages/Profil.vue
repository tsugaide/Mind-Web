<script setup>
import UserHeader from "../components/profil/UserHeader.vue";
import ProfileTabs from "../components/profil/ProfileTabs.vue";
import { useUserStore } from "../store/userStore";
import { onMounted, ref } from "vue";
import { RouterView } from "vue-router";

const userStore = useUserStore();
const dataUser = ref([]);

onMounted(async () => {
  await userStore.init();
  dataUser.value = userStore.profile;
});
</script>
<template>
  <div class="max-w-md mx-20">
    <UserHeader
      :name="dataUser.display_name"
      :username="dataUser.username"
      :bio="dataUser.bio"
      :avatar="dataUser.avatar_url"
    />
    <ProfileTabs />
    <RouterView></RouterView>
  </div>
</template>
