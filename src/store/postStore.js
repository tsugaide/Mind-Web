import { defineStore } from "pinia";
import { ref, onUnmounted } from "vue";
import { supabase } from "../lib/supabase.js";
import { useUserStore } from "./userStore.js";

export const usePostStore = defineStore("postStore", () => {
  const posts = ref([]);
  const isLike = ref(false);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        id,
        user_id,
        content,
        created_at,
        likes_count,
        coments_count,
        parent_id,
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

  const subscribeToPosts = () => {
    const subscription = supabase
      .channel("public:posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        async (payload) => {
          const post = payload.new;

          const { data: profile, error } = await supabase
            .from("profiles")
            .select("display_name, username, avatar_url")
            .eq("id", post.user_id)
            .single();

          if (error) {
            console.error("Gagal ambil profil:", error);
            return;
          }

          post.profiles = profile;

          posts.value = [post, ...posts.value];
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "posts" },
        (payload) => {
          const updatedPost = payload.new;
          const index = posts.value.findIndex((p) => p.id === updatedPost.id);
          if (index !== -1) {
            posts.value[index] = {
              ...posts.value[index],
              ...updatedPost,
            };
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  };

  const submitPost = async (content, parentId) => {
    const userStore = useUserStore();
    const user = userStore.currentUser;

    if (!content.trim() || !user) {
      console.log("profil tidak ada");
      return;
    }

    const { error } = await supabase.from("posts").insert([
      {
        content,
        user_id: user.id,
        parent_id: parentId,
      },
    ]);

    if (error) console.error(error);
  };

  const likePost = async (postId) => {
    const { error } = await supabase.rpc("toggle_likes", {
      post_id: postId,
      is_like: isLike.value,
    });

    if (!error) isLike.value = !isLike.value;
  };

  const replyPost = async (parentId) => {
    const { error } = await supabase.rpc("increment_coments", {
      post_id: parentId,
    });

    if (error) console.error("Gagal coment:", error);
  };

  return {
    posts,
    fetchPosts,
    subscribeToPosts,
    submitPost,
    likePost,
    replyPost,
    isLike,
  };
});
