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
import { RootStackParamList } from '../navigation/AppNavigator'
import { RootState, AppDispatch } from '../store'
import RadioButton from '../components/RadioButton'

interface LifestyleScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Lifestyle'>
}

const LifestyleScreen: React.FC<LifestyleScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { currentStep, totalSteps, isDailyExposure, isSmoke, alcohol } =
    useSelector((state: RootState) => state.onboarding)

  const [sunExposure, setSunExposure] = useState(isDailyExposure)
  const [smoking, setSmoking] = useState(isSmoke)
  const [alcoholConsumption, setAlcoholConsumption] = useState(alcohol)

  const handleNext = () => {
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

  const handleBack = () => {
    dispatch(prevStep())
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <ScrollView style={styles.content}>
        {/* Sun Exposure Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>
            Is your daily exposure to sun is limited?{' '}
            <Text style={styles.asterisk}>*</Text>
          </Text>

          <View style={styles.optionsContainer}>
            <RadioButton
              selected={sunExposure}
              onPress={setSunExposure}
              label="Yes"
              value={true}
            />
            <RadioButton
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
            <Text style={styles.asterisk}>*</Text>
          </Text>

          <View style={styles.optionsContainer}>
            <RadioButton
              selected={smoking}
              onPress={setSmoking}
              label="Yes"
              value={true}
            />
            <RadioButton
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
            <Text style={styles.asterisk}>*</Text>
          </Text>

          <View style={styles.optionsContainer}>
            <RadioButton
              selected={alcoholConsumption}
              onPress={setAlcoholConsumption}
              label="0 - 1"
              value="0-1"
            />
            <RadioButton
              selected={alcoholConsumption}
              onPress={setAlcoholConsumption}
              label="2 - 5"
              value="2-5"
            />
            <RadioButton
              selected={alcoholConsumption}
              onPress={setAlcoholConsumption}
              label="5+"
              value="5+"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Get my personalized vitamin"
            onPress={handleNext}
            style={styles.nextButton}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8E6C9',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  questionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E5D32',
    marginBottom: 20,
    lineHeight: 24,
  },
  asterisk: {
    color: '#FF6B47',
  },
  optionsContainer: {
    gap: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    backgroundColor: '#FFFFFF',
  },
  radioSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
  },
  radioLabel: {
    fontSize: 16,
    color: '#2E5D32',
    fontWeight: '500',
  },
  footer: {
    padding: 24,
    backgroundColor: '#C8E6C9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 1,
  },
})

export default LifestyleScreen
