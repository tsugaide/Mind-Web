import { createRouter, createWebHistory } from "vue-router";
import SignForm from "../components/register/SignForm.vue";
import LoginForm from "../components/register/LoginForm.vue";
import Beranda from "../pages/Beranda.vue";
import Register from "../pages/Register.vue";
import Wym from "../components/home/longWrite/LongWrite.vue";
import Discussion from "../components/home/discussion/Discussion.vue";
import PostReply from "../components/home/discussion/PostReply.vue";
import AllPost from "../components/home/discussion/AllPost.vue";

const routes = [
  { path: "/", redirect: "/register" },
  {
    path: "/register",
    component: Register,
    children: [
      { path: "/signin", component: SignForm },
      { path: "/login", component: LoginForm },
    ],
  },
  {
    path: "/beranda",
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
      { path: "long-write", component: Wym },
      { path: "", redirect: "discussion" },
    ],
  },
  {
    path: "/profil",
    component: () => import("../pages/Profil.vue"),
    children: [
      {
        path: "post",
        component: () => import("../components/profil/daftarPost.vue"),
      },
      { path: "", redirect: "/profil/post" },
    ],
  },
  {
    path: "/edit-profil",
    component: () => import("../pages/EditProfile.vue"),
  },
  {
    path: "/create-long-write",
    component: () => import("../pages/CreateLongWrite.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
