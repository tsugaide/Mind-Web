import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "../lib/supabase.js";

export const useUserStore = defineStore("userStore", () => {
  const profile = ref(null);
  const error = ref(false);
  const imageUrl = ref("");
  const currentUser = ref(null);
  const subscribe = ref(null);

  const initCurrentUser = async () => {
    const { data: authData, error: authErr } = await supabase.auth.getUser();
    if (authErr || !authData.user) {
      return;
    }

    const { data: profileData, error: profileErr } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (profileErr) {
      console.error("Gagal ambil currentUser:", profileErr);
      return;
    }

    currentUser.value = profileData;
  };

  const init = async (usr) => {
    const { data: profileData, error: profileErr } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", usr)
      .single();

    if (profileErr) {
      console.error("Gagal ambil profile:", profileErr);
      return;
    }

    profile.value = profileData;
    subscribeToFollows(usr);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "photo_upload");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dehhgkioo/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        imageUrl.value = data.secure_url;
      } else {
        throw new Error(data.error?.message || "Gagal upload");
      }
    } catch (err) {
      imageUrl.value = "";
    }
  };

  const updateProfil = async (newName, newBio) => {
    if (!currentUser.value) await init();

    const { data, error: err } = await supabase
      .from("profiles")
      .update({
        bio: newBio,
        display_name: newName,
        avatar_url: imageUrl.value,
      })
      .eq("id", profile.value.id);

    if (err) {
      error.value = err.message;
      return;
    }
  };

  const addFollowing = async (userId, followingId) => {
    const { data, error: err } = await supabase.rpc("add_following", {
      user_id: userId,
      following_id: followingId,
    });

    if (err) {
      console.error(err);
      return;
    }
  };

  const addFollower = async (userId, followerId) => {
    const { data, error: err } = await supabase.rpc("add_follower", {
      user_id: userId,
      follower_id: followerId,
    });

    if (err) {
      console.error(err);
      return;
    }
  };

  const removeFollower = async (userId, followerId) => {
    const { data, error: err } = await supabase.rpc("remove_follower", {
      user_id: userId,
      follower_id: followerId,
    });

    if (err) {
      console.error(err);
      return;
    }
  };

  const removeFollowing = async (userId, followingId) => {
    const { data, error: err } = await supabase.rpc("remove_following", {
      user_id: userId,
      following_id: followingId,
    });

    if (err) {
      console.error(err);
      return;
    }
  };

  const subscribeToFollows = (usr) => {
    if (subscribe.value) subscribe.value.unsubscribe();
    subscribe.value = supabase
      .channel("realtime-follow")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `username=eq.${usr}`,
        },
        (payload) => {
          const updated = payload.new;
          profile.value.following = updated.following;
          profile.value.follower = updated.follower;
        }
      )
      .subscribe();
  };

  const clearListener = () => {
    if (subscribe.value) subscribe.value.unsubscribe();
    subscribe.value = null;
  };

  return {
    profile,
    init,
    updateProfil,
    uploadImage,
    initCurrentUser,
    currentUser,
    addFollowing,
    addFollower,
    removeFollower,
    removeFollowing,
    clearListener,
  };
});
