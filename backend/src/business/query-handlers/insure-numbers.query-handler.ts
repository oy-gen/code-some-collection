import { normalizeStringRule } from "../rules/insure-numbers/normalize-string-rule";
import { InsureNumbersRepository } from "../../data/repositories/insure-numbers.repository";
import { InsureNumber } from "../interfaces/insure.number";

export class InsureNumbersQueryHandler {
  public static async executeGetAllInsureNumbers(): Promise<InsureNumber[]> {
    return await InsureNumbersRepository.getAll();
  }

  public static async executeGetMatchingInsureNumbers(
    searchString: string,
  ): Promise<InsureNumber[]> {
    const searchStringNormalized: string | null =
      normalizeStringRule(searchString);
    if (searchStringNormalized === null) {
      throw new Error("Invalid normalized search string");
    }

    return await InsureNumbersRepository.findBySearchString(
      searchStringNormalized,
    );
  }
}
