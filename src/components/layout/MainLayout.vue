<script setup>
import SideBar from "../sidebar/SideBar.vue";
import Navbar from "../home/Navbar.vue";
import { useUserStore } from "../../store/userStore";
import NavBottom from "../NavBottom/NavBottom.vue";

const userStore = useUserStore();
</script>

<template>
  <div class="flex flex-col h-screen">
    <Navbar
      v-if="userStore.currentUser"
      :display_name="userStore.currentUser.display_name"
      :avatar="userStore.currentUser.avatar_url"
      :username="userStore.currentUser.username"
    />

    <div class="flex flex-1 overflow-hidden">
      <SideBar
        v-if="userStore.currentUser"
        class="hidden md:block"
        :username="userStore.currentUser.username"
      />
      <div class="flex-1 overflow-y-auto">
        <slot></slot>
      </div>
    </div>
    <NavBottom
      v-if="userStore.currentUser"
      class="block md:hidden"
      :username="userStore.currentUser.username"
    />
  </div>
</template>
