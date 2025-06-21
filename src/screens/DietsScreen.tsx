import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack'
import CustomButton from '../components/CustomButton'
import ProgressBar from '../components/ProgressBar'
import {
  setSelectedDiets,
  nextStep,
  prevStep,
} from '../store/slices/onboardingSlice'
import { RootStackParamList } from '../navigation/AppNavigator'
import { RootState, AppDispatch } from '../store'
import { Diet } from '../types'
import dietsData from '../data/diets.json'

interface DietsScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Diets'>
}

const DietsScreen: React.FC<DietsScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { currentStep, totalSteps, selectedDiets } = useSelector(
    (state: RootState) => state.onboarding,
  )
  const [localSelectedDiets, setLocalSelectedDiets] =
    useState<Diet[]>(selectedDiets)
  const [showTooltip, setShowTooltip] = useState<number | null>(null)

  const handleDietToggle = (diet: Diet | { name: string }): void => {
    if (diet.name === 'None') {
      setLocalSelectedDiets([])
      return
    }

    const dietItem = diet as Diet
    setLocalSelectedDiets((prev) => {
      const isSelected = prev.some((item) => item.id === dietItem.id)
      if (isSelected) {
        return prev.filter((item) => item.id !== dietItem.id)
      } else {
        return [...prev, dietItem]
      }
    })
  }

  const handleNext = (): void => {
    dispatch(setSelectedDiets(localSelectedDiets))
    dispatch(nextStep())
    navigation.navigate('Allergies')
  }

  const handleBack = (): void => {
    dispatch(prevStep())
    navigation.goBack()
  }

  const noneSelected = localSelectedDiets.length === 0

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Select the diets you follow. <Text style={styles.asterisk}>*</Text>
          </Text>
        </View>

        <View style={styles.dietsContainer}>
          {/* None Option */}
          <TouchableOpacity
            style={[styles.dietItem, noneSelected && styles.dietItemSelected]}
            onPress={() => handleDietToggle({ name: 'None' })}
          >
            <View
              style={[styles.checkbox, noneSelected && styles.checkboxSelected]}
            >
              {noneSelected && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <View style={styles.dietContent}>
              <Text
                style={[
                  styles.dietText,
                  noneSelected && styles.dietTextSelected,
                ]}
              >
                None
              </Text>
            </View>
          </TouchableOpacity>

          {/* Diet Options */}
          {dietsData.data.map((diet: Diet) => {
            const selected = localSelectedDiets.some(
              (item) => item.id === diet.id,
            )
            const isTooltipVisible = showTooltip === diet.id

            return (
              <View key={diet.id} style={styles.dietWrapper}>
                <View style={styles.dietRow}>
                  <TouchableOpacity
                    style={[
                      styles.dietItem,
                      selected && styles.dietItemSelected,
                    ]}
                    onPress={() => handleDietToggle(diet)}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        selected && styles.checkboxSelected,
                      ]}
                    >
                      {selected && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <View style={styles.dietContent}>
                      <View style={styles.dietHeader}>
                        <View style={styles.dietNameContainer}>
                          <Text
                            style={[
                              styles.dietText,
                              selected && styles.dietTextSelected,
                            ]}
                          >
                            {diet.name}
                          </Text>
                          <TouchableOpacity
                            style={styles.infoIcon}
                            onPress={() =>
                              setShowTooltip(isTooltipVisible ? null : diet.id)
                            }
                          >
                            <Text style={styles.infoText}>i</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>

                  {isTooltipVisible && (
                    <View style={styles.tooltip}>
                      <Text style={styles.tooltipText}>{diet.tool_tip}</Text>
                    </View>
                  )}
                </View>
              </View>
            )
          })}
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
  },
  header: {
    marginTop: 30,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E5D32',
    marginBottom: 8,
    lineHeight: 28,
  },
  asterisk: {
    color: '#FF6B47',
  },
  dietsContainer: {
    marginBottom: 20,
  },
  dietWrapper: {
    marginBottom: 16,
    position: 'relative',
  },
  dietRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dietItem: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 0,
    alignItems: 'center',
    flex: 1,
  },
  dietItemSelected: {
    backgroundColor: 'transparent',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#666666',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkboxSelected: {
    backgroundColor: '#2E5D32',
    borderColor: '#2E5D32',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dietContent: {
    flex: 1,
    justifyContent: 'center',
  },
  dietHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dietNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dietText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2E5D32',
    marginRight: 8,
  },
  dietTextSelected: {
    color: '#1B5E20',
    fontWeight: '600',
  },
  infoIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  tooltip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginLeft: 12,
    flex: 1,
    maxWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  tooltipText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
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

export default DietsScreen
