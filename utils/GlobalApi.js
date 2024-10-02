import axios from "axios";
const apiKey = import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});

const createNewResume = (data) => axiosClient.post("/user-resumes", data);
const getUserResumes = (userEmail) =>
  axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${userEmail}`);

const updateResumeDetail = (id, data) =>
  axiosClient.put(`/user-resumes/${id}`, data);

const getResumeById = (id) =>
  axiosClient.get(`/user-resumes/` + id + "?populate=*");

const deleteResumeById = (id) => axiosClient.delete(`/user-resumes/` + id);

export {
  createNewResume,
  getUserResumes,
  updateResumeDetail,
  getResumeById,
  deleteResumeById,
};
