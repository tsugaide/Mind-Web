<script setup></script>
<template>
  <div class="flex space-x-6 mt-16">
    <RouterLink
      to="/signin"
      class="font-bold font-quattrocento text-lg"
      :class="{
        'text-[#2b2b2b]': $route.path === '/signin',
        'text-gray-500 hover:text-black': $route.path !== '/signin',
      }"
    >
      Sign in
    </RouterLink>
    <RouterLink
      to="/login"
      class="font-bold font-quattrocento text-lg"
      :class="{
        'text-[#2b2b2b]': $route.path === '/login',
        'text-gray-500 hover:text-black': $route.path !== '/login',
      }"
    >
      Log in
    </RouterLink>
  </div>
</template>
