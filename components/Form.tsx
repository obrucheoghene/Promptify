import { POST_MESSAGE } from '@utils/constant';
import { FormProps, PostType } from '@utils/interface';
import Link from 'next/link';
import React from 'react';

const Form: React.FC<FormProps> = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}) => {
  return (
    <section className=" w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className=" blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">{POST_MESSAGE}</p>
      <form
        onSubmit={handleSubmit}
        className=" mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className=" font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              setPost({ ...post, prompt: event.target.value })
            }
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className=" font-satoshi font-semibold text-base text-gray-700">
            Tag
            <span className=" font-normal"> (#product, #web #idea)</span>
          </span>
          <input
            value={post.tag}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPost({ ...post, tag: event.target.value })
            }
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white disabled:bg-opacity-70"
          >
            {type === 'Create' ? 'Create' : 'Update'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
