import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { NavigationContext } from 'react-navigation';
import {
  // eslint-disable-next-line no-unused-vars
  NavigationStackScreenComponent,
  // eslint-disable-next-line no-unused-vars
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { EvilIcons } from '@expo/vector-icons';

import BlogContext from '../context/BlogContext';
import { EDIT_ROUTE } from '../constants/Routes';

const styles = StyleSheet.create({
  editIcon: {
    fontSize: 30,
  },
});

interface Props extends NavigationStackScreenProps {}

const ShowScreen: NavigationStackScreenComponent<Props> = () => {
  const navigation = React.useContext(NavigationContext);
  const { posts } = React.useContext(BlogContext);
  const navId = navigation.getParam('id');
  const blogPost = posts.find((post) => post.id === navId);

  return (
    <View>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => ({
  headerRight:
  <TouchableOpacity
    onPress={() => {
      navigation.navigate(EDIT_ROUTE, { id: navigation.getParam('id') });
    }}
  >
    <EvilIcons name="pencil" style={styles.editIcon} />
  </TouchableOpacity>,
});


export default ShowScreen;
