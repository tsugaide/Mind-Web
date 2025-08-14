<script setup>
import Navbar from "../components/home/Navbar.vue";
import QuoteSeciton from "../components/home/QuoteSection.vue";
import Tabs from "../components/home/Tabs.vue";
import SearchBar from "../components/home/SearchBar.vue";
import { RouterView } from "vue-router";
import { useUserStore } from "../store/userStore";
import { onMounted, ref } from "vue";

const userStore = useUserStore();
const user = ref([]);
onMounted(async () => {
  await userStore.init();
  user.value = userStore.profile;
});
</script>
<template>
  <Navbar :display_name="user.display_name" :avatar="user.avatar_url" />
  <QuoteSeciton />
  <SearchBar />
  <Tabs class="sticky" />
  <RouterView />
</template>
