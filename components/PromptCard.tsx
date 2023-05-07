import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { PostType } from '@utils/interface';
import Image from 'next/image';

interface PromptCardProps {
  post: Record<string, any>;
  handleTagClick?: (
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    tag: string
  ) => void;
  handleEdit: () => void;
  handleDelete: () => void;
}
const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: PromptCardProps) => {
  const [copied, setCopied] = useState('');
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(''), 3000);
  };
  return (
    <div className=" prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div>
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
          />
          <div className=" flex flex-col">
            <h3 className="font-santoshi font-semibold text-gray-900 ">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            width={12}
            height={12}
            alt="Copy"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={(event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) =>
          handleTagClick && handleTagClick(event, post.tag)
        }
      >
        {post.tag}
      </p>
    </div>
  );
};

export default PromptCard;
