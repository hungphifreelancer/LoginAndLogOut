import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './Main';
import DetailItem from './DetailItem';
import AddItem from './AddItem';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {changeReducer} from './store/reducer/authReducers';

const Stack = createStackNavigator();

const rootReducer = combineReducers({
  change: changeReducer,
});

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode={'none'}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="AddItem" component={AddItem} />
          <Stack.Screen name="DetailItem" component={DetailItem} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
