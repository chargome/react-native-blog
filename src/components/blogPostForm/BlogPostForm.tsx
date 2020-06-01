import React from 'react';
import {
  View, Text, StyleSheet, TextInput, Button,
} from 'react-native';

const styles = StyleSheet.create({
  root: {
  },
  label: {
    marginLeft: 15,
    marginVertical: 10,
    fontSize: 20,
  },
  input: {
    borderColor: 'grey',
    borderWidth: 2,
    fontSize: 20,
    paddingVertical: 10,
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 4,
  },
});

interface Props {
  onSubmit(title: string, content: string): void;
  initialValues: {
    title: string;
    content: string;
  };
  buttonLabel?: string;
}

const BlogPostForm: React.FC<Props> = ({ onSubmit, initialValues, buttonLabel }) => {
  const [title, setTitle] = React.useState(initialValues.title);
  const [content, setContent] = React.useState(initialValues.content);

  return (
    <View style={styles.root}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Content</Text>
      <TextInput style={styles.input} value={content} onChangeText={setContent} />
      <Button
        title={buttonLabel || 'Save Post'}
        onPress={() => onSubmit(title, content)}
      />
    </View>
  );
};

export default BlogPostForm;
