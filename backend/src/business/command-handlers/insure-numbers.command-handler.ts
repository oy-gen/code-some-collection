import { normalizeStringRule } from "../rules/insure-numbers/normalize-string-rule";
import { InsureNumbersRepository } from "../../data/repositories/insure-numbers.repository";

export class InsureNumbersCommandHandler {
  public static async executeSaveNewInsureNumber(
    insureNumber: string,
  ): Promise<void> {
    const isExisting: boolean =
      await InsureNumbersRepository.isExisting(insureNumber);
    if (isExisting) {
      throw new Error("Insure number already exists");
    }

    await InsureNumbersRepository.create(
      insureNumber,
      normalizeStringRule(insureNumber),
    );
  }
}
