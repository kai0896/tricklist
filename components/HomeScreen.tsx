import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import TrickList from './TrickList'
import BottomBar from './BottomBar'
import { useState } from '@hookstate/core'
import store from '../store'
import {theme} from '../theme'

type Props = {
  navigation: NavigationProp < ParamListBase>
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { tricks } = useState(store)
  const myTricks = tricks.get()
                         .filter(trick => trick.landedCount > 0)
                         .sort((a, b) => (a.landedCount > b.landedCount) ? -1 : 1)
  const tricksToLearn = tricks.get().filter(trick => trick.landedCount === 0 && trick.practising == true)
  const futureTricks = tricks.get().filter(trick => trick.landedCount === 0 && trick.practising == false)

  return (
    <View style={styles.container}>
      <ScrollView style={styles.mainWrapper}>
        <View style={styles.tricksWrapper}>
          <TrickList trickList={myTricks}
                     title={'My Tricks'}
                     inSession={false}
                     accentColor={theme.colors.primary}/>

          <TrickList trickList={tricksToLearn}
                     title={'Tricks to Learn'}
                     inSession={false}
                     accentColor={theme.colors.secondary}/>

          <TrickList trickList={futureTricks}
                     title={'Future Tricks'}
                     inSession={false}
                     accentColor={theme.colors.accent}/>
          <View style={styles.spacer} />
        </View>
      </ScrollView>

      {/* Bottom Menu */}
      <BottomBar>
        <TouchableOpacity style={styles.button}
                          onPress={() => navigation.navigate('History')}>
          <Text>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
                          onPress={() => navigation.navigate('Create')}>
          <Text>Add Trick</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
                          onPress={() => navigation.navigate('Session')}>
          <Text>Start Session</Text>
        </TouchableOpacity>
      </BottomBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  tricksWrapper: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  sectionTitle: {
    fontSize: 24,
    paddingTop: 10
  },
  items: {
    paddingTop: 10
  },
  mainWrapper: {
    paddingTop: 50,
  },
  spacer: {
    height: 100,
  },
  button: {
    padding: 20
  }
});

export default HomeScreen;
