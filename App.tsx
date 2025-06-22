import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import Toast from 'react-native-toast-message'
import { store } from '@/store'
import AppNavigator from '@/navigation/AppNavigator'

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#C8E6C9"
          translucent={false}
        />
        <AppNavigator />
        <Toast />
      </SafeAreaProvider>
    </Provider>
  )
}
