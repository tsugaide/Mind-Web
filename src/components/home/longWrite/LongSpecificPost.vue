<script setup>
import { computed, defineProps, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useLongStore } from "../../../store/longStore";

const longStore = useLongStore();
const route = useRoute();
const post = ref([]);

onMounted(async () => {
  await longStore.fetchPosts();
  post.value = longStore.posts.find((p) => p.id === route.params.id);
});
</script>

<template>
  <p>{{ post }}</p>
</template>
