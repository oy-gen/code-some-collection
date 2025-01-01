import mongoose, { Schema } from "mongoose";

const insureNumberSchema: Schema = new Schema(
  {
    insureNumber: { type: String, required: true },
    normalizedInsureNumber: { type: String, required: false },
  },
  { collection: "insureNumbers" },
).index({ normalizedInsureNumber: 1 });

export const InsureNumberDbModel = mongoose.model(
  "InsureNumber",
  insureNumberSchema,
);
