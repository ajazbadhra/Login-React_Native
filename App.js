import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Home from './scr/screens/Home'
import Login from './scr/screens/Login'


const stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator
        initialRouteName = 'Login'
      >
        <stack.Screen
          name = 'Login'
          component = {Login} 
          options={{
            headerShown : false,
          }}
        />
        <stack.Screen 
          name = "Home"
          component = {Home}
        />
      </stack.Navigator>
    </NavigationContainer>
  )
}

export default App
