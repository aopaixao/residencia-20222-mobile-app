import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login';
import Home from './pages/Home';

//Importando o provedor de contexto do DataContext
import { DataProvider } from './context/DataContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={Login} />
          <Stack.Screen name="HomeScreen" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

export default App;