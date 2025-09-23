import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/authStore";

// Pages
import Discussion from "../pages/Discussion.vue";
import PostReply from "../components/home/discussion/PostReply.vue";
import AllPost from "../components/home/discussion/AllPost.vue";
import Wym from "../pages/LongWrite.vue";
import LongAllPost from "../components/home/longWrite/LongAllPost.vue";
import LongSpecificPost from "../components/home/longWrite/LongSpecificPost.vue";
import Profil from "../pages/Profil.vue";
import DaftarPost from "../components/profil/daftarPost.vue";
import DaftarLongWrite from "../components/profil/daftarLongWrite.vue";
import Register from "../pages/Register.vue";
import SignForm from "../components/register/SignForm.vue";
import LoginForm from "../components/register/LoginForm.vue";
import { name } from "dayjs/locale/id";

const routes = [
  // redirect / ke discussion
  { path: "/", redirect: "/discussion" },

  // Discussion routes
  {
    path: "/discussion",
    component: Discussion,
    meta: { layout: "Main", requiresAuth: true },
    children: [
      { path: "", component: AllPost, name: "Discussion" },
      { path: ":id", component: PostReply, props: true },
    ],
  },

  // Long write routes
  {
    path: "/long-write",
    component: Wym,
    meta: { layout: "Main", requiresAuth: true },
    children: [
      { path: "", component: LongAllPost, name: "LongWrite" },
      { path: ":id", component: LongSpecificPost, props: true },
    ],
  },

  // Profil dynamic routes, termasuk edit profile
  {
    path: "/:usr",
    component: Profil,
    props: true,
    name: "Profile",
    meta: { layout: "Main", requiresAuth: true },
    children: [
      { path: "post", component: DaftarPost, props: true, name: "ProfilePost" },
      {
        path: "long-write",
        component: DaftarLongWrite,
        props: true,
      },
      {
        path: "edit-profil",
        component: () => import("../pages/EditProfile.vue"),
      },
      { path: "", redirect: { name: "ProfilePost" } },
    ],
  },

  // Auth routes
  {
    path: "/register",
    component: Register,
    meta: { layout: "Auth" },
    children: [
      { path: "signin", component: SignForm },
      { path: "login", component: LoginForm },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global auth guard
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();
  await auth.checkLogin();

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next("/register");
  } else {
    next();
  }
});

export default router;
