import { postNewInsureNumberToDb } from "../../api/services/api-service.ts";

export const addInsureNumberToDb = async (
  newInsureNumber: string,
): Promise<string | null> => {
  if (!newInsureNumber) {
    return null;
  }

  return await postNewInsureNumberToDb(newInsureNumber);
};
