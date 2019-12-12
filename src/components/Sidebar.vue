<template>
  <nav class="navigation">
    <div class="navigation-logo">
      <img
        class="img-fluid"
        src="@/assets/logo.png"
        alt="piperun-logo"
      />
    </div>
    <ul class="navigation-items">
      <li><router-link to="/pipelines">Pipelines</router-link></li>
      <li><router-link to="/activities">Activities</router-link></li>
      <li><router-link to="/companies">Companies</router-link></li>
      <li><router-link to="/persons">Persons</router-link></li>
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li>
        <button class="btn btn-secundary mt-3" v-on:click="logout">
          Logout
        </button>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "Sidebar",
  data() {
    return {};
  },
  filters: {},
  methods: {
    logout() {
      localStorage.setItem("token", "");
      this.$router.push({ name: "Login" });
      this.$emit('logout')
    }
  }
};
</script>

<style scoped>
.navigation {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  width: 5.2em;
  float: left;
  background-color: #2f4050;
}
ul {
  list-style: none;
  padding: 0;
}
img {
  height: 35px;
  width: 35px;
  margin: 10px;
}
.navigation-items {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
li a {
  width: 83.2px;
  height: 80px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #a7b1c2;
}
li a:hover {
  background-color: #243746;
  color: #fff;
  text-decoration: none;
}
</style>