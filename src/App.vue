<template>
  <div id="app">
    <div v-if="auth" class="layout">
      <div class="header"></div>
      <div class="sidebar">
        <navigation-bar />
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <div v-else>
      <login-page />
    </div>
  </div>
</template>

<script>
import LoginPage from "@/views/LoginPage";
import NavigationBar from "@/components/NavigationBar";
export default {
  name: "app",
  components: {
    NavigationBar,
    LoginPage
  },
  data() {
    return {
      auth: true
    };
  }
};
</script>

<style>
#app {
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
}
.layout {
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template: 80px 1fr /5em 1fr;
  grid-template-areas: "sidebar header" "sidebar content";
}
.header {
  grid-area: header;
  background-color: #fff;
}
.sidebar {
  grid-area: sidebar;
}
.content {
  grid-area: content;
  background-color: #f3f3f4;
}
</style>
