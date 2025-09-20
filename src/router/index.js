import { createRouter, createWebHistory } from "vue-router";
import SignForm from "../components/register/SignForm.vue";
import LoginForm from "../components/register/LoginForm.vue";
import Beranda from "../pages/Beranda.vue";
import Register from "../pages/Register.vue";
import Wym from "../components/home/longWrite/LongWrite.vue";
import Discussion from "../components/home/discussion/Discussion.vue";
import PostReply from "../components/home/discussion/PostReply.vue";
import AllPost from "../components/home/discussion/AllPost.vue";
import Main from "../pages/Main.vue";
import LongAllPost from "../components/home/longWrite/LongAllPost.vue";
import LongSpecificPost from "../components/home/longWrite/LongSpecificPost.vue";
import { useAuthStore } from "../store/authStore";

const routes = [
  {
    path: "/",
    component: Main,
    children: [
      { path: "", redirect: "/beranda/discussion" },
      {
        path: "beranda",
        component: Beranda,
        children: [
          {
            path: "discussion",
            component: Discussion,
            children: [
              { path: ":id", component: PostReply },
              { path: "", component: AllPost },
            ],
          },
          {
            path: "long-write",
            component: Wym,
            children: [
              {
                path: ":id",
                component: LongSpecificPost,
                props: true,
              },
              { path: "", component: LongAllPost },
            ],
          },
          { path: "", redirect: "discussion" },
        ],
        meta: { requiresAuth: true },
      },

      {
        path: "profil",
        component: () => import("../pages/Profil.vue"),
        children: [
          {
            path: "post",
            component: () => import("../components/profil/daftarPost.vue"),
          },
          {
            path: "long-write",
            component: () => import("../components/profil/daftarLongWrite.vue"),
          },
          { path: "", redirect: "/profil/post" },
        ],
      },
      {
        path: "edit-profil",
        component: () => import("../pages/EditProfile.vue"),
      },
      {
        path: "create-long-write",
        component: () => import("../pages/CreateLongWrite.vue"),
      },
    ],
  },

  {
    path: "/register",
    component: Register,
    children: [
      { path: "/signin", component: SignForm },
      { path: "/login", component: LoginForm },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

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
