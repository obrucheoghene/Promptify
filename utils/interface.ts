export interface PostType {
  prompt: string;
  tag: string;
}

export interface FormProps {
  type: string;
  post: PostType;
  setPost: () => void;
  submitting: boolean;
  handleSubmit: () => void;
}
