<script setup>
import { useLongStore } from "../store/longStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const longStore = useLongStore();
const judul = ref("");
const isi = ref("");
const tag = ref("");

const post = async () => {
  await longStore.submitPost(judul.value, isi.value, tag.value);
  judul.value = "";
  isi.value = "";
  tag.value = "";
  router.push("/beranda/long-write");
};
</script>
<template>
  <h1 class="font-quattrocento text-2xl font-medium text-center py-8">
    Write Your Mind
  </h1>
  <div class="px-5 pb-8">
    <textarea
      v-model="judul"
      placeholder="Judul"
      class="resize-none bg-transparent focus:outline-none w-full h-20 text-xl font-semibold font-quattrocento-sans"
      maxlength="80"
    ></textarea>
    <textarea
      v-model="isi"
      placeholder="Isi"
      class="resize-none bg-transparent focus:outline-none w-full h-96 text-base font-medium font-garamond"
    ></textarea>
    <textarea
      v-model="tag"
      placeholder="Tagar"
      class="resize-none bg-transparent focus:outline-none w-full h-18 text-base font-medium font-montserrat"
      maxlength="28"
    ></textarea>
    <button
      @click="post"
      class="bg-transparent border px-6 py-1 text-xl font-quattrocento rounded-full hover:bg-black hover:text-white transition-all"
    >
      Post
    </button>
  </div>
</template>
