import {MovieReview} from 'movie-theater-sdk';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type SectionReviewsProps = {
  reviews: MovieReview[];
  loading?: boolean;
};

export default function SectionReviews({
  reviews,
  loading,
}: SectionReviewsProps) {
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        {loading && <ActivityIndicator />}
      </View>
      <FlatList
        horizontal
        data={reviews}
        keyExtractor={item => item.id}
        renderItem={({item}: {item: MovieReview}) => {
          return (
            <View style={styles.review}>
              <Text style={styles.reviewer}>{item.author}</Text>
              <Text style={styles.rating}>
                Rating: {item.author_details.rating}
              </Text>
              <Text style={styles.comment} numberOfLines={3}>
                {item.content}
              </Text>
            </View>
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    marginVertical: 8,
  },
  review: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    margin: 8,
    width: 300,
  },
  reviewer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  rating: {
    color: '#555',
  },
  comment: {
    color: '#555',
  },
});
