<template>
  <div class="createActivities">
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <form v-on:submit="validateForm">
          <h4 v-if="!$route.params.id" class="text-center mb-3">Create</h4>
          <h4 v-else class="text-center mb-3">Edit</h4>

          <div class="form-group">
            <label>Title</label>
            <input type="text" v-model="activity.title" class="form-control" />
          </div>
          <alert v-if="error" msg='you can only use numbers and letters' type='danger'/>
          <div class="form-group">
            <label>Owner</label>
            <input type="text" v-model="activity.owner_id" class="form-control" />
          </div>
          <div class="form-group">
            <label>Type</label>
            <input type="number" v-model="activity.activity_type" class="form-control" />
          </div>
          <div class="form-group">
            <label>Status</label>
            <input type="number" v-model="activity.status" class="form-control" />
          </div>
          <div class="form-group">
            <div class="btn-group float-right">
              <button class="btn btn-secundary mr-3" type="button">
                <router-link to="/home">Back</router-link>
              </button>
              <button class="btn btn-primary float-right" type="submit">Create</button>
            </div>
          </div>
        </form>
      </div>

      <div class="col-4"></div>
    </div>
  </div>
</template>

<script>
import ActivitiesService from "../services/ActivitiesService";
import alert from '@/components/alert';
export default {
  props: {
    id: {
      type: String
    }
  },
  name: "CreateActivities",
  data() {
    return {
      activity: {
        type: "1",
        title: "",
        status: "",
        owner_id: "",
        account_id: "",
        activity_type: ""
      },
      error:false
    };
  },
  components:{
    alert
  },
  computed:{
    isEmpty : function (){
      const input = this.activity
      if(input.title && input.status && input.owner_id && input.activity_type)
      return true;
      else{
        return false;
      }
    }
  },
  filters: {},
  methods: {
    createActivity() {
      if (!this.$route.params.id) {
          ActivitiesService.create(this.activity).then(() => {
          this.$router.push({ name: "/home" });
        })
        
      } else {
        ActivitiesService.updateActivity(
          this.$route.params.id,
          this.activity
        ).then(() => {
          this.$router.push({ name: "/home" });
        });
      }
    },
    validateForm(){
      const alphaNumeric = new RegExp('/[^A-Za-z0-9]/') 
      let titleResult = alphaNumeric.test(this.activity.title)
      if(titleResult && !this.isEmpty)
      this.createActivity();
      else{
        this.error = true;
      }
    }
  },
  mounted() {
    if (this.$route.params.id) {
      ActivitiesService.findById(this.$route.params.id).then(res => {
        var item = res.data.data;
        this.activity.title = item.title;
        this.account_id = item.account_id;
        this.activity.status = item.status;
        this.activity.owner_id = item.owner_id;
        this.activity.activity_type = item.activity_type;
      });
    }
  }
};
</script>

<style scoped>
</style>