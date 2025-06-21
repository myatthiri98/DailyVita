import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack'
import CustomButton from '../components/CustomButton'
import ProgressBar from '../components/ProgressBar'
import {
  setAllergies,
  setCustomAllergies,
  prevStep,
  nextStep,
} from '../store/slices/onboardingSlice'
import { RootStackParamList } from '../navigation/AppNavigator'
import { RootState, AppDispatch } from '../store'
import { Allergy } from '../types'
import allergiesData from '../data/allergies.json'

interface AllergiesScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Allergies'>
}

const AllergiesScreen: React.FC<AllergiesScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { currentStep, totalSteps, allergies, customAllergies } = useSelector(
    (state: RootState) => state.onboarding,
  )

  const [selectedAllergies, setSelectedAllergies] =
    useState<Allergy[]>(allergies)
  const [customText, setCustomText] = useState<string>(customAllergies)

  const handleAllergyToggle = (allergy: Allergy): void => {
    setSelectedAllergies((prev) => {
      const isSelected = prev.some((item) => item.id === allergy.id)
      if (isSelected) {
        return prev.filter((item) => item.id !== allergy.id)
      } else {
        return [...prev, allergy]
      }
    })
  }

  const handleSubmit = (): void => {
    dispatch(setAllergies(selectedAllergies))
    dispatch(setCustomAllergies(customText))
    dispatch(nextStep())
    navigation.navigate('Lifestyle')
  }

  const handleBack = () => {
    dispatch(prevStep())
    navigation.goBack()
  }

  const isSelected = (allergy: Allergy): boolean => {
    return selectedAllergies.some((item) => item.id === allergy.id)
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Write any specific allergies or sensitivity towards specific things.
            (optional)
          </Text>
        </View>

        <View style={styles.allergiesContainer}>
          {/* Predefined allergies */}
          <View style={styles.predefinedContainer}>
            {allergiesData.data.map((allergy) => {
              const selected = isSelected(allergy)

              return (
                <TouchableOpacity
                  key={allergy.id}
                  style={[
                    styles.allergyTag,
                    selected && styles.allergyTagSelected,
                  ]}
                  onPress={() => handleAllergyToggle(allergy)}
                >
                  <Text
                    style={[
                      styles.allergyText,
                      selected && styles.allergyTextSelected,
                    ]}
                  >
                    {allergy.name}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>

          {/* Custom allergies input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Type your specific allergies here..."
              placeholderTextColor="#999"
              value={customText}
              onChangeText={setCustomText}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Back"
            onPress={handleBack}
            variant="secondary"
            style={styles.backButton}
          />
          <CustomButton
            title="Next"
            onPress={handleSubmit}
            style={styles.submitButton}
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
  },
  header: {
    marginTop: 30,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E5D32',
    lineHeight: 28,
  },
  allergiesContainer: {
    marginBottom: 20,
  },
  predefinedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  allergyTag: {
    backgroundColor: '#E8F5E8',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  allergyTagSelected: {
    backgroundColor: '#4A5D6A',
    borderColor: '#2E5D32',
  },
  allergyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E5D32',
  },
  allergyTextSelected: {
    color: '#FFFFFF',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  textInput: {
    fontSize: 16,
    color: '#2E5D32',
    minHeight: 120,
    textAlignVertical: 'top',
    lineHeight: 24,
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
  submitButton: {
    flex: 2,
  },
})

export default AllergiesScreen
