import axios from "../config/axios";

export default {
  get: params => {
    return params
      ? axios.get("activities", { params })
      : axios.get("activities");
  },

  create: async activity => {
    activity.account_id = localStorage.getItem("account_id");
    return axios.post("activities", activity).then();
  },

  delete: async activity_id => {
    return axios.delete("activities/" + activity_id).then();
  },

  updateDateConclusion: async (activity_id, end_at) => {
    return await axios
      .put("activities/" + activity_id, { end_at: end_at, status: 2 })
      .then();
  },

  updateActivity: async (activity_id, activity) => {
    activity.account_id = localStorage.getItem("account_id");
    return axios.put("activities/" + activity_id, activity);
  },

  findById: activity_id => {
    return axios.get("activities/" + activity_id);
  }
};
