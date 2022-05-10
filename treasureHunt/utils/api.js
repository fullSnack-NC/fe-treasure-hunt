import axios from "axios";

const parksApi = axios.create({
  baseURL: "https://fullsnack-treasure-hunt.herokuapp.com/api",
});

export const getParks = () => {
  return parksApi.get("/parks").then(({ data }) => {
    return data;
  });
};

export const getMapsByParkID = (park_id) => {
  return parksApi.get(`/maps/${park_id}`).then(({ data }) => {
    return data.maps;
  });
};
