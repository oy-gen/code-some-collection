import axios, { AxiosResponse } from "axios";
import { insureNumbersDummyData } from "../consts/insure-numbers-dummy-data.ts";

const apiUrl = import.meta.env.VITE_API_URL;

export const getAllInsureNumbersFromDb = async (): Promise<string[]> => {
  try {
    const response: AxiosResponse<string[]> = await axios.get(
      apiUrl + "/insure-numbers/get-all-insure-numbers",
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error while fetching all insure numbers. Hardcoded response is returned instead.",
      error,
    );
    return insureNumbersDummyData;
  }
};

export const getMatchingInsureNumbersFromDb = async (
  searchString: string,
): Promise<string[]> => {
  try {
    const url: string =
      apiUrl +
      "/insure-numbers/get-matching-insure-numbers/" +
      encodeURIComponent(searchString);
    const response: AxiosResponse<string[]> = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(
      "Error while fetching matching insure numbers. Empty array is returned instead.",
      error,
    );
    return [];
  }
};

export const postNewInsureNumberToDb = async (
  insureNumber: string,
): Promise<string | null> => {
  try {
    const url: string =
      apiUrl +
      "/insure-numbers/save-new-insure-number/" +
      encodeURIComponent(insureNumber);
    const response: AxiosResponse<string> = await axios.post(url);
    return response.data;
  } catch (error) {
    console.error("Error while saving new insure number in DB.", error);
    return null;
  }
};
