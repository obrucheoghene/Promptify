import { connectToDB } from '@utils/database';
import { Prompt } from '@models/prompt';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).sort({ _id: -1 }).populate('creator');
    await connectToDB();

    return new NextResponse(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'error occured' }, { status: 500 });
  }
};
