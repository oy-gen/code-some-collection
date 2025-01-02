import { InsureNumberDbModel } from "../models/insure-number-db-model";
import { InsureNumber } from "../../business/interfaces/insure.number";

export class InsureNumbersRepository {
  public static async getAll(): Promise<InsureNumber[]> {
    return InsureNumberDbModel.find().lean().select("-_id");
  }

  public static async findBySearchString(
    normalizedString: string,
  ): Promise<InsureNumber[]> {
    return InsureNumberDbModel.find({
      normalizedInsureNumber: { $regex: normalizedString },
    })
      .lean()
      .select("-_id");
  }

  public static async saveNewInsureNumber(
    insureNumberObject: InsureNumber,
  ): Promise<void> {
    const newInsureNumber = new InsureNumberDbModel(insureNumberObject);
    await newInsureNumber.save();
  }

  public static async isExisting(insureNumber: string): Promise<boolean> {
    return !!(await InsureNumberDbModel.exists({
      insureNumber,
    }));
  }
}
