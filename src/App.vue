<template>
  <div id="app">
    <div class="layout">
      <sidebar class="sidebar"></sidebar>
      <router-view class="content"></router-view>
    </div>
    <router-view />
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar"
export default {
  name: "App",
  components:{
    sidebar: Sidebar
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