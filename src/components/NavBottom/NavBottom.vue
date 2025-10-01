<template>
  <div>
    <nav
      class="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md z-10"
    >
      <ul class="flex justify-around items-center h-12 relative">
        <RouterLink
          v-for="item in leftNavItems"
          :key="item.name"
          :to="item.path"
          class="flex items-center justify-center cursor-pointer relative"
        >
          <component
            :is="item.icon"
            class="w-6 h-6 transition-all duration-200"
            :class="
              isActive(item)
                ? 'text-black -translate-y-2 fill-current'
                : 'text-gray-600'
            "
            :fill="isActive(item) ? 'currentColor' : 'none'"
          />
        </RouterLink>

        <button
          class="bg-black text-white px-8 py-1 rounded-full shadow-md flex items-center justify-center"
          @click="toggleMenu"
        >
          <span class="text-xl font-medium">+</span>
        </button>

        <RouterLink
          v-for="item in rightNavItems"
          :key="item.name"
          :to="item.path"
          class="flex items-center justify-center cursor-pointer relative"
        >
          <component
            :is="item.icon"
            class="w-6 h-6 transition-all duration-200"
            :class="
              isActive(item)
                ? 'text-black -translate-y-2 fill-current'
                : 'text-gray-600'
            "
            :fill="isActive(item) ? 'currentColor' : 'none'"
          />
        </RouterLink>
      </ul>
    </nav>
    <div
      :class="{ 'bottom-14': showMenu, 'bottom-0': !showMenu }"
      class="absolute left-1/2 -translate-x-1/2 flex gap-6 transition-all"
    >
      <RouterLink
        to="/create-post"
        class="bg-black text-white w-32 h-10 rounded-full shadow-md flex justify-center items-center gap-2"
      >
        <Edit3 class="w-4 h-4" />
        <p>Post</p>
      </RouterLink>
      <button
        class="bg-black text-white w-32 h-10 rounded-full shadow-md flex items-center justify-center gap-2"
      >
        <FilePlus class="w-5 h-5" />
        <p>Long Post</p>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Home, FileText, Search, Bell, Edit3, FilePlus } from "lucide-vue-next";

const route = useRoute();
const showMenu = ref(false);

const leftNavItems = [
  { name: "Home", icon: Home, path: "/discussion" },
  { name: "LongWrite", icon: FileText, path: "/long-write" },
];

const rightNavItems = [
  { name: "Search", icon: Search, path: "/search" },
  { name: "Notification", icon: Bell, path: "/notification" },
];

const isActive = (item) => {
  return route.path.startsWith(item.path);
};

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};
</script>
