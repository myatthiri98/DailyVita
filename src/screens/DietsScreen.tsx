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
import CustomButton from '../components/CustomButton'
import ProgressBar from '../components/ProgressBar'
import {
  setSelectedDiets,
  nextStep,
  prevStep,
} from '../store/slices/onboardingSlice'
import { RootState, AppDispatch } from '../store'
import { BaseNavigationProps, Diet } from '../types'
import {
  COLORS,
  DIMENSIONS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SCREEN_NAMES,
  commonStyles,
  textStyles,
  shadows,
} from '../constants'
import dietsData from '../data/diets.json'

type DietsScreenProps = BaseNavigationProps<'Diets'>

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
    navigation.navigate(SCREEN_NAMES.ALLERGIES)
  }

  const handleBack = (): void => {
    dispatch(prevStep())
    navigation.goBack()
  }

  const noneSelected = localSelectedDiets.length === 0

  return (
    <SafeAreaView
      style={commonStyles.safeAreaContainer}
      edges={['top', 'left', 'right']}
    >
      <ScrollView
        style={commonStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={textStyles.title}>
            Select the diets you follow.{' '}
            <Text style={textStyles.asterisk}>*</Text>
          </Text>
        </View>

        <View style={styles.dietsContainer}>
          {/* None Option */}
          <TouchableOpacity
            style={[styles.dietItem, noneSelected && styles.dietItemSelected]}
            onPress={() => handleDietToggle({ name: 'None' })}
            testID="diet-none"
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
                    testID={`diet-${diet.id}`}
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
                            testID={`info-${diet.id}`}
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
        <View style={commonStyles.buttonContainer}>
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
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: DIMENSIONS.SPACING_SM,
    marginBottom: DIMENSIONS.SPACING_SM,
    paddingHorizontal: DIMENSIONS.SPACING_XXL,
  },
  dietsContainer: {
    marginBottom: DIMENSIONS.SPACING_XL,
    paddingHorizontal: DIMENSIONS.SPACING_XXL,
  },
  dietWrapper: {
    marginBottom: DIMENSIONS.SPACING_LG,
    position: 'relative',
  },
  dietRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dietItem: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingVertical: DIMENSIONS.SPACING_LG,
    paddingHorizontal: 0,
    alignItems: 'center',
    flex: 1,
  },
  dietItemSelected: {
    backgroundColor: 'transparent',
  },
  checkbox: {
    width: DIMENSIONS.SPACING_XXL,
    height: DIMENSIONS.SPACING_XXL,
    borderRadius: DIMENSIONS.SPACING_XS,
    borderWidth: 2,
    borderColor: COLORS.GRAY_DISABLED,
    marginRight: DIMENSIONS.SPACING_LG,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkboxSelected: {
    backgroundColor: COLORS.SECONDARY,
    borderColor: COLORS.SECONDARY,
  },
  checkmark: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHTS.BOLD,
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
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    color: COLORS.SECONDARY,
    marginRight: DIMENSIONS.SPACING_SM,
  },
  dietTextSelected: {
    color: COLORS.SECONDARY,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
  },
  infoIcon: {
    width: DIMENSIONS.SPACING_XL,
    height: DIMENSIONS.SPACING_XL,
    borderRadius: DIMENSIONS.SPACING_XL / 2,
    backgroundColor: COLORS.ACCENT_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: FONT_SIZES.SMALL,
    color: COLORS.SECONDARY,
    fontWeight: FONT_WEIGHTS.BOLD,
  },
  tooltip: {
    backgroundColor: COLORS.WHITE,
    borderRadius: DIMENSIONS.BORDER_RADIUS_MEDIUM,
    padding: DIMENSIONS.SPACING_MD,
    marginLeft: DIMENSIONS.SPACING_MD,
    flex: 1,
    maxWidth: 200,
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
    ...shadows.medium,
  },
  tooltipText: {
    fontSize: FONT_SIZES.SMALL,
    color: COLORS.GRAY_DISABLED,
    lineHeight: DIMENSIONS.SPACING_LG,
  },
  footer: {
    padding: DIMENSIONS.SPACING_XXL,
    backgroundColor: COLORS.SECONDARY_LIGHT,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 1,
  },
})

export default DietsScreen
