import { FlatList, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [repositories,setRepositories] = useState();

  const fetchRepositories =  async() => {
  const res = await fetch('http://192.168.167.201:5000/api/repositories');
  const json = await res.json();
  console.log(json);

  setRepositories(json);
}
  useEffect(() => {
    fetchRepositories();
  }, []);

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

export default RepositoryList;