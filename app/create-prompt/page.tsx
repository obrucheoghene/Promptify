'use client';

import Form from '@components/Form';
import { PostType } from '@utils/interface';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<PostType>({
    prompt: '',
    tag: '',
  });

  const createPrompt = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    console.log(session);
    try {
      const response = await fetch('api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id,
          tag: post.tag,
        }),
      });
      setSubmitting(false);

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
