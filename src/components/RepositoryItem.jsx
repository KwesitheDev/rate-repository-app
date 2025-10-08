/* eslint-disable react/prop-types */
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import theme from '../../theme'
import RepositoryStat from './RepositoryStat';


 export const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: theme.colors.white,
  },
  row: {
    flexDirection: 'row',
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: theme.fontWeights.bold,
    fontSize: 16,
  },
  description: {
    color: theme.colors.textSecondary,
    marginVertical: 5,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 15,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.info}>
          <Text fontWeight="bold" >{item.fullName}</Text>
          <Text >{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <RepositoryStat label="Stars" value={item.stargazersCount} />
        <RepositoryStat label="Forks" value={item.forksCount} />
        <RepositoryStat label="Reviews" value={item.reviewCount} />
        <RepositoryStat label="Rating" value={item.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;
