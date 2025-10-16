import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import { useParams } from 'react-router-native';
import Text from './Text';
import RepositoryItem from './RepositoryItem';
import React from 'react';
import { FlatList } from 'react-native';
import ReviewItem from './ReviewItem';
import { View, StyleSheet } from 'react-native';

//Item Separator
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepoView = () => {
  const { id } = useParams();
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  const onEndReach = () => {
    const canFetchMore = !loading && repository?.reviews?.pageInfo?.hasNextPage;
    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: repository.reviews.pageInfo.endCursor,
        first: 3,
        id,
      },
    });
  };

  const repository = data?.repository;
  const reviews = repository?.reviews
    ? repository.reviews.edges.map(edge => edge.node)
    : [];
  return (
     <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} showGithubButton />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepoView;
