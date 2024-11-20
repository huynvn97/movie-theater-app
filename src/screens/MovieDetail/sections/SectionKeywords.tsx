import React from 'react';
import {MovieKeyword} from 'movie-theater-sdk';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Chip from '@components/Chip';

type SectionKeywordsProps = {
  keywords: MovieKeyword[];
  loading?: boolean;
};
export default function SectionKeywords(props: SectionKeywordsProps) {
  const {keywords} = props;

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Keywords</Text>
        {props.loading && <ActivityIndicator />}
      </View>
      <View style={[styles.keywords]}>
        {keywords?.map?.(keyword => (
          <Chip
            containerStyle={[styles.chipContainer]}
            key={keyword.id}
            label={keyword.name}
          />
        ))}
      </View>
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
  keywords: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipContainer: {
    marginBottom: 10,
  },
  header: {flexDirection: 'row'},
});
