<script setup>
import QuoteSeciton from "../components/home/QuoteSection.vue";
import Tabs from "../components/home/Tabs.vue";
import SearchBar from "../components/home/SearchBar.vue";
</script>
<template>
  <QuoteSeciton />
  <SearchBar />
  <Tabs class="sticky" />
  <RouterView />
</template>
