<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { Home, MessageSquare, FileText, Quote, User } from "lucide-vue-next";

const menuItems = [
  { name: "Home", icon: Home, path: "/beranda/discussion" },
  { name: "Discussion", icon: MessageSquare, path: "/beranda/discussion" },
  { name: "LongWrite", icon: FileText, path: "/beranda/long-write" },
  { name: "Quotes", icon: Quote },
  { name: "Profile", icon: User, path: "/profil" },
];

const active = ref("Home");
</script>

<template>
  <aside class="h-screen w-80 font-montserrat flex flex-col p-4">
    <nav class="flex-1 space-y-2">
      <button
        v-for="item in menuItems"
        :key="item.name"
        @click="active = item.name"
        class="flex items-center w-full px-3 py-2 rounded-lg transition hover:bg-[#1f1f1f1f] hover:text-[#acacac]"
        :class="
          active === item.name ? 'bg-[#1f1f1f1f] text-[#acacac]' : 'text-black'
        "
      >
        <component
          :is="item.icon"
          class="w-5 h-5 mr-3"
          :class="active === item.name ? 'text-[#acacac]' : 'text-black'"
        />
        <RouterLink :to="item.path">{{ item.name }}</RouterLink>
      </button>
    </nav>
  </aside>
</template>
