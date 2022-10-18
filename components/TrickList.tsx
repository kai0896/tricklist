import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TrickItem from './Trick'
import {Trick} from '../store'

type TrickListProps = {
  trickList: Trick[],
  title: string,
  inSession: boolean,
  accentColor: string,
}

const TrickList: React.FC<TrickListProps> = (props) => {
  return (
  <View>
    <Text style={[styles.sectionTitle, {backgroundColor: props.accentColor}]}>{props.title}</Text>
    <View style={styles.items}>
      {props.trickList.map((trick, index) => (
        <TrickItem info={trick} key={index} inSession={props.inSession} accentColor={props.accentColor}/>
      ))}
    </View>
  </View>
    );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    paddingVertical: 10,
    paddingLeft: 20,
    marginTop: 10,
  },
  items: {
    paddingTop: 10
  },
});

export default TrickList;
