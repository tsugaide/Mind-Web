import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "../lib/supabase.js";

export const useUserStore = defineStore("userStore", () => {
  const profile = ref(null);
  const error = ref(false);
  const imageUrl = ref("");
  const currentUser = ref(null);

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

  return {
    profile,
    init,
    updateProfil,
    uploadImage,
    initCurrentUser,
    currentUser,
  };
});
