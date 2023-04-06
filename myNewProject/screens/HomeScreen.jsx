import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { selectPosts } from '../redux/posts/postsSelectors';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';
const HomeScreen = ({ navigation }) => {
  const posts = useSelector(selectPosts);
  return (
    <ScrollView style={{ marginHorizontal: 10 }}>
      {posts?.length > 0 &&
        posts.map(({ title, coords, location, photo }) => {
          return (
            <PostCard
              key={coords.timestamp}
              title={title}
              coords={coords}
              location={location}
              photo={photo}
              navigation={navigation}
            />
          );
        })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
