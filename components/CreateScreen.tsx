import { StyleSheet, Text, View, Switch, TouchableOpacity, TextInput, Linking } from 'react-native';
import React from 'react';
import * as Clipboard from 'expo-clipboard';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useState } from '@hookstate/core'
import store from '../store'
import {Trick} from '../store'
import storage from '../storage'
import {theme} from '../theme'

type Props = {
  navigation: NavigationProp<ParamListBase>
}

const CreateScreen: React.FC<Props> = ({navigation}) => {
  const { tricks } = useState(store)
  const state = useState(store)
  const inputValue = useState('')
  const pracValue = useState(true)
  const linkValue = useState('')
  const togglePracValue = () => pracValue.set(!pracValue.get())

  const handleAddTrick = () => {
    const trickExists = tricks.get().some(el => el.name === inputValue.get())
    const nameValid = inputValue.get().length > 2

    if (!trickExists && nameValid) {
      const newTrick: Trick = {
        name: inputValue.get(),
        landedCount: 0,
        practising: pracValue.get(),
        landed: false,
        link: linkValue.get().length > 0 ? linkValue.get() : undefined,
      }
      tricks.merge([newTrick])
      storage.save({key: 'state', data: state.get(), expires: null});
      navigation.goBack()
    }
    else {
      console.log('trick name cannot be used')
    }
  }

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync()
    const supported = await Linking.canOpenURL(text);
    if(supported){
      linkValue.set(text)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder={'trick name'}
        style={styles.input}
        autoFocus={true}
        onSubmitEditing={handleAddTrick}
        onChangeText={text => inputValue.set(text)} />

      <View style={styles.switchContainer}>
        <Text style={styles.toggleText}>Practising?</Text>
        <Switch onValueChange={togglePracValue}
          value={pracValue.get()} />
      </View>

      <TouchableOpacity style={styles.button} onPress={fetchCopiedText}>
        <Text>Paste Link</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button,
                                {backgroundColor: pracValue.get() ?
                                                  theme.colors.secondary :
                                                  theme.colors.accent}]}
                        onPress={() => handleAddTrick()}>
        <Text>Add Trick</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  input: {
    padding: 20,
    alignSelf: 'stretch',
  },
  button: {
    padding: 20,
    alignSelf: 'stretch',
  },
  switchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  toggleText: {
    marginTop: 15,
  }
});

export default CreateScreen;
