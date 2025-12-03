import { Schema, model, Document } from 'mongoose';
import * as v from 'valibot';


export interface IAuthor extends Document {
  name: string;
  family: string;
  gender: 'male' | 'female';
  age: number;
}

const authorSchema = new Schema({
  name: { type: String, required: true },
  family: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  age: { 
    type: Number, 
    required: true,
    min: [18, 'سن نویسنده نمی‌تواند کمتر از 18 باشد'],
    max: [100, 'سن نویسنده نمی‌تواند بیشتر از 100 باشد'],
    validate: {
      validator: Number.isInteger, 
      message: 'سن باید یک عدد صحیح باشد'
    }
  }
}, { timestamps: true });


export default model<IAuthor>('Author', authorSchema);
