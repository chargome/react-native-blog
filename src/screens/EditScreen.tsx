import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContext } from 'react-navigation';
import BlogContext from '../context/BlogContext';
import BlogPostForm from '../components/blogPostForm/BlogPostForm';
import { INDEX_ROUTE } from '../../constants/Routes';


const EditScreen = () => {
  const nav = React.useContext(NavigationContext);
  const { posts, editPost } = React.useContext(BlogContext);
  const id = nav.getParam('id');
  const blogPost = posts.find((post) => post.id === id);

  const submitForm = (title: string, content: string) => {
    editPost(id, title, content);
    nav.navigate(INDEX_ROUTE);
  };

  return (
    <View>
      <Text>Edit</Text>
      <BlogPostForm
        initialValues={{ title: blogPost.title, content: blogPost.content }}
        onSubmit={submitForm}
        buttonLabel="Update"
      />
    </View>
  );
};

export default EditScreen;
