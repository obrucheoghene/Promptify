export interface PostType {
  prompt: string;
  tag: string;
}

export interface FormProps {
  type: string;
  post: PostType;
  setPost: (post: PostType) => void;
  submitting: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface PromptCardListProps {
  data: Record<string, any>[];
  handleTagClick: (
    event: React.MouseEvent<HTMLParagraphElement>,
    tag: string
  ) => void;
}
