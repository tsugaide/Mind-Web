<script setup>
import { Search } from "lucide-vue-next";
import { useRouter, useRoute } from "vue-router";
import { ref, watch } from "vue";
import { useSearchStore } from "../../store/searchStore";

const searchStore = useSearchStore();
const router = useRouter();
const keyword = ref("");

const getDataProfile = async (key) => {
  await searchStore.getProfiles(key);
};

let timeout;
watch(keyword, (newVal) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => getDataProfile(newVal), 400);
});

const goSearch = () => {
  router.push({ path: "/search", query: { keyword: keyword.value } });
};
</script>
<template>
  <div class="flex items-center justify-center mt-6 px-8">
    <div
      class="flex items-center w-full max-w-md bg-gray-200 rounded-md px-4 py-2"
    >
      <input
        type="text"
        v-model="keyword"
        @keyup.enter="goSearch"
        placeholder="Search..."
        class="flex-1 bg-transparent outline-none font-montserrat text-gray-700 placeholder:text-gray-500"
      />
      <Search @click="goSearch" class="w-5 h-5 text-gray-600" />
    </div>
  </div>
</template>
