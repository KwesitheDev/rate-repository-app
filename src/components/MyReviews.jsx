import React from "react";
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  separator: { height: 10 },
  reviewContainer: {
    backgroundColor: "white",
    padding: 15,
  },
  repositoryName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, loading, error } = useQuery(GET_ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  const navigate = useNavigate();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading reviews.</Text>;

  const reviews = data?.me?.reviews?.edges.map(edge => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigate(`/repository/${item.repository.id}`)}
          style={styles.reviewContainer}
        >
          <Text style={styles.repositoryName}>{item.repository.fullName}</Text>
          <Text>Rating: {item.rating}</Text>
          <Text>{item.text}</Text>
          <Text>{new Date(item.createdAt).toLocaleDateString()}</Text>
        </Pressable>
      )}
    />
  );
};

export default MyReviews;
