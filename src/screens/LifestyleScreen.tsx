import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack'
import CustomButton from '../components/CustomButton'
import ProgressBar from '../components/ProgressBar'
import {
  setDailyExposure,
  setSmoke,
  setAlcohol,
  prevStep,
  saveOnboardingData,
} from '../store/slices/onboardingSlice'
import { BaseNavigationProps } from '../types'
import { RootState, AppDispatch } from '../store'
import RadioButton from '../components/RadioButton'
import {
  COLORS,
  DIMENSIONS,
  FONT_SIZES,
  FONT_WEIGHTS,
  ALCOHOL_OPTIONS,
  MESSAGES,
  commonStyles,
  textStyles,
  shadows,
} from '../constants'

type LifestyleScreenProps = BaseNavigationProps<'Lifestyle'>

const LifestyleScreen: React.FC<LifestyleScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { currentStep, totalSteps, isDailyExposure, isSmoke, alcohol } =
    useSelector((state: RootState) => state.onboarding)

  const [sunExposure, setSunExposure] = useState(isDailyExposure)
  const [smoking, setSmoking] = useState(isSmoke)
  const [alcoholConsumption, setAlcoholConsumption] = useState(alcohol)

  const handleNext = (): void => {
    if (
      sunExposure === null ||
      smoking === null ||
      alcoholConsumption === null
    ) {
      Alert.alert(
        'Complete Required Fields',
        'Please answer all questions before proceeding.',
      )
      return
    }

    dispatch(setDailyExposure(sunExposure))
    dispatch(setSmoke(smoking))
    dispatch(setAlcohol(alcoholConsumption))
    dispatch(saveOnboardingData())
  }

  const handleBack = (): void => {
    dispatch(prevStep())
    navigation.goBack()
  }

  return (
    <SafeAreaView
      style={commonStyles.safeAreaContainer}
      edges={['top', 'left', 'right']}
    >
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <ScrollView style={styles.content}>
        {/* Sun Exposure Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>
            Is your daily exposure to sun is limited?{' '}
            <Text style={textStyles.asterisk}>*</Text>
          </Text>

          <View style={styles.optionsContainer}>
            <RadioButton<boolean | null>
              selected={sunExposure}
              onPress={setSunExposure}
              label="Yes"
              value={true}
            />
            <RadioButton<boolean | null>
              selected={sunExposure}
              onPress={setSunExposure}
              label="No"
              value={false}
            />
          </View>
        </View>

        {/* Smoking Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>
            Do you current smoke (tobacco or marijuana)?{' '}
            <Text style={textStyles.asterisk}>*</Text>
          </Text>

          <View style={styles.optionsContainer}>
            <RadioButton<boolean | null>
              selected={smoking}
              onPress={setSmoking}
              label="Yes"
              value={true}
            />
            <RadioButton<boolean | null>
              selected={smoking}
              onPress={setSmoking}
              label="No"
              value={false}
            />
          </View>
        </View>

        {/* Alcohol Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>
            On average, how many alcoholic beverages do you have in a week?{' '}
            <Text style={textStyles.asterisk}>*</Text>
          </Text>

          <View style={styles.optionsContainer}>
            <RadioButton
              selected={alcoholConsumption}
              onPress={setAlcoholConsumption}
              label="0 - 1"
              value={ALCOHOL_OPTIONS.LOW}
            />
            <RadioButton
              selected={alcoholConsumption}
              onPress={setAlcoholConsumption}
              label="2 - 5"
              value={ALCOHOL_OPTIONS.MEDIUM}
            />
            <RadioButton
              selected={alcoholConsumption}
              onPress={setAlcoholConsumption}
              label="5+"
              value={ALCOHOL_OPTIONS.HIGH}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Get my personalized vitamin"
            onPress={handleNext}
            style={commonStyles.singleButtonContainer}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: DIMENSIONS.SPACING_XXL,
    paddingTop: DIMENSIONS.SPACING_XXXL,
  },
  questionContainer: {
    // backgroundColor: COLORS.WHITE,
    // borderRadius: DIMENSIONS.BORDER_RADIUS_LARGE,
    // padding: DIMENSIONS.SPACING_XXL,
    marginBottom: DIMENSIONS.SPACING_XL,
    // ...shadows.medium,
  },
  questionTitle: {
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    color: COLORS.SECONDARY,
    lineHeight: FONT_SIZES.XL,
    marginBottom: DIMENSIONS.SPACING_XS,
  },
  optionsContainer: {
    gap: DIMENSIONS.SPACING_XS,
  },
  footer: {
    padding: DIMENSIONS.SPACING_XXL,
    backgroundColor: COLORS.SECONDARY_LIGHT,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: DIMENSIONS.SPACING_LG,
  },
})

export default LifestyleScreen
