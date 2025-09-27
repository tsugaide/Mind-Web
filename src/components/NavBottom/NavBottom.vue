<!-- BottomNavbar.vue -->
<template>
  <nav
    class="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md"
  >
    <ul class="flex justify-around items-center h-12">
      <RouterLink
        v-for="item in navItems"
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
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { MessageSquare, FileText, Search, Bell, User } from "lucide-vue-next";

const props = defineProps({
  username: {
    type: String,
    default: "",
  },
});

const route = useRoute();

const navItems = [
  { name: "Discussion", icon: MessageSquare, path: "/discussion" },
  { name: "LongWrite", icon: FileText, path: "/long-write" },
  { name: "Search", icon: Search, path: "/search" },
  { name: "Notification", icon: Bell, path: "/notification" },
  { name: "Profile", icon: User, path: `/${props.username}` },
];

const isActive = (item) => {
  return route.path.startsWith(item.path);
};
</script>
