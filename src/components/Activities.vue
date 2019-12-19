<template>
  <div>
    <h2>Activities</h2>
    <button
      type="button"
      class="btn btn-primary mr-3"
      @click.prevent.stop="createNewActivity()"
    >
      Add
    </button>
    <date-picker
      v-model="range"
      lang="en-us"
      range
      type="date"
      confirm
      format="DD-MM-YYYY"
    ></date-picker>

    <table id="mytable" class="table table-bordred table-striped mt-3">
      <thead>
        <th>Name</th>
        <th>Status</th>
        <th>Date</th>
        <th>Actions</th>
      </thead>
      <tbody>
        <tr v-for="item in filterActivities" v-bind:key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.status }}</td>
          <td>
            <span>{{ item.end_at || datesFilter }}</span>
          </td>
          <td>
            <button
              @click.prevent.stop="updateActivity(item.id)"
              class="btn btn-primary btn-sm m-2"
              data-title="Edit"
              data-target="#edit"
            >
              <router-link
                :to="{ name: 'EditActivities', params: { id: item.id } }"
              >
                <span class="no-link">Edit</span>
              </router-link>
            </button>

            <button
              class="btn btn-primary btn-sm m-2"
              data-title="Edit"
              data-target="#edit"
              @click.prevent.stop="concludeActivity(item.id)"
            >
              <span class="button btn-sm">Finish</span>
            </button>

            <button
              class="btn btn-danger btn-sm m-2"
              data-title="delete"
              data-target="#delete"
            >
              <span
                class="button btn-sm"
                @click.prevent.stop="deleteActivities(item.id)"
                >Delete</span
              >
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ActivitiesService from "../services/ActivitiesService";
import moment from "moment";
import DatePicker from "vue2-datepicker";

export default {
  components: {
    DatePicker
  },
  name: "Activities",
  data() {
    return {
      activitiesList: [],
      date: "",
      range: "",
      lang: {}
    };
  },
  filters: {
    datesFilter(date) {
      return moment(String(date),'YYYY-MM-DD');
    }
  },
  computed:{
    filterActivities(){
      if(this.range == ''){
        return this.activitiesList
      }else{
        return this.activitiesList.filter(a => {
          return new Date(a.created_at).getTime() >= this.range[0].getTime() &&
                 new Date(a.created_at).getTime() <= this.range[1].getTime()   
        })
      }
    }
  },

  methods: {
    createNewActivity() {
      this.$router.push({ name: "CreateActivities" });
    },

    listActivities() {
      ActivitiesService.get(null).then(res => {
        this.activitiesList = res.data.data;
      });
    },


    deleteActivities(activity_id) {
      if(confirm('are you sure you want to delete this activity?'))
      {
        ActivitiesService.delete(activity_id).then(() => {
        this.listActivities();
      });
      }
    },

    updateActivity(activity_id) {
      var activity_edit = this.activitiesList.filter(
        act => act.id == activity_id
      );
      this.minhaProp = activity_edit[0];
    },

    concludeActivity(activity_id) {
      ActivitiesService.updateDateConclusion(
        activity_id,
        this.formatDate(new Date())
      );
      this.listActivities();
    }
  },

  mounted() {
    this.listActivities();
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: white !important;
  margin: 0 12px;
}
</style>
