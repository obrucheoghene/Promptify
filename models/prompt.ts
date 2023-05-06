import { ObjectId } from 'mongodb';
import { Schema, model, models } from 'mongoose';

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
});

export const Prompt = models.Prompt || model('Prompt', PromptSchema);
