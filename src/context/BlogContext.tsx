import React from 'react';
import jsonServer from '../api/jsonServer';

interface BlogPost {
  id: string;
  title: string;
  content: string;
}

type Action =
| {
  type: 'DELETE_POST',
  payload: string,
}
| {
  type: 'GET_POSTS',
  payload: any[],
}

interface BlogContextProps {
  posts: BlogPost[];
  addPost: Function;
  deletePost: Function;
  editPost: Function;
  getPosts: Function;
}

interface BlogProviderProps {
  children?: React.ReactNode | React.ReactNode[];
}

const BlogContext = React.createContext<BlogContextProps>({
  posts: [],
  addPost: () => null,
  deletePost: () => null,
  editPost: () => null,
  getPosts: () => null,
});

const blogReducer = (state: BlogPost[], action: Action) => {
  switch (action.type) {
    case 'DELETE_POST':
      return state.filter((post) => post.id !== action.payload);
    case 'GET_POSTS':
      return action.payload;
    default:
      return state;
  }
};

export const BlogProvider:React.FC<BlogProviderProps> = ({ children }) => {
  const [blogPosts, dispatch] = React.useReducer(blogReducer, []);

  const getBlogPosts = async () => {
    const res = await jsonServer.get('/blogposts');
    dispatch({ type: 'GET_POSTS', payload: res.data });
  };

  const addBlogPost = async (title: string, content: string) => {
    await jsonServer.post('/blogposts', { title, content });
  };

  const deleteBlogPost = async (id: string) => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: 'DELETE_POST', payload: id });
  };

  const editBlogPost = async (id: string, title: string, content: string) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });
  };

  return (
    <BlogContext.Provider
      value={{
        posts: blogPosts,
        addPost: addBlogPost,
        deletePost: deleteBlogPost,
        editPost: editBlogPost,
        getPosts: getBlogPosts,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
