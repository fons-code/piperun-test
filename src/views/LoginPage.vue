<template>
  <div class="row">
    <div class="col-md-4 m-3">
      <h1 class="text-center m-5">Piperun</h1>
      <form>
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            name="user-email"
            id="user-email"
            placeholder="Email"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            name="user-pass"
            id="user-pass"
            placeholder="Password"
          />
          <small class="form-text float-right">Forgot password?</small>
        </div>

        <input type="button" class="btn btn-primary btn-block" value="Enter" />
        <input type="button" class="btn btn-block" value="Sing up" />
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
