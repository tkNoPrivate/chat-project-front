import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index";
import AccountSignup from "../views/AccountSignup";
import Login from "../views/Login";
import Post from "../views/Post";
import RoomSignup from "../views/RoomSignup";
import RoomEdit from "../views/RoomEdit";
import AccountEdit from "../views/AccountEdit";
import RoomManegement from "../views/RoomManagement";
import Error from "../views/Error";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
  {
    path: "/account/signup",
    name: "AccountSignup",
    component: AccountSignup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/post/:roomId",
    name: "Post",
    component: Post,
    props: (route) => ({ roomId: Number(route.params.roomId) }),
  },
  {
    path: "/room/signup",
    name: "RoomSignup",
    component: RoomSignup,
  },
  {
    path: "/room/edit/:roomId",
    name: "RoomEdit",
    component: RoomEdit,
    props: (route) => ({ roomId: Number(route.params.roomId) }),
  },
  {
    path: "/account/edit",
    name: "AccountEdit",
    component: AccountEdit,
  },
  {
    path: "/room/management",
    name: "RoomManegement",
    component: RoomManegement,
  },
  {
    path: "/error/:status",
    name: "Error",
    component: Error,
    props: (route) => ({ status: Number(route.params.status) }),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  router["referrer"] = from;
  next();
});

export default router;
