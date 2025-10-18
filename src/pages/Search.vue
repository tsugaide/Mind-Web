<script setup>
import SearchBar from "../components/search/SearchBar.vue";
import Account from "../components/search/Account.vue";
import { useSearchStore } from "../store/searchStore";
import { useUserStore } from "../store/userStore";
import { useRoute } from "vue-router";

const route = useRoute();
const searchStore = useSearchStore();
const userStore = useUserStore();
</script>
<template>
  <div v-if="!route.query.keyword">
    <SearchBar />
    <p v-if="searchStore.loading">Loading....</p>
    <div v-else class="mx-8 my-10 flex flex-col gap-8">
      <Account
        v-for="profile in searchStore.result"
        :key="profile.id"
        :name="profile.display_name"
        :username="profile.username"
        :avatar="profile.avatar_url"
        :isFollow="userStore.currentUser.following.includes(profile.id)"
        :userId="profile.id"
        :currentUserId="userStore.currentUser.id"
        :is-user="userStore.currentUser.id == profile.id"
      />
    </div>
  </div>
  <div v-else>p</div>
</template>
