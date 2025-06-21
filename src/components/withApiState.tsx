import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { WithApiState } from '../types'
import { COLORS, FONT_SIZES, DIMENSIONS, MESSAGES } from '../constants'

const withApiState = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): React.FC<WithApiState<P>> => {
  return function WithApiStateComponent(props: WithApiState<P>) {
    const { isLoading, error, children, ...otherProps } = props

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={COLORS.SUCCESS}
            testID="loading-indicator"
          />
          <Text style={styles.loadingText}>{MESSAGES.LOADING}</Text>
        </View>
      )
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText} testID="error-message">
            {MESSAGES.ERROR_PREFIX}
            {error}
          </Text>
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
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },
  loadingText: {
    marginTop: DIMENSIONS.SPACING_MD,
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.GRAY_DISABLED,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    padding: DIMENSIONS.SPACING_XL,
  },
  errorText: {
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.ERROR,
    textAlign: 'center',
  },
})

export default withApiState
