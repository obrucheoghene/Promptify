import { connectToDB } from '@utils/database';
import { Prompt } from '@models/prompt';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const newPrompt = Prompt.create({ creator: userId, prompt, tag });
    return new NextResponse(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'error occured' }, { status: 500 });
  }
};
