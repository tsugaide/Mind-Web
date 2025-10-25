// stores/auth.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "../lib/supabase.js";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const user = ref(null);
  const errorMessageSignIn = ref(null);
  const errorMessageLogin = ref(null);
  const isLoading = ref(false);
  const isSignUp = ref(false);
  const isLoggedIn = ref(false);

  //   signUp
  const signUp = async (username, password, displayName) => {
    isLoading.value = true;
    errorMessageSignIn.value = null;

    const fakeEmail = `${username.toLowerCase()}@mind.fake`;

    const { data, error } = await supabase.auth.signUp({
      email: fakeEmail,
      password,
    });

    if (error) {
      isLoading.value = false;
      errorMessageSignIn.value = getSignupErrorMessage(error);
      return false;
    } else {
      isSignUp.value = true;
    }

    const { user: signedUpUser } = data;

    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: signedUpUser.id,
        username,
        display_name: displayName,
      },
    ]);

    isLoading.value = false;

    if (profileError) {
      errorMessageSignIn.value = profileError.message;
      return false;
    }

    user.value = signedUpUser;
    return true;
  };

  //   login
  const logIn = async (username, password) => {
    isLoading.value = true;
    errorMessageLogin.value = null;

    const fakeEmail = `${username.toLowerCase()}@mind.fake`;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: fakeEmail,
      password,
    });

    isLoading.value = false;

    if (error) {
      errorMessageLogin.value = getLoginErrorMessage(error);
      console.error(error.message);
      return false;
    }

    user.value = data.user;
    return true;
  };

  //check login
  const checkLogin = async () => {
    const { data } = await supabase.auth.getSession();
    isLoggedIn.value = !!data.session;
  };

  const listenAuth = () => {
    supabase.auth.onAuthStateChange((event, session) => {
      isLoggedIn.value = !!session;
    });
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout gagal:", error.message);
      return;
    }

    user.value = null;
    router.push("/register");
  };

  //eror login
  function getLoginErrorMessage(error) {
    if (!error) return null;

    const msg = error.message;

    if (msg.includes("Invalid login credentials"))
      return "Username atau password salah";
    if (msg.includes("Email not confirmed"))
      return "Email kamu belum dikonfirmasi. Cek inbox atau spam ya";
    if (msg.includes("User not found")) return "Akun tidak ditemukan";
    if (msg.includes("Token has expired") || msg.includes("Invalid token"))
      return "Sesi login kadaluarsa. Silahkan login ulang";
    if (msg.includes("session")) return "Gagal login. Coba refresh halaman";
    if (msg.includes("Unexpected error"))
      return "Ada error tiba-tiba. Coba login lagi";
    if (msg.includes("OAuth login error"))
      return "Gagal login lewat akun pihak ketiga. Coba cara lain";

    return "Terjadi kesalahan saat login. Coba lagi ya";
  }

  //eror sign in
  function getSignupErrorMessage(error) {
    if (!error) return null;

    const msg = error.message;

    if (msg.includes("User already registered")) return "Akun sudah terdaftar";
    if (msg.includes("valid password")) return "Password tidak valid";
    if (msg.includes("at least 6 characters"))
      return "Password minimal 6 karakter";
    if (msg.includes("Missing email or phone")) return "username belum terisi";
    if (msg.includes("Signups not allowed"))
      return "Pendaftaran dimatikan. Hubungi admin";
    if (msg.includes("rate limit")) return "Terlalu sering minta email";
    if (msg.includes("link is invalid or has expired"))
      return "Link verifikasi sudah expired";
    if (msg.includes("Cannot send verification email"))
      return "Gagal kirim email verifikasi. Cek email kamu bener nggak 📧";
    if (msg.includes("provided email is invalid"))
      return "Format email salah. Cek lagi ya 📬";

    return "Terjadi kesalahan saat daftar. Silahkan coba lagi";
  }

  return {
    user,
    errorMessageSignIn,
    errorMessageLogin,
    isLoading,
    isSignUp,
    signUp,
    logIn,
    checkLogin,
    listenAuth,
    isLoggedIn,
    logout,
    getLoginErrorMessage,
    getSignupErrorMessage,
  };
});
