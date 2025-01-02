import mongoose, { Schema } from "mongoose";
import { InsureNumberInterface } from "./insure-number.interface";

const insureNumberSchema: Schema = new Schema(
  {
    insureNumber: { type: String, required: true },
    normalizedInsureNumber: { type: String, required: false },
  },
  { collection: "insureNumbers" },
).index({ normalizedInsureNumber: 1 });

export const InsureNumberDbModel = mongoose.model<InsureNumberInterface>(
  "InsureNumber",
  insureNumberSchema,
);
