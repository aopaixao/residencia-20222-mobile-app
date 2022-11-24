import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './pages/Login';
import Home from './pages/Home';
import HomeEditoras from './pages/HomeEditoras';
import HomeEditora from './pages/HomeEditora';

//Importando o provedor de contexto do DataContext
import { DataProvider } from './context/DataContext';

const TabBottomNavigation = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <TabBottomNavigation.Navigator 
      screenOptions={{
        headerShown:false,
        tabBarStyle:{backgroundColor: '#ffcc00', padding: 6},
        tabBarLabelStyle:{fontSize: 14},
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#009999'
      }}
    >
      <TabBottomNavigation.Screen name="HomeTabScreen" component={Home}
        options={{
          title:'Home',
          tabBarIcon: () => (<Ionicons name='home' color='#000' size={24} />)
        }}
      />
      <TabBottomNavigation.Screen name="HomeEditorasTabScreen" component={HomeEditoras}
        options={{
          title:'Home Editoras',
          tabBarIcon: () => (<Ionicons name='library' color='#000' size={24} />)
        }}
      />
      <TabBottomNavigation.Screen name="HomeEditoraTabScreen" component={HomeEditora}
        options={{
          title:'Home Editora',
          tabBarIcon: () => (<Ionicons name='library' color='#000' size={24} />),
          tabBarButton: (props) => null, 
        }}
      />
    </TabBottomNavigation.Navigator>
  );
}

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="BottomNavigatorScreen" options={{
            title:'Home' }} 
            component={BottomNavigator} 
          />
          {/*<Stack.Screen name="HomeEditoraScreen" component={HomeEditora} />*/}
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

export default App;