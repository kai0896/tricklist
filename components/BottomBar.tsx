import { StyleSheet, View} from 'react-native';
import React from 'react';
import {theme} from '../theme'

const BottomBar: React.FC<any> = (props) => {
  return (
    <View style={styles.main}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.backgroundAlt,
    flexDirection: 'row',
  },
})

export default BottomBar;
