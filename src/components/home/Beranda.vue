<script setup>
import QuoteSeciton from "./QuoteSection.vue";
import Tabs from "./Tabs.vue";
import SearchBar from "../search/SearchBar.vue";
</script>
<template>
  <SearchBar />
  <Tabs class="sticky" />
  <slot></slot>
</template>
