import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import { useParams } from 'react-router-native';
import Text from './Text';
import RepositoryItem from './RepositoryItem';
import React from 'react';
import { FlatList } from 'react-native-web';
const SingleRepoView = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const repository = data?.repository;
  const reviews = repository?.reviews.edges.map(edge => edge.node) || [];

  return (
     <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} showGithubButton />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepoView;
