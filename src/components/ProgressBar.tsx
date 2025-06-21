import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ProgressBarProps } from '@/types'
import { COLORS } from '@/constants'

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View
          style={[styles.progress, { width: `${progress}%` }]}
          testID="progress-bar-fill"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.GRAY_LIGHT,
  },
  progressBar: {
    height: 25,
    backgroundColor: COLORS.GRAY_LIGHT,
    width: '100%',
  },
  progress: {
    height: '100%',
    backgroundColor: COLORS.BLACK,
  },
})

export default ProgressBar
