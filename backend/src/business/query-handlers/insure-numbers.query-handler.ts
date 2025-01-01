import { normalizeStringRule } from "../rules/insure-numbers/normalize-string-rule";
import { InsureNumbersRepository } from "../../data/repositories/insure-numbers.repository";
import { InsureNumberInterface } from "../interfaces/insure-number.interface";

export class InsureNumbersQueryHandler {
  public static async executeGetAllInsureNumbers(): Promise<
    InsureNumberInterface[]
  > {
    return await InsureNumbersRepository.getAll();
  }

  public static async executeGetMatchingInsureNumbers(
    searchString: string,
  ): Promise<InsureNumberInterface[]> {
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
