import { defineStore } from "pinia";
import { ref, onUnmounted } from "vue";
import { supabase } from "../lib/supabase.js";
import { useUserStore } from "./userStore.js";

export const useLongStore = defineStore("longStore", () => {
  const posts = ref([]);

  const submitPost = async (title, content, tag) => {
    const userStore = useUserStore();
    const user = userStore.user;
    const profile = userStore.profile;

    if (!content.trim() || !user || !profile) {
      console.warn("Validation failed");
      return;
    }

    const { error } = await supabase.from("longWrites").insert([
      {
        title,
        content,
        tag,
        user_id: user.id,
      },
    ]);

    if (error) {
      console.error("Insert Error:", error);
    }
  };

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("longWrites")
      .select(
        `
        id,
        user_id,
        title,
        content,
        tag,
        created_at,
        likes_count,
        views_count,
        profiles(
          display_name,
          username,
          avatar_url
        )
      `
      )
      .order("created_at", { ascending: false });
    if (!error) posts.value = data;
  };

  return {
    submitPost,
    fetchPosts,
    posts,
  };
});
