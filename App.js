import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EBooksListScreens from "./src/screens/EBooksListScreens";
import EBooksSearchResultScreen from './src/screens/EBooksSearchResultScreen';
import EBooksInfoScreen from "./src/screens/EBooksInfoScreens";

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="eBooksList">
        <Stack.Screen name="eBooksList" component={EBooksListScreens} options={{headerShown:false}} />
        <Stack.Screen name="eBooksSearch" component={EBooksSearchResultScreen} options={{title:"Resultados"}}/>
        <Stack.Screen name="eBooksInfo" component={EBooksInfoScreen} options={{title:"Informacion"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
  }
