import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import { useParams } from 'react-router-native';
import Text from './Text';
import RepositoryItem from './RepositoryItem';
import React from 'react';
const SingleRepoView = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const repository = data.repository;

  return (
    <RepositoryItem item={repository} showGithubButton />
  );
};

export default SingleRepoView;
