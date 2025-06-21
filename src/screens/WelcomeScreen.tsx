import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import CustomButton from '@/components/CustomButton'
import { setCurrentStep } from '@/store/slices/onboardingSlice'
import { BaseNavigationProps } from '@/types'
import { AppDispatch } from '@/store'
import { COLORS, FONT_SIZES, FONT_WEIGHTS, SCREEN_NAMES } from '@/constants'

type WelcomeScreenProps = BaseNavigationProps<'Welcome'>

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleGetStarted = (): void => {
    dispatch(setCurrentStep(0))
    navigation.navigate(SCREEN_NAMES.HEALTH_CONCERNS)
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to DailyVita</Text>
        <Text style={styles.subtitle}>
          Hello, we are here to make your life{'\n'}healthier and happier
        </Text>

        <Image
          source={require('../../assets/images/illustrationImage.png')}
          style={styles.illustration}
        />

        <Text style={styles.description}>
          We will ask couple of questions to better{'\n'}understand your vitamin
          need.
        </Text>

        <CustomButton
          title="Get started"
          onPress={handleGetStarted}
          style={styles.buttonContainer}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.SECONDARY_LIGHT,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: FONT_SIZES.LARGE,
    fontWeight: FONT_WEIGHTS.BOLD,
    color: COLORS.SECONDARY,
    textAlign: 'left',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.GRAY_TEXT,
    textAlign: 'left',
    lineHeight: 24,
    marginBottom: 20,
    marginTop: 20,
  },
  illustration: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop: 20,
  },
  description: {
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.GRAY_TEXT,
    textAlign: 'left',
    lineHeight: 24,
    marginBottom: 30,
    marginTop: 20,
  },
  buttonContainer: {
    width: '100%',
  },
})

export default WelcomeScreen
