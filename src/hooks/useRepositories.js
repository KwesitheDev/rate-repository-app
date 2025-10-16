//import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {GET_REPOSITORIES} from "../graphql/queries";

const useRepositories = (variables) => {
  const { data, loading, refetch, error, fetchMore, ...result} = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });
  console.log('GraphQL data:', data);
  if (error) console.log('GraphQL error:', error);

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const repositories = data ? data.repositories : undefined;
  const reviews = repositories ? repositories.edges.map(edge => edge.node) : [];
  return { repositories, loading, refetch, fetchMore: handleFetchMore, reviews, ...result };
};

export default useRepositories;