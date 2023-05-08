import { connectToDB } from '@utils/database';
import { Prompt } from '@models/prompt';
import { NextResponse } from 'next/server';

export const GET = async (
  req: Request,
  { params }: { params: Record<string, any> }
) => {
  try {
    await connectToDB();
    console.log('params', params);
    const prompts = await Prompt.find({ creator: params.id }).populate(
      'creator'
    );
    await connectToDB();

    return new NextResponse(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'error occured' }, { status: 500 });
  }
};
