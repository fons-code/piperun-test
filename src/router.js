import Vue from "vue";
import Router from "vue-router";
//import pages
import Login from "@/views/LoginPage";
import Activities from "@/views/ActivitiesPage";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/activities",
      name: "activities",
      component: Activities
    }
  ]
});
