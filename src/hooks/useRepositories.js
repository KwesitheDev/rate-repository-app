//import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {GET_REPOSITORIES} from "../graphql/queries";

const useRepositories = () => {
  const { data, loading, refetch, error, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });
  console.log('GraphQL data:', data);
  if (error) console.log('GraphQL error:', error);

  const repositories = data ? data.repositories : undefined;
  const reviews = repositories ? repositories.edges.map(edge => edge.node) : [];
  return { repositories, loading, refetch, fetchMore, reviews };
};

export default useRepositories;