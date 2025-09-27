<script setup>
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import {
  Home,
  MessageSquare,
  FileText,
  Quote,
  User,
  Type,
} from "lucide-vue-next";
import { useUserStore } from "../../store/userStore";

const props = defineProps({
  username: {
    type: String,
    default: "",
  },
});

const menuItems = [
  { name: "Discussion", icon: MessageSquare, path: "/discussion" },
  { name: "LongWrite", icon: FileText, path: "/long-write" },
  { name: "Quotes", icon: Quote, path: "#" },
  { name: "Profile", icon: User, path: `/${props.username}` },
];
</script>

<template>
  <aside class="h-screen w-80 font-montserrat flex flex-col p-4">
    <nav class="flex-1 space-y-2">
      <div v-for="item in menuItems" :key="item.name">
        <RouterLink
          :to="item.path"
          class="flex items-center w-full px-3 py-2 rounded-lg transition hover:bg-[#1f1f1f1f] hover:text-[#acacac]"
          :class="[
            $route.path.startsWith(item.path)
              ? 'bg-[#1f1f1f1f] text-[#acacac]'
              : 'text-black',
          ]"
        >
          <component :is="item.icon" class="w-5 h-5 mr-3" />
          <span>{{ item.name }}</span>
        </RouterLink>
      </div>
    </nav>
  </aside>
</template>
