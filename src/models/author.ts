import { Schema, model, Document } from "mongoose";
import { z } from "zod";

export interface IAuthor extends Document {
  name: string;
  gender: "male" | "female" | "other";
  age: number;
}

export const authorValidationSchema = z.object({
  name: z.string().min(2, "نام باید حداقل 2 کاراکتر باشد"),
  gender: z.enum(["male", "female", "other"], "جنسیت باید male، female یا other باشد"),
  age: z
    .number()
    .int("سن باید عدد صحیح باشد")
    .min(18, "سن باید حداقل 18 باشد")
    .max(80, "سن باید حداکثر 80 باشد"),
});

const authorSchema = new Schema<IAuthor>(
  {
    name: { type: String, required: [true, "نام الزامی است"], trim: true },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "جنسیت الزامی است"],
    },
    age: { type: Number, required: [true, "سن الزامی است"], min: 18, max: 80 },
  },
  { timestamps: true }
);

// 4️⃣ ساخت مدل Mongoose
export default model<IAuthor>("Author", authorSchema);
