import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@screens/HomeScreen';
import MovieDetailScreen from '@screens/MovieDetail';
import MovieDetailAllActorsScreen from '@screens/MovieDetailAllActors';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Movies',
          }}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetailScreen}
          options={{
            title: 'Movie Detail',
          }}
        />
        <Stack.Screen
          name="MovieDetailAllActors"
          component={MovieDetailAllActorsScreen}
          options={{
            title: 'Movie Detail: All Actors',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
