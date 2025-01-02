import { normalizeStringRule } from "../rules/insure-numbers/normalize-string-rule";
import { InsureNumbersRepository } from "../../data/repositories/insure-numbers.repository";
import { InsureNumberInterface } from "../../data/models/insure-number.interface";

export class InsureNumbersQueryHandler {
  public static async executeGetAllInsureNumbers(): Promise<string[]> {
    const results: InsureNumberInterface[] =
      await InsureNumbersRepository.getAll();
    return results.map((result) => result.insureNumber);
  }

  public static async executeGetMatchingInsureNumbers(
    searchString: string,
  ): Promise<string[]> {
    const searchStringNormalized: string | null =
      normalizeStringRule(searchString);
    if (searchStringNormalized === null) {
      throw new Error("Invalid normalized search string");
    }

    const results: InsureNumberInterface[] =
      await InsureNumbersRepository.findBySearchString(searchStringNormalized);
    return results.map((result) => result.insureNumber);
  }
}
