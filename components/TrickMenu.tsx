import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { useState, none } from '@hookstate/core'
import store from '../store'
import { Trick } from '../store'
import TrickMenuLink from './TrickMenuLink'
import { theme } from '../theme'

type TrickMenuProps = {
  info: Trick,
  isOpen: boolean,
  closeMenu: Function,
}

const TrickMenu: React.FC<TrickMenuProps> = (props) => {
  const { tricks } = useState(store)

  const removeTrick = () => {
    const index = tricks.get().map(e => e.name).indexOf(props.info.name);
    tricks.nested(index).set(none)
    props.closeMenu()
  }

  const togglePractising = () => {
    const index = tricks.get().map(e => e.name).indexOf(props.info.name);
    tricks.nested(index).set({ ...props.info, practising: !props.info.practising })
    props.closeMenu()
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.isOpen}
      onDismiss={props.closeMenu}
      onRequestClose={props.closeMenu}
    >
      <View style={styles.popupView}>
          <TouchableOpacity style={styles.popupClose} onPress={() => props.closeMenu()} />

        <View style={styles.popupBorder}>
          <TrickMenuLink trick={props.info}/>

          {props.info.landedCount == 0 && props.info.practising &&
            <TouchableOpacity style={styles.Button} onPress={togglePractising}>
              <Text>Stop practising</Text>
            </TouchableOpacity>
          }

          {props.info.landedCount == 0 && !props.info.practising &&
            <TouchableOpacity style={styles.Button} onPress={togglePractising}>
              <Text>Start practising</Text>
            </TouchableOpacity>
          }

          <TouchableOpacity style={styles.Button} onPress={removeTrick}>
            <Text>Remove</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.Button} onPress={() => props.closeMenu()}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  popupView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "stretch",
    marginBottom: 55,
  },
  popupBorder: {
    backgroundColor: theme.colors.backgroundAlt,
    padding: 10,
    paddingBottom: 80,
  },
  popupClose: {
    alignSelf: 'stretch',
    height: 300,
  },
  Button: {
    alignSelf: 'stretch',
    padding: 15,
    margin: 5
  },
})

export default TrickMenu;
