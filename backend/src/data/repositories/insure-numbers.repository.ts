import { InsureNumberDbModel } from "../models/insure-number-db-model";
import { InsureNumberInterface } from "../../business/interfaces/insure-number.interface";

export class InsureNumbersRepository {
  public static async getAll(): Promise<InsureNumberInterface[]> {
    return InsureNumberDbModel.find().lean().select("-_id");
  }

  public static async findBySearchString(
    normalizedString: string,
  ): Promise<InsureNumberInterface[]> {
    return InsureNumberDbModel.find({
      normalizedInsureNumber: { $regex: normalizedString },
    })
      .lean()
      .select("-_id");
  }

  public static async create(
    insureNumber: string,
    normalizedInsureNumber: string | null,
  ): Promise<void> {
    const newInsureNumber = new InsureNumberDbModel({
      insureNumber,
      normalizedInsureNumber,
    });
    await newInsureNumber.save();
  }

  public static async isExisting(insureNumber: string): Promise<boolean> {
    return !!(await InsureNumberDbModel.exists({
      insureNumber,
    }));
  }
}
