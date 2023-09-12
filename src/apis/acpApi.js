import Api from ".";
import { DEVURL } from "./envUrl";

export const getAcpBookingData = async (
  headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  }
) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  // let apiURL = `${DEVURL}/FetchACPBooking/Baby Care/Europe Enterprise`;
  let apiURL =
    "https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v1/FetchACPBooking/Baby Care/Europe Enterprise";
  const response = await axiosInstance({
    url: apiURL,
    method: "GET",
  });
  let AcpBookingResponse = response?.data?.ArtworkAgilityProjects;
  console.log("response acp booking ----->", response, AcpBookingResponse);

  return AcpBookingResponse;
};
