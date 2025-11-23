import { Schema, model, Document } from 'mongoose';

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
  age: { type: Number, required: true }
}, {
  timestamps: true
});

export default model<IAuthor>('Author', authorSchema);