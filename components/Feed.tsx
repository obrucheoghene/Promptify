'use client';
import { useState, useEffect, ChangeEvent, useCallback } from 'react';
import PromptCard from './PromptCard';
import { PromptCardListProps } from '@utils/interface';

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => (
  <div className="mt-16 prompt_layout">
    {data.map((post) => (
      <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
    ))}
  </div>
);

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {},

    []
  );

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('api/prompt');

      const data = await response.json();
      setPosts(data);
    };
    fetchPost();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
