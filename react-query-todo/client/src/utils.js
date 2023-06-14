import axios from "axios";

const customURL = axios.create({
  baseURL: "http://localhost:5000/api/tasks",
});

export default customURL;
