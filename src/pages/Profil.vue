<script setup>
import { useUserStore } from "../store/userStore";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import UserHeader from "../components/profil/UserHeader.vue";
import ProfileTabs from "../components/profil/ProfileTabs.vue";

const userStore = useUserStore();
const route = useRoute();

const props = defineProps({
  usr: String,
});

const fetchProfile = async () => {
  await userStore.init(props.usr);
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
  <div
    class="max-w-md md:mx-20 mx-8"
    v-if="userStore.profile && userStore.currentUser"
  >
    <UserHeader
      :name="userStore.profile.display_name"
      :username="userStore.profile.username"
      :bio="userStore.profile.bio"
      :avatar="userStore.profile.avatar_url"
      :isUser="userStore.currentUser.username == props.usr"
    />
    <ProfileTabs :username="userStore.profile.username" />
    <RouterView v-slot="{ Component }">
      <component
        :is="Component"
        :isUser="userStore.currentUser.username == props.usr"
      />
    </RouterView>
  </div>
</template>
