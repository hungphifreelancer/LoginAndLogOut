import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './Main';
import DetailItem from './DetailItem';
import AddItem from './AddItem';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="AddItem" component={AddItem} />
        <Stack.Screen name="DetailItem" component={DetailItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
