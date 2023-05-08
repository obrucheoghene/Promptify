'use client';
import {
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
  MouseEvent,
  DependencyList,
} from 'react';
import PromptCard from './PromptCard';
import { PromptCardListProps } from '@utils/interface';

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => (
  <div className="mt-16 prompt_layout">
    {data.map((post) => (
      <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        handleDelete={() => {}}
        handleEdit={() => {}}
      />
    ))}
  </div>
);

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(setTimeout(() => {}, 100));
  const [searchedResults, setSearchedResults] = useState([]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    console.log(event.target.value);
    setSearchText(event.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(event.target.value);
        setSearchedResults(searchResult);
      }, 200)
    );
  };

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, 'i'); // 'i' flag for case-insensitive search
    return posts.filter(
      (item: Record<string, any>) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('api/prompt');

      const data = await response.json();
      setPosts(data);
    };
    fetchPost();
  }, []);

  const handleTagClick = (tagName: string) => {
    console.log(tagName);
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };
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

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
