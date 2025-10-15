import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import {useNavigate} from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import {useDebounce} from '../hooks/useDebounce';
import { RepoListContainer } from './RepoListContainer';
import { useState } from 'react';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  pickerContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = React.useState('latest');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  


  
  const navigate = useNavigate();

  let orderBy = 'CREATED_AT';
  let orderDirection = 'DESC';

  if (selectedOrder === 'highest') {
    orderBy = 'RATING_AVERAGE';
    orderDirection = 'DESC';
  } else if (selectedOrder === 'lowest') {
    orderBy = 'RATING_AVERAGE';
    orderDirection = 'ASC';
  }

  const { repositories, loading, error, refetch } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchQuery,
  });

  if (error) {
    console.log('GraphQL error:', error);
  }

  console.log('debouncedSearchQuery:', debouncedSearchQuery);
  console.log('repositories:', repositories);
  
  React.useEffect(() => {
  refetch({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchQuery,
  });
}, [debouncedSearchQuery]);

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];


   /* const renderHeader = () => (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedOrder}
        onValueChange={(value) => setSelectedOrder(value)}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );*/


  return (
    <RepoListContainer
      repositories={repositories}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      navigate={navigate}
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
      renderItem={({ item }) => <RepositoryItem item={item} />}  // ✅ fixed prop name
      keyExtractor={(item) => item.id}
      testID="repositoryList"
    />
  );
};

export default RepositoryList;
