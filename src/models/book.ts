import { Schema, model, Document, Types } from 'mongoose';

export interface IBook extends Document {
  title: string;
  image?: string;
  publisher: string;
  author: Types.ObjectId;
}

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      default: ''
    },
    publisher: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: true
    }
  },
  { timestamps: true }
);

export default model<IBook>('Book', bookSchema);
