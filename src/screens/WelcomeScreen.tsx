import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import CustomButton from '../components/CustomButton'
import { setCurrentStep } from '../store/slices/onboardingSlice'
import { BaseNavigationProps } from '../types'
import { AppDispatch } from '../store'
import {
  COLORS,
  DIMENSIONS,
  FONT_SIZES,
  SCREEN_NAMES,
  commonStyles,
  textStyles,
  shadows,
} from '../constants'

const { width } = Dimensions.get('window')

type WelcomeScreenProps = BaseNavigationProps<'Welcome'>

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleGetStarted = (): void => {
    dispatch(setCurrentStep(1))
    navigation.navigate(SCREEN_NAMES.HEALTH_CONCERNS)
  }

  return (
    <SafeAreaView
      style={commonStyles.safeAreaContainer}
      edges={['top', 'left', 'right']}
    >
      <View style={commonStyles.contentContainer}>
        <View style={commonStyles.header}>
          <Text style={textStyles.title}>Welcome to DailyVita</Text>
          <Text style={textStyles.subtitle}>
            Hello, we are here to make your life{'\n'}healthier and happier
          </Text>
        </View>

        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBox}>
            {/* Pills floating around */}
            <View style={[styles.pill, styles.pill1]}>
              <Text style={styles.pillText}>💊</Text>
            </View>
            <View style={[styles.pill, styles.pill2]}>
              <Text style={styles.pillText}>🧬</Text>
            </View>
            <View style={[styles.pill, styles.pill3]}>
              <Text style={styles.pillText}>💊</Text>
            </View>
            <View style={[styles.pill, styles.pill4]}>
              <Text style={styles.pillText}>🧪</Text>
            </View>

            {/* Main characters */}
            <View style={styles.charactersContainer}>
              <View style={styles.character}>
                <Text style={styles.characterEmoji}>👩‍⚕️</Text>
                <View style={styles.speechBubble}>
                  <Text style={styles.speechText}>💬</Text>
                </View>
              </View>
              <View style={styles.character}>
                <Text style={styles.characterEmoji}>👨‍⚕️</Text>
                <View style={styles.speechBubble}>
                  <Text style={styles.speechText}>💬</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={commonStyles.footer}>
          <Text style={textStyles.description}>
            We will ask couple of questions to better{'\n'}understand your
            vitamin need.
          </Text>

          <CustomButton
            title="Get started"
            onPress={handleGetStarted}
            style={commonStyles.singleButtonContainer}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: DIMENSIONS.SPACING_SECTION,
  },
  illustrationBox: {
    width: width * 0.8,
    height: 300,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pill: {
    position: 'absolute',
    width: DIMENSIONS.PILL_SIZE,
    height: DIMENSIONS.PILL_SIZE,
    borderRadius: DIMENSIONS.PILL_SIZE / 2,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
  },
  pill1: {
    top: 20,
    left: 30,
    backgroundColor: COLORS.ACCENT_BLUE,
  },
  pill2: {
    top: 50,
    right: 20,
    backgroundColor: COLORS.ACCENT_PURPLE,
  },
  pill3: {
    bottom: 80,
    left: 20,
    backgroundColor: COLORS.ACCENT_ORANGE,
  },
  pill4: {
    bottom: 30,
    right: 40,
    backgroundColor: COLORS.SUCCESS_LIGHT,
  },
  pillText: {
    fontSize: FONT_SIZES.LARGE,
  },
  charactersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DIMENSIONS.SPACING_XL,
  },
  character: {
    alignItems: 'center',
    position: 'relative',
  },
  characterEmoji: {
    fontSize: DIMENSIONS.CHARACTER_EMOJI_SIZE,
  },
  speechBubble: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: COLORS.WHITE,
    borderRadius: DIMENSIONS.BORDER_RADIUS_LARGE,
    padding: DIMENSIONS.SPACING_SM,
    ...shadows.small,
  },
  speechText: {
    fontSize: FONT_SIZES.SMALL,
  },
})

export default WelcomeScreen
