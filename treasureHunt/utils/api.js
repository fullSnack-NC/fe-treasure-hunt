import axios from "axios";

const parksApi = axios.create({
  baseURL: "https://be-treasure-hunt.herokuapp.com/api",
});

export const getParks = async () => {
  const { data } = await parksApi.get("/parks");
  return data;
};

export const getMapsByParkID = async (park_id) => {
  const { data } = await parksApi.get(`/maps/${park_id}`);
  return data.maps;
};
