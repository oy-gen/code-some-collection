import { normalizeStringRule } from "../rules/insure-numbers/normalize-string-rule";
import { InsureNumbersRepository } from "../../data/repositories/insure-numbers.repository";
import { InsureNumberInterface } from "../../data/models/insure-number.interface";

export class InsureNumbersCommandHandler {
  public static async executeSaveNewInsureNumber(
    insureNumber: string,
  ): Promise<string> {
    const isExisting: boolean =
      await InsureNumbersRepository.isExisting(insureNumber);
    if (isExisting) {
      throw new Error("Insure number already exists");
    }
    const newInsureNumberObject: InsureNumberInterface = {
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
    return newInsureNumberObject.insureNumber;
  }
}
