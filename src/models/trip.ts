import { Schema, model } from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

export type TripType = {
  start: number;
  end: number;
  image: string;
  amount: number;
  amountPending: boolean;
};

const tripSchema = new Schema<TripType>(
  {
    start: { type: Number, required: true },
    end: { type: Number, required: true },
    amount: { type: Number, required: true },
    image: { type: String, required: true },
    amountPending: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model('trip', tripSchema);
