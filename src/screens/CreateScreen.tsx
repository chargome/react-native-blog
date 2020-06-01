import React from 'react';
import { NavigationContext } from 'react-navigation';
import BlogContext from '../context/BlogContext';
import { INDEX_ROUTE } from '../../constants/Routes';
import BlogPostForm from '../components/blogPostForm/BlogPostForm';


const CreateScreen = () => {
  const { addPost } = React.useContext(BlogContext);
  const navigation = React.useContext(NavigationContext);

  const submitPost = (title: string, content: string) => {
    addPost(title, content);
    navigation.navigate(INDEX_ROUTE);
  };

  return (
    <BlogPostForm
      initialValues={{ title: '', content: '' }}
      onSubmit={submitPost}
      buttonLabel="Add Post"
    />
  );
};

export default CreateScreen;
