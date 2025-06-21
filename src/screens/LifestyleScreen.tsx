import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '@/components/CustomButton'
import ProgressBar from '@/components/ProgressBar'
import {
  setDailyExposure,
  setSmoke,
  setAlcohol,
  saveOnboardingData,
} from '@/store/slices/onboardingSlice'
import { BaseNavigationProps } from '@/types'
import { RootState, AppDispatch } from '@/store'
import RadioButton from '@/components/RadioButton'
import {
  COLORS,
  DIMENSIONS,
  FONT_SIZES,
  FONT_WEIGHTS,
  ALCOHOL_OPTIONS,
  LIFESTYLE_QUESTIONS,
  RADIO_LABELS,
  BUTTON_TITLES,
  MESSAGES,
  commonStyles,
  textStyles,
} from '@/constants'

type LifestyleScreenProps = BaseNavigationProps<'Lifestyle'>

const LifestyleScreen: React.FC<LifestyleScreenProps> = () => {
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
        MESSAGES.COMPLETE_REQUIRED_FIELDS,
        MESSAGES.COMPLETE_ALL_QUESTIONS,
      )
      return
    }

    dispatch(setDailyExposure(sunExposure))
    dispatch(setSmoke(smoking))
    dispatch(setAlcohol(alcoholConsumption))
    dispatch(saveOnboardingData())
  }

  return (
    <SafeAreaView
      style={commonStyles.safeAreaContainer}
      edges={['top', 'left', 'right']}
    >
      <ScrollView style={styles.content}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>
            {LIFESTYLE_QUESTIONS.SUN_EXPOSURE}{' '}
            <Text style={textStyles.asterisk}>*</Text>
          </Text>

          <View style={styles.optionsContainer}>
            <RadioButton<boolean | null>
              selected={sunExposure}
              onPress={setSunExposure}
              label={RADIO_LABELS.YES}
              value={true}
            />
            <RadioButton<boolean | null>
              selected={sunExposure}
              onPress={setSunExposure}
              label={RADIO_LABELS.NO}
              value={false}
            />
          </View>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>
            {LIFESTYLE_QUESTIONS.SMOKING}{' '}
            <Text style={textStyles.asterisk}>*</Text>
          </Text>

          <View style={styles.optionsContainer}>
            <RadioButton<boolean | null>
              selected={smoking}
              onPress={setSmoking}
              label={RADIO_LABELS.YES}
              value={true}
            />
            <RadioButton<boolean | null>
              selected={smoking}
              onPress={setSmoking}
              label={RADIO_LABELS.NO}
              value={false}
            />
          </View>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>
            {LIFESTYLE_QUESTIONS.ALCOHOL_CONSUMPTION}{' '}
            <Text style={textStyles.asterisk}>*</Text>
          </Text>

          <View style={styles.optionsContainer}>
            <RadioButton
              selected={alcoholConsumption}
              onPress={setAlcoholConsumption}
              label={RADIO_LABELS.ALCOHOL_LOW}
              value={ALCOHOL_OPTIONS.LOW}
            />
            <RadioButton
              selected={alcoholConsumption}
              onPress={setAlcoholConsumption}
              label={RADIO_LABELS.ALCOHOL_MEDIUM}
              value={ALCOHOL_OPTIONS.MEDIUM}
            />
            <RadioButton
              selected={alcoholConsumption}
              onPress={setAlcoholConsumption}
              label={RADIO_LABELS.ALCOHOL_HIGH}
              value={ALCOHOL_OPTIONS.HIGH}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <CustomButton
            title={BUTTON_TITLES.GET_PERSONALIZED_VITAMIN}
            onPress={handleNext}
            style={commonStyles.singleButtonContainer}
          />
        </View>
      </View>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
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
    marginBottom: DIMENSIONS.SPACING_XL,
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
