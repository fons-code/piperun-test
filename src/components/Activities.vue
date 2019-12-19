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
        <tr v-for="item in filterByPage" v-bind:key="item.id">
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
    <div v-if="pagesNumber > 1">
      <p>Current page: {{ currentPage }}</p>
      <v-pagination
        v-model="currentPage"
        :page-count="pagesNumber"
      ></v-pagination>
    </div>
    <div v-if="filterActivities.length == 0 && isLoaded">
      You dont have activities
    </div>
  </div>
</template>

<script>
import ActivitiesService from "../services/ActivitiesService";
import moment from "moment";
import DatePicker from "vue2-datepicker";
import vPagination from "vue-plain-pagination";

export default {
  components: {
    DatePicker,
    vPagination
  },
  name: "Activities",
  data() {
    return {
      activitiesList: [],
      date: "",
      range: "",
      lang: {},
      datesFilter: "",
      currentPage: 1,
      isLoaded: false
    };
  },
  filters: {
    datesFilter(date) {
      return moment(String(date), "YYYY-MM-DD");
    }
  },
  computed: {
    filterActivities() {
      if (this.range == "") {
        return this.activitiesList;
      } else {
        return this.activitiesList.filter(a => {
          return (
            new Date(a.created_at).getTime() >= this.range[0].getTime() &&
            new Date(a.created_at).getTime() <= this.range[1].getTime()
          );
        });
      }
    },
    filterByPage() {
      if (this.activitiesList.length >=20) {
        if (this.currentPage > 1) {
          return this.filterActivities.slice(
            10 * this.currentPage,
            (19 + 10*this.currentPage)
              ? 20 * this.currentPage
              : this.filterActivities.length - 1
          );
        } else {
          return this.filterActivities.slice(0, 19);
        }
      } else return this.filterActivities;
    },
    pagesNumber() {
      return Math.ceil(this.activitiesList.length / 20);
    }
  },

  methods: {
    createNewActivity() {
      this.$router.push({ name: "CreateActivities" });
    },

    listActivities() {
      ActivitiesService.get(null).then(res => {
        this.activitiesList = res.data.data;
        this.isLoaded = true;
      });
    },

    deleteActivities(activity_id) {
      if (confirm("are you sure you want to delete this activity?")) {
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
      alert("Activity concluded");
    },
    formatDate: function(value) {
      if (value) {
        return moment(String(value), "YYYY-MM-DDTHH:mm:ss-03:00");
      }
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
