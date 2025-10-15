import React from "react";
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import { useNavigate } from "react-router-native";
import ReviewActions from "./ReviewActions";
import ReviewItem from "./ReviewItem";

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
  const { data, loading, error, refetch } = useQuery(GET_ME, {
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
      renderItem={({ item }) => (
        <View>
          <ReviewItem review={item} />
          <ReviewActions review={item} refetchReviews={refetch} />
        </View>
      )}
    />
  );
};

export default MyReviews;
