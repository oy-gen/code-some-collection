import axios, { AxiosResponse } from "axios";
import { InsureNumber } from "../models/insure-number.model.ts";
import { insureNumbersDummyData } from "../consts/insure-numbers-dummy-data.ts";

// will be made variable
const baseUrl = "http://localhost:5000/";

export const getAllInsureNumbersFromDb = async (): Promise<InsureNumber[]> => {
  try {
    const response: AxiosResponse<InsureNumber[]> = await axios.get(
      baseUrl + "api/insure-numbers/get-all-insure-numbers",
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
): Promise<InsureNumber[]> => {
  try {
    const url: string =
      baseUrl +
      "api/insure-numbers/get-matching-insure-numbers/" +
      encodeURIComponent(searchString);
    console.log({ url });
    const response: AxiosResponse<InsureNumber[]> = await axios.get(url);
    console.log({ response });

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
): Promise<InsureNumber | null> => {
  try {
    const url: string =
      baseUrl +
      "api/insure-numbers/save-new-insure-number/" +
      encodeURIComponent(insureNumber);
    const response: AxiosResponse<InsureNumber> = await axios.post(url);
    return response.data;
  } catch (error) {
    console.error("Error while saving new insure number in DB.", error);
    return null;
  }
};
