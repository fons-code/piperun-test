<template>
  <div class="container">
    <div class="row">
      <div class="col-sm"></div>
      <div class="col-sm login m-5">
        <form v-on:submit.prevent="authentication(form)">
          <h1 class="h3 mb-3 font-weight-normal">Login</h1>
          <p>Piperun</p>
          <div class="form-group">
            <label for="inputEmail" class="sr-only"></label>
            <input
              v-model="email"
              type="email"
              id="inputEmail"
              class="form-control"
              placeholder="Email"
              required
              autofocus
            />
          </div>
          <div class="form-group">
            <label for="inputPassword" class="sr-only">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="form-control"
              placeholder="Password"
              required
            />
          </div>
          <button
            class="btn btn-lg btn-primary btn-block"
            type="submit"
            @click.prevent.stop="authentication()"
          >Enter</button>
        </form>
      </div>
      <div class="col-sm"></div>
    </div>
  </div>
</template>

<script>
import Authentication from "@/services/Authentication";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      token: ""
    };
  },
  filters: {},
  methods: {
    async authentication() {
      if (this.email != " " && this.password != " ") {
       Authentication.login(this.email, this.password);
        if (localStorage.token) 
        {this.$router.push({ name: "Home" });
        this.$emit('auth-success')}
      }
    }
  }
};
</script>
<style scoped>

</style>
