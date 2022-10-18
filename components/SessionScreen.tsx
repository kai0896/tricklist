import { StyleSheet, Text, View, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import React, { useEffect} from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import TrickList from './TrickList'
import BottomBar from './BottomBar'
import { useState, useHookstate } from '@hookstate/core'
import {Session} from '../store'
import store from '../store'
import storage from '../storage'
import {theme} from '../theme'

type Props = {
  navigation: NavigationProp<ParamListBase>
}

const SessionScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])

  const startTime = useHookstate(new Date())
  const { tricks, sessions } = useState(store)
  const state = useState(store)
  const myTricks = tricks.get()
                         .filter(trick => trick.landedCount > 0)
                         .sort((a, b) => (a.landedCount > b.landedCount) ? -1 : 1)
  const tricksToLearn = tricks.get().filter(trick => trick.landedCount === 0
                                                && trick.practising == true)

  const handleSessionFinish = () => {
    const dateNow = new Date()
    const duration = dateNow.getTime() - startTime.get().getTime()
    const session: Session = {
      tricks: tricks.get(),
      date: dateNow,
      duration: duration,
    }
    sessions.merge([session])

    tricks.map(trick => {
      trick.set(t => t.landed ? {...t, landed: false, landedCount: t.landedCount + 1} : t)
    })

    storage.save({
      key: 'state',
      data: state.get(),
      expires: null
    });

    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.mainWrapper}>
        <View style={styles.tricksWrapper}>
          <TrickList trickList={myTricks}
                     title={'My Tricks'} inSession={true}
                     accentColor={theme.colors.primary}/>

          <TrickList trickList={tricksToLearn}
                     title={'Tricks to Learn'}
                     inSession={true}
                     accentColor={theme.colors.secondary} />
          <View style={styles.spacer} />
        </View>
      </ScrollView>

      {/* Bottom Menu */}
      <BottomBar>
        <TouchableOpacity style={styles.button}
                          onPress={() => navigation.navigate('Create')}>
          <Text>Add Trick</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
                          onPress={handleSessionFinish}>
          <Text>Finish Session</Text>
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
  bottomBar: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.backgroundAlt,
    flexDirection: 'row',
  },
  mainWrapper: {
    paddingTop: 50,
  },
  spacer: {
    height: 100,
  },
  button: {
    padding: 20,
  }
});

export default SessionScreen;
