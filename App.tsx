import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen'
import CreateScreen from './components/CreateScreen'
import SessionScreen from './components/SessionScreen'
import HistoryScreen from './components/HistoryScreen'
import { useState } from '@hookstate/core'
import store from './store'
import storage from './storage'

const Stack = createNativeStackNavigator();

export default function App() {
  const state = useState(store)
  storage.load({
      key: 'state',
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        extraFetchOptions: {},
        someFlag: true
      }
    })
    .then(ret => {
      state.set(ret)
    })
    .catch(err => {
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          console.warn("not found");
          break;
        case 'ExpiredError':
          console.warn("ecpired");
          break;
      }
    });
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Homescreen',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Create"
          component={CreateScreen} />
        <Stack.Screen
          name="Session"
          component={SessionScreen}
          options={{
            title: 'Session',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{
            title: 'History',
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
