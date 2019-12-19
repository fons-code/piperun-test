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
          <alert
            v-if="error"
            msg="complete all the fields to login"
            type="danger"
          />
          <button
            class="btn btn-lg btn-primary btn-block"
            type="submit"
            @click.prevent.stop="authentication()"
          >
            Enter
          </button>
        </form>
      </div>
      <div class="col-sm"></div>
    </div>
  </div>
</template>

<script>
import Authentication from "@/services/Authentication";
import alert from "@/components/alert";
export default {
  name: "Login",
  components: {
    alert
  },
  data() {
    return {
      email: "",
      password: "",
      token: "",
      error: false
    };
  },
  filters: {},
  methods: {
    async authentication() {
      this.validate();
      if (!this.error) {
        try {
          if (this.email != " " && this.password != " ") {
            Authentication.login(this.email, this.password);
            if (localStorage.token) {
              this.$router.push({ name: "Home" }, () => {});
              this.$emit("auth-success");
            }
          }
        }catch(error){
          console.log(error)
        }
      }
    },
    validate() {
      if (this.email == "" || this.password == "") this.error = true;
      else{
        this.error = false;
      }
    }
  }
};
</script>
<style scoped></style>
