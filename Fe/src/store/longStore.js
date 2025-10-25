import { defineStore } from "pinia";
import { ref, onUnmounted } from "vue";
import { supabase } from "../lib/supabase.js";
import { useUserStore } from "./userStore.js";

export const useLongStore = defineStore("longStore", () => {
  const posts = ref([]);
  const loading = ref(false);
  const isLike = ref(false);

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
    loading.value = true;
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
    if (!error) {
      loading.value = false;
      posts.value = data;
    }
  };

  const likePost = async (postId) => {
    const { error } = await supabase.rpc("toggle_likes_long", {
      post_id: postId,
      is_like: isLike.value,
    });

    if (!error) {
      isLike.value = !isLike.value;
    } else {
      console.error(error);
    }
  };

  return {
    submitPost,
    fetchPosts,
    posts,
    loading,
    likePost,
  };
});
