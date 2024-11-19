import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import Chip from '../../../components/Chip';
import {MovieActor} from 'movie-theater-sdk';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/types';

type SectionActorsProps = {
  actors: MovieActor[];
  showFull?: boolean;
};

export default function SectionActors({actors, showFull}: SectionActorsProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const viewData = showFull ? actors : actors.slice(0, 10);

  return (
    <View style={[styles.keywords]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.sectionTitle}>Actors</Text>
        {!showFull && (
          <Pressable
            onPress={() =>
              navigation.navigate('MovieDetailAllActors', {actors: actors})
            }>
            <Text>View all</Text>
          </Pressable>
        )}
      </View>

      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {viewData.map(actor => (
          <Chip
            key={actor.id}
            containerStyle={[styles.chipContainer]}
            label={actor.name}
            leftIconUrl={actor?.profile_path || ''}
          />
        ))}
      </View>
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
