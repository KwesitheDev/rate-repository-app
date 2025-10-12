import { FlatList, View, StyleSheet } from 'react-native';
import React from 'react';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {

  const {repositories} = useRepositories();



  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};


/**
 * A component that renders a FlatList of RepositoryItems.
 * The list data is expected to be passed as a prop called 'repositories'.
 * The data should be in the format of an array of repository node objects.
 * Each repository node object should have an 'id' property.
 * The component also assigns a testID of 'repositoryList' to the rendered FlatList.
 */

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      keyExtractor={item => item.id}
      testID="repositoryList"
    />
  );
};

export default RepositoryList;