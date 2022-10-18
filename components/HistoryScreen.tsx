import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import BottomBar from './BottomBar'
import SessionListItem from './SessionListItem'
import { useState } from '@hookstate/core'
import { theme } from '../theme'
import store from '../store'

type Props = {
  navigation: NavigationProp<ParamListBase>
}

const HistoryScreen: React.FC<Props> = ({ navigation }) => {
  const {sessions} = useState(store)

  return (
    <View style={styles.container}>

      {sessions.get().map((session, index) => (
        <SessionListItem session={session} key={index}/>
      ))}

      {/* Bottom Menu */}
      <BottomBar>
        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate('Home')}>
          <Text>Close</Text>
        </TouchableOpacity>
      </BottomBar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  button: {
    padding: 20,
  }
});
export default HistoryScreen;
