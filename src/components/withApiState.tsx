import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { ApiStateProps } from '../types'

const withApiState = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): React.FC<P & ApiStateProps> => {
  return function WithApiStateComponent(props: P & ApiStateProps) {
    const { isLoading, error, children, ...otherProps } = props

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )
    }

    return (
      <WrappedComponent {...(otherProps as P)}>{children}</WrappedComponent>
    )
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#f44336',
    textAlign: 'center',
  },
})

export default withApiState
