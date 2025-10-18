import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "../lib/supabase.js";

export const useSearchStore = defineStore("searchStore", () => {
  const result = ref([]);
  const loading = ref(false);

  const getProfiles = async (keyword) => {
    loading.value = true;
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .or(`username.ilike.%${keyword}%, display_name.ilike.%${keyword}%`);

    if (error) {
      console.error(error.message);
    }

    result.value = data;
    loading.value = false;
  };

  return {
    getProfiles,
    result,
    loading,
  };
});
