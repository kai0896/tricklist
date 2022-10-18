import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { useState, useHookstate} from '@hookstate/core'
import store from '../store'
import { Trick } from '../store'
import {theme} from '../theme'
import TrickMenu from './TrickMenu'

type TrickItemProps = {
  info: Trick,
  inSession: boolean,
  accentColor: string,
}

const TrickItem: React.FC<TrickItemProps> = (props) => {
  const { tricks } = useState(store)
  const popupOpen = useHookstate(false)
  const openPopup = () => popupOpen.set(true)
  const closePopup = () => popupOpen.set(false)

  const toggleCheckValue = () => {
    const index = tricks.get().map(e => e.name).indexOf(props.info.name);
    tricks.nested(index).set({...props.info, landed: !props.info.landed})
  }

  const getBackgroundColor = () => {
    return props.info.landed ? props.accentColor : theme.colors.background
  }

  return (
    <View style={[styles.item, {backgroundColor: getBackgroundColor()}]}>
      <TrickMenu info={props.info} isOpen={popupOpen.get()} closeMenu={closePopup}/>

      <TouchableOpacity style={styles.itemLeft} onPress={openPopup}>
        <Text style={styles.text}>{props.info.name}</Text>
      </TouchableOpacity>

      {props.inSession ?

        <TouchableOpacity style={styles.itemRight} onPress={toggleCheckValue}>
          <View style={styles.circle}>
            {props.info.landed &&
            <View style={styles.circleFill}/>
            }
          </View>
        </TouchableOpacity>
        :
        <View style={styles.itemRight}>
          <Text style={styles.text}>{props.info.landedCount > 0 ? props.info.landedCount : ""}</Text>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemLeft: {
    alignSelf: 'stretch',
    padding: 12,
    paddingLeft: 20,
    width: 240,
  },
  itemRight: {
    padding: 12,
    paddingRight: 20,
    paddingLeft: 30,
  },
  text: {
    fontSize: theme.text.fontSize,
  },
  circle: {
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#222'
  },
  circleFill: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#555'
  }
});

export default TrickItem;
