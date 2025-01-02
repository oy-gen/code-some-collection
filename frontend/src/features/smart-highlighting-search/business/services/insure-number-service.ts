import { postNewInsureNumberToDb } from "../../api/services/api-service.ts";
import { InsureNumber } from "../../api/models/insure-number.model.ts";

export const addInsureNumberToDb = async (
  newInsureNumber: string,
): Promise<InsureNumber | null> => {
  if (!newInsureNumber) {
    return null;
  }

  return await postNewInsureNumberToDb(newInsureNumber);
};
