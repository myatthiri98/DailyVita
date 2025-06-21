import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'

import WelcomeScreen from '../screens/WelcomeScreen'
import HealthConcernsScreen from '../screens/HealthConcernsScreen'
import DietsScreen from '../screens/DietsScreen'
import LifestyleScreen from '../screens/LifestyleScreen'
import AllergiesScreen from '../screens/AllergiesScreen'

export type RootStackParamList = {
  Welcome: undefined
  HealthConcerns: undefined
  Diets: undefined
  Lifestyle: undefined
  Allergies: undefined
}

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>

const Stack = createStackNavigator<RootStackParamList>()

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="HealthConcerns" component={HealthConcernsScreen} />
        <Stack.Screen name="Diets" component={DietsScreen} />
        <Stack.Screen name="Allergies" component={AllergiesScreen} />
        <Stack.Screen name="Lifestyle" component={LifestyleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
