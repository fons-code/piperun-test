<template>
  <div class="createActivities">
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <form v-on:submit="createActivity">
          <h4 v-if="!$route.params.id" class="text-center mb-3">Create</h4>
          <h4 v-else class="text-center mb-3">Edit</h4>

          <div class="form-group">
            <label>Title</label>
            <input type="text" v-model="activity.title" class="form-control" />
          </div>
          <alert
            v-if="errorHandler.titleError"
            msg="you only can use alphanumeric on title field"
            type="danger"
          />
          <div class="form-group">
            <label>Owner</label>
            <input
              type="text"
              v-model="activity.owner_id"
              class="form-control"
            />
          </div>
          <alert
            v-if="errorHandler.ownerError"
            msg="you only can use numbers on type owner"
            type="danger"
          />
          <div class="form-group">
            <label>Type</label>
            <input
              type="number"
              v-model="activity.activity_type"
              class="form-control"
            />
          </div>
          <alert
            v-if="errorHandler.typeError"
            msg="you only can use numbers on type field"
            type="danger"
          />
          <div class="form-group">
            <label>Status</label>
            <input
              type="number"
              v-model="activity.status"
              class="form-control"
            />
          </div>
          <alert
            v-if="errorHandler.statusError"
            msg="you only can use numbers on status field"
            type="danger"
          />
          <alert
            v-if="errorHandler.emptySpaces"
            msg="You need to complete all the fields"
            type="danger"
          />
          <alert
            v-if="errorHandler.requestError"
            msg="there's a problem, please make sure your info its correct"
            type="danger"
          />
          <div class="form-group">
            <div class="btn-group float-right">
              <button class="btn btn-secundary mr-3" type="button">
                <router-link to="/home">Back</router-link>
              </button>
              <button class="btn btn-primary float-right" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      <div class="col-4"></div>
    </div>
  </div>
</template>

<script>
//import validation from '@/services/validationForm';
import ActivitiesService from "../services/ActivitiesService";
import alert from "@/components/alert";
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
        account_id: 0,
        activity_type: "",
        // parameters required for API:
        priority: 0
      },
      errorHandler: {
        emptySpaces: false,
        titleError: false,
        ownerError: false,
        typeError: false,
        statusError: false,
        requestError: false
      }
    };
  },
  components: {
    alert
  },
  filters: {},
  methods: {
    createActivity() {
      this.validateForm();
      if (
        !this.errorHandler.emptySpaces &&
        !this.errorHandler.titleError &&
        !this.errorHandler.ownerError &&
        !this.errorHandler.typeError &&
        !this.errorHandler.statusError
      ) {
        try {
          if (!this.$route.params.id) {
            ActivitiesService.create(this.activity)
              .then(() => {
                alert('new activity created')
                this.$router.push({ name: "/home" });
              })
              .catch(() => this.errorHandler.requestError = true);
          } else {
            ActivitiesService.updateActivity(
              this.$route.params.id,
              this.activity
            ).then(() => {
              alert('activity updated')
              this.$router.push({ name: "/home" });
            }).catch(() => this.errorHandler.requestError = true);
          }
        } catch (error) {
          this.errorHandler.requestError = true;
          console.log(error);
        }
      }
    },
    validateForm() {
      if (
        this.activity.title == "" ||
        this.activity.owner_id == "" ||
        this.activity.status == "" ||
        this.activity.type == ""
      ) {
        this.errorHandler.emptySpaces = true;
      }
      const alphaNumeric = new RegExp(/[^A-Za-z0-9]/);
      const numeric = new RegExp(/^[0-9]/);
      if (alphaNumeric.test(this.activity.title)) {
        this.errorHandler.titleError = true;
      }
      if (!numeric.test(this.activity.status)) {
        this.errorHandler.statusError = true;
      }

      if (!numeric.test(this.activity.owner_id)) {
        this.errorHandler.ownerError = true;
      }

      if (!numeric.test(this.activity.type)) {
        this.errorHandler.typeError = true;
      }

      // this.errorHandler.emptySpaces = (validation.isEmpty(this.title) ||
      //                 validation.isEmpty(this.owner_id) ||
      //                 validation.isEmpty(this.status) ||
      //                 validation.isEmpty(this.type))
      //                 ? true : false
      // this.errorHandler.titleError = (validation.isAlphaNum(this.title)) ? true : false
      // this.errorHandler.ownerError = (validation.isOnlyNum(this.owner_id)) ? true : false
      // this.errorHandler.typeError = (validation.isOnlyNum(this.type)) ? true : false
      // this.errorHandler.statusError = (validation.isOnlyNum(this.status)) ? true : false
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

<style scoped></style>
