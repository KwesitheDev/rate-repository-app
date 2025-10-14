import React from 'react';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { FlatList, View, Text } from 'react-native';

import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const SingleRepoView = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const repository = data.repository;
  const reviews = repository.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem repository={repository} showGithubButton />
      )}
    />
  );
};

export default SingleRepoView;
