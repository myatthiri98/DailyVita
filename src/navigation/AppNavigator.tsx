import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'
import { RootStackParamList } from '@/types'
import { SCREEN_NAMES } from '@/constants'

import WelcomeScreen from '@/screens/WelcomeScreen'
import HealthConcernsScreen from '@/screens/HealthConcernsScreen'
import DietsScreen from '@/screens/DietsScreen'
import LifestyleScreen from '@/screens/LifestyleScreen'
import AllergiesScreen from '@/screens/AllergiesScreen'

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>

const Stack = createStackNavigator<RootStackParamList>()

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={SCREEN_NAMES.WELCOME}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={SCREEN_NAMES.WELCOME} component={WelcomeScreen} />
        <Stack.Screen
          name={SCREEN_NAMES.HEALTH_CONCERNS}
          component={HealthConcernsScreen}
        />
        <Stack.Screen name={SCREEN_NAMES.DIETS} component={DietsScreen} />
        <Stack.Screen
          name={SCREEN_NAMES.ALLERGIES}
          component={AllergiesScreen}
        />
        <Stack.Screen
          name={SCREEN_NAMES.LIFESTYLE}
          component={LifestyleScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
