import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState } from '@hookstate/core'
import { theme } from '../theme'
import { Session } from '../store'
import { msToTime } from '../helpers'

type Props = {
  session: Session
}

const SessionListItem: React.FC<Props> = (props) => {
  const date: Date = new Date(props.session.date)
  return (
    <View>
      <Text>
        {date.toDateString()}
      </Text>
      <Text>
        {msToTime(props.session.duration)}
      </Text>
    </View>
  )
}

export default SessionListItem;
