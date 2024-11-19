import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import Chip from '../../../components/Chip';
import {MovieActor} from 'movie-theater-sdk';

type SectionActorsProps = {
  actors: MovieActor[];
};

export default function SectionActors({actors}: SectionActorsProps) {
  return (
    <View style={[styles.keywords]}>
      <FlatList
        ListHeaderComponent={
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.sectionTitle}>Actors</Text>
            <Pressable>
              <Text>View all</Text>
            </Pressable>
          </View>
        }
        data={actors.slice(0, 10)}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={({item}: {item: MovieActor}) => {
          return (
            <Chip
              containerStyle={[styles.chipContainer]}
              label={item.name}
              leftIconUrl={item?.profile_path || ''}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    marginVertical: 8,
  },
  keywords: {
    marginVertical: 10,
  },
  chipContainer: {
    marginBottom: 10,
  },
});
