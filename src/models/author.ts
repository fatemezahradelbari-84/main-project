import { Schema, model, Document } from 'mongoose';

export interface IAuthor extends Document {
  name: string;
  family: string;
  gender: 'male' | 'female';
  age: number;
  fullName: string;
}

const authorSchema = new Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  family: { 
    type: String, 
    required: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 1
  }
}, {
  timestamps: true
});

// Virtual برای نام کامل
authorSchema.virtual('fullName').get(function() {
  return `${this.name} ${this.family}`;
});

export default model<IAuthor>('Author', authorSchema);