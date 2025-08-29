<script setup>
import SideBar from "../components/sidebar/SideBar.vue";
import Navbar from "../components/home/Navbar.vue";
import { useUserStore } from "../store/userStore";
import { onMounted, ref } from "vue";

const userStore = useUserStore();
const dataUser = ref([]);

onMounted(async () => {
  await userStore.init();
  dataUser.value = userStore.profile;
});
</script>

<template>
  <div class="flex flex-col h-screen">
    <Navbar
      :display_name="dataUser.display_name"
      :avatar="dataUser.avatar_url"
    />

    <div class="flex flex-1 overflow-hidden">
      <SideBar class="hidden md:block" />
      <div class="flex-1 overflow-y-auto">
        <RouterView />
      </div>
    </div>
  </div>
</template>
