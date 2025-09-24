<script setup></script>
<template>
  <div class="flex space-x-6 mt-16">
    <RouterLink
      to="/register/signin"
      class="font-bold font-quattrocento text-lg"
      :class="{
        'text-[#2b2b2b]': $route.path === '/register/signin',
        'text-gray-500 hover:text-black': $route.path !== '/register/signin',
      }"
    >
      Sign in
    </RouterLink>
    <RouterLink
      to="/register/login"
      class="font-bold font-quattrocento text-lg"
      :class="{
        'text-[#2b2b2b]': $route.path === '/register/login',
        'text-gray-500 hover:text-black': $route.path !== '/register/login',
      }"
    >
      Log in
    </RouterLink>
  </div>
</template>
