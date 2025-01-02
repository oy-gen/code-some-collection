import { InsureNumberDbModel } from "../models/insure-number-db-model";
import { InsureNumberInterface } from "../models/insure-number.interface";

export class InsureNumbersRepository {
  public static async getAll(): Promise<InsureNumberInterface[]> {
    return InsureNumberDbModel.find().lean().select("insureNumber -_id");
  }

  public static async findBySearchString(
    normalizedString: string,
  ): Promise<InsureNumberInterface[]> {
    return InsureNumberDbModel.find({
      normalizedInsureNumber: { $regex: normalizedString },
    })
      .lean()
      .select("insureNumber -_id");
  }

  public static async saveNewInsureNumber(
    insureNumberObject: InsureNumberInterface,
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
