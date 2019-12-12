<template>
  <div id="app">
    <div v-if="auth" class="layout">
      <sidebar  v-on:logout="changeAuth" class="sidebar"></sidebar>
      <router-view class="content"/>
    </div>
    <div v-else>
      <login v-on:auth-success="changeAuth"/>
    </div>
  </div>
</template>
<script>
import Login from '@/views/Login'
import Sidebar from "@/components/Sidebar";
export default {
  name: "App",
  components: {
    sidebar: Sidebar,
    login : Login
  },
  data() {
    return {
      auth: false
    };
  },
  methods: {
    changeAuth(){
      this.auth = !this.auth
    }
  }
};
</script>
<style scoped>
.layout {
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template: 80px 1fr /5em 1fr;
  grid-template-areas: "sidebar content" "sidebar content";
}
.sidebar {
  grid-area: sidebar;
}
.content {
  grid-area: content;
  padding: 45px;
  background-color: #f3f3f4;
}
</style>
