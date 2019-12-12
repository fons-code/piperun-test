import Vue from "vue";
import Router from "vue-router";
import axios from "../config/axios";
import VueAxios from "vue-axios";

//import Login from "@/views/Login";
import Home from "@/views/Home";
import CreateActivities from "@/components/CreateActivities";
import Pipelines from "@/views/Pipelines";
import Persons from "@/views/Persons";
import Companies from "@/views/Companies";
import Dashboard from "@/views/Dashboard";

Vue.use(Router);
Vue.use(VueAxios, axios);

export default new Router({
  routes: [
    {
      path: "/home",
      redirect: "/activities",
      name: "Home",
      component: Home
    },
    {
      path: "/activities",
      name: "Activities",
      component: Home
    },
    {
      path: "/create",
      name: "CreateActivities",
      component: CreateActivities,
      children: [
        {
          path: ":id",
          name: "EditActivities",
          props: { id: ":id" },
          component: CreateActivities
        }
      ]
    },
    {
      path: "/pipelines",
      name: "Pipelines",
      component: Pipelines
    },
    {
      path: "/persons",
      name: "Persons",
      component: Persons
    },
    {
      path: "/companies",
      name: "Companies",
      component: Companies
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard
    }
  ]
});
