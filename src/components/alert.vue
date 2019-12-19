<template>
  <div class="alert" :class="this.alertType" role="alert">{{this.msg}}</div>
</template>

<script>
export default {
  props:{msg:String,type:String},
  data(){
      return{
          alertType: 'alert-'+this.type,
      }
  }
};
</script>

<style>
</style>