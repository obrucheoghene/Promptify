import { ObjectId } from 'mongodb';
import { Schema, model, models, now } from 'mongoose';

const PromptSchema = new Schema({
  creator: {
    type: ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
  createdAt: { type: Date, default: now() },
});

export const Prompt = models.Prompt || model('Prompt', PromptSchema);
