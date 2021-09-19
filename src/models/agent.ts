import { Schema, model } from 'mongoose';
import type { TripType } from './trip';

const ObjectId = Schema.Types.ObjectId;

export type AgentType = {
  name: string;
  phone: string;
  avatar: string;
  trips: TripType[];
  dueAmount: number;
};

const agentSchema = new Schema<AgentType>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    avatar: String,
    trips: [{ type: ObjectId, ref: 'trip' }],
    dueAmount: Number,
  },
  { timestamps: true }
);

export default model<AgentType>('agent', agentSchema);
