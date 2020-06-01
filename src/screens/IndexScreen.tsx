import React from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NavigationContext } from 'react-navigation';
import {
  // eslint-disable-next-line no-unused-vars
  NavigationStackScreenComponent,
  // eslint-disable-next-line no-unused-vars
  NavigationStackScreenProps,
} from 'react-navigation-stack';

import BlogContext from '../context/BlogContext';
import * as routes from '../constants/Routes';

const styles = StyleSheet.create({
  blogListItem: {
    paddingVertical: 15,
    borderColor: 'papayawhip',
    borderBottomWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  blogTitle: {
    fontSize: 20,
    paddingLeft: 15,
  },
  trashIcon: {
    fontSize: 20,
    paddingRight: 15,
  },
  addIcon: {
    fontSize: 30,
    paddingRight: 15,
  },
});

interface Props extends NavigationStackScreenProps {}

const IndexScreen: NavigationStackScreenComponent<Props> = () => {
  const blogData = React.useContext(BlogContext);
  const nav = React.useContext(NavigationContext);

  React.useEffect(() => {
    blogData.getPosts();

    const listener = nav.addListener('didFocus', () => {
      blogData.getPosts();
    });

    const cleanup = () => {
      listener.remove();
    };

    return cleanup;
  }, []);

  return (
    <View>
      <FlatList
        data={blogData.posts}
        keyExtractor={(post) => post.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => nav.navigate(routes.SHOW_ROUTE, { id: item.id })}>
            <View style={styles.blogListItem}>
              <Text style={styles.blogTitle}>{item.title}</Text>
              <Text style={styles.blogTitle}>{item.id}</Text>
              <TouchableOpacity onPress={() => blogData.deletePost(item.id)}>
                <Feather style={styles.trashIcon} name="trash" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => ({
  headerRight:
  <TouchableOpacity onPress={() => navigation.navigate(routes.CREATE_ROUTE)}>
    <Feather name="plus" style={styles.addIcon} />
  </TouchableOpacity>,
});

export default IndexScreen;
