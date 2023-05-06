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
