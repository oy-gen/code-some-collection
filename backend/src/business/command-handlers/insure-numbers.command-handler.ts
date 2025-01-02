import { normalizeStringRule } from "../rules/insure-numbers/normalize-string-rule";
import { InsureNumbersRepository } from "../../data/repositories/insure-numbers.repository";
import { InsureNumber } from "../interfaces/insure.number";

export class InsureNumbersCommandHandler {
  public static async executeSaveNewInsureNumber(
    insureNumber: string,
  ): Promise<InsureNumber> {
    const isExisting: boolean =
      await InsureNumbersRepository.isExisting(insureNumber);
    if (isExisting) {
      throw new Error("Insure number already exists");
    }
    const newInsureNumberObject: InsureNumber = {
      insureNumber: insureNumber,
      normalizedInsureNumber: normalizeStringRule(insureNumber),
    };
    try {
      await InsureNumbersRepository.saveNewInsureNumber(newInsureNumberObject);
    } catch (error) {
      throw new Error(
        "Failed saving new entry" + ((error as Error).message ?? ""),
      );
    }
    return newInsureNumberObject;
  }
}
