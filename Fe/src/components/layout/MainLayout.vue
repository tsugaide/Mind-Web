<script setup>
import SideBar from "../sidebar/SideBar.vue";
import Navbar from "../home/Navbar.vue";
import { useUserStore } from "../../store/userStore";
import NavBottom from "../NavBottom/NavBottom.vue";
import { onMounted } from "vue";

const userStore = useUserStore();
onMounted(async () => {
  await userStore.currentUser();
});
</script>

<template>
  <div class="flex flex-col h-screen">
    <Navbar
      v-if="userStore.currentUser"
      :display_name="userStore.currentUser.display_name"
      :avatar="userStore.currentUser.avatar_url"
      :username="userStore.currentUser.username"
    />

    <div class="flex overflow-hidden">
      <SideBar
        v-if="userStore.currentUser"
        class="hidden md:block"
        :username="userStore.currentUser.username"
      />
      <div class="overflow-y-auto flex-1 relative">
        <slot></slot>
      </div>
    </div>
    <NavBottom class="block md:hidden" />
  </div>
</template>
