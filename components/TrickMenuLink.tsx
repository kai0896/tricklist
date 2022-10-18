import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import React, { useCallback } from "react";
import store from '../store'
import { useState } from '@hookstate/core'
import { Trick } from '../store'

type Props = {
  trick: Trick
}

const TrickMenuLink: React.FC<Props> = (props) => {
  const { tricks } = useState(store)

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync()
    const index = tricks.get().map(e => e.name).indexOf(props.trick.name);
    const supported = await Linking.canOpenURL(text);

    if(supported) {
      tricks.nested(index).set({ ...props.trick, link: text})
    }
  }

  const openLink = useCallback(async () => {
    const url = props.trick.link!;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  }, []);

  return (
    <View>
      {props.trick.link == null ?
        <TouchableOpacity style={styles.Button} onPress={fetchCopiedText}>
          <Text>Paste Link</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity style={styles.Button} onPress={openLink}>
          <Text>Open Link</Text>
        </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  Button: {
    alignSelf: 'stretch',
    padding: 15,
    margin: 5
  },
})
export default TrickMenuLink;
