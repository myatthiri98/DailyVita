import React, { useState, useMemo } from 'react'
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
import CustomButton from '@/components/CustomButton'
import ProgressBar from '@/components/ProgressBar'
import {
  setAllergies,
  setCustomAllergies,
  prevStep,
  nextStep,
} from '@/store/slices/onboardingSlice'
import { RootState, AppDispatch } from '@/store'
import { BaseNavigationProps, Allergy } from '@/types'
import {
  COLORS,
  DIMENSIONS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SCREEN_NAMES,
  commonStyles,
  textStyles,
  shadows,
} from '@/constants'
import allergiesData from '@/data/allergies.json'

type AllergiesScreenProps = BaseNavigationProps<'Allergies'>

const AllergiesScreen: React.FC<AllergiesScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { currentStep, totalSteps, allergies, customAllergies } = useSelector(
    (state: RootState) => state.onboarding,
  )

  const [selectedAllergies, setSelectedAllergies] =
    useState<Allergy[]>(allergies)
  const [inputText, setInputText] = useState<string>('')
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)

  // Create a combined list of predefined allergies and any custom ones
  const allAvailableAllergies = useMemo(() => {
    const customAllergyList = customAllergies
      .split(',')
      .map((item, index) => ({
        id: `custom_${index}`,
        name: item.trim(),
      }))
      .filter((item) => item.name.length > 0)

    return [...allergiesData.data, ...customAllergyList]
  }, [customAllergies])

  // Filter suggestions based on input text
  const filteredSuggestions = useMemo(() => {
    if (!inputText.trim()) return []

    return allAvailableAllergies.filter(
      (allergy) =>
        allergy.name.toLowerCase().includes(inputText.toLowerCase()) &&
        !selectedAllergies.some((selected) => selected.id === allergy.id),
    )
  }, [inputText, allAvailableAllergies, selectedAllergies])

  const handleAllergySelect = (allergy: Allergy): void => {
    setSelectedAllergies((prev) => [...prev, allergy])
    setInputText('')
    setShowSuggestions(false)
  }

  const handleAllergyRemove = (allergyId: string | number): void => {
    setSelectedAllergies((prev) =>
      prev.filter((allergy) => allergy.id !== allergyId),
    )
  }

  const handleInputChange = (text: string): void => {
    setInputText(text)
    setShowSuggestions(text.trim().length > 0)
  }

  const handleAddCustomAllergy = (): void => {
    const trimmedText = inputText.trim()
    if (trimmedText.length === 0) return

    // Check if it already exists
    const exists = allAvailableAllergies.some(
      (allergy) => allergy.name.toLowerCase() === trimmedText.toLowerCase(),
    )

    if (!exists) {
      const newAllergy: Allergy = {
        id: `custom_${Date.now()}`,
        name: trimmedText,
      }
      handleAllergySelect(newAllergy)
    }
  }

  const handleSubmit = (): void => {
    // Separate predefined and custom allergies
    const predefinedAllergies = selectedAllergies.filter(
      (allergy) => !allergy.id.toString().startsWith('custom_'),
    )
    const customAllergyNames = selectedAllergies
      .filter((allergy) => allergy.id.toString().startsWith('custom_'))
      .map((allergy) => allergy.name)

    dispatch(setAllergies(predefinedAllergies))
    dispatch(setCustomAllergies(customAllergyNames.join(', ')))
    dispatch(nextStep())
    navigation.navigate(SCREEN_NAMES.LIFESTYLE)
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
      <ScrollView style={commonStyles.scrollContent}>
        <View style={styles.header}>
          <Text style={textStyles.title}>
            Write any specific allergies or sensitivity towards specific
            things.(optional)
          </Text>
        </View>

        <View style={styles.allergiesContainer}>
          {/* Selected allergies display */}
          {selectedAllergies.length > 0 && (
            <View style={styles.selectedContainer}>
              {selectedAllergies.map((allergy) => (
                <TouchableOpacity
                  key={allergy.id}
                  style={styles.selectedTag}
                  onPress={() => handleAllergyRemove(allergy.id)}
                  testID={`selected-allergy-${allergy.id}`}
                >
                  <Text style={styles.selectedTagText}>{allergy.name}</Text>
                  <Text style={styles.removeIcon}>×</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Input container */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Type allergies here..."
              placeholderTextColor={COLORS.GRAY_DARK}
              value={inputText}
              onChangeText={handleInputChange}
              onSubmitEditing={handleAddCustomAllergy}
              returnKeyType="done"
              testID="allergy-input"
            />

            {/* Suggestions list */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <View style={styles.suggestionsContainer}>
                <ScrollView
                  style={styles.suggestionsList}
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled={true}
                  testID="suggestions-list"
                >
                  {filteredSuggestions.map((item) => (
                    <TouchableOpacity
                      key={item.id.toString()}
                      style={styles.suggestionItem}
                      onPress={() => handleAllergySelect(item)}
                      testID={`suggestion-${item.id}`}
                    >
                      <Text style={styles.suggestionText}>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
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
            onPress={handleSubmit}
            style={styles.submitButton}
          />
        </View>
      </View>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: DIMENSIONS.SPACING_XXXL,
    marginBottom: DIMENSIONS.SPACING_XXXL,
    paddingHorizontal: DIMENSIONS.SPACING_XXL,
  },
  allergiesContainer: {
    marginBottom: DIMENSIONS.SPACING_XL,
    paddingHorizontal: DIMENSIONS.SPACING_XXL,
  },
  selectedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DIMENSIONS.SPACING_SM,
    marginBottom: DIMENSIONS.SPACING_LG,
  },
  selectedTag: {
    backgroundColor: '#4A5D6A',
    paddingVertical: DIMENSIONS.SPACING_SM,
    paddingHorizontal: DIMENSIONS.SPACING_MD,
    borderRadius: DIMENSIONS.BORDER_RADIUS_BUTTON,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.SECONDARY,
  },
  selectedTagText: {
    fontSize: FONT_SIZES.MEDIUM - 2, // 14px
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    color: COLORS.WHITE,
    marginRight: DIMENSIONS.SPACING_SM,
  },
  removeIcon: {
    fontSize: FONT_SIZES.LARGE,
    color: COLORS.WHITE,
    fontWeight: FONT_WEIGHTS.BOLD,
  },
  inputContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: DIMENSIONS.BORDER_RADIUS_LARGE,
    ...shadows.medium,
    position: 'relative',
  },
  textInput: {
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.SECONDARY,
    padding: DIMENSIONS.SPACING_LG,
    minHeight: DIMENSIONS.SPACING_SECTION + 10, // 50px
    textAlignVertical: 'top',
    lineHeight: FONT_SIZES.XL,
  },
  suggestionsContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.GRAY_LIGHT,
    maxHeight: 150,
  },
  suggestionsList: {
    flexGrow: 0,
  },
  suggestionItem: {
    paddingVertical: DIMENSIONS.SPACING_MD,
    paddingHorizontal: DIMENSIONS.SPACING_LG,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
  },
  suggestionText: {
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.SECONDARY,
    fontWeight: FONT_WEIGHTS.MEDIUM,
  },
  footer: {
    padding: DIMENSIONS.SPACING_XXL,
    backgroundColor: COLORS.SECONDARY_LIGHT,
  },
  backButton: {
    flex: 1,
  },
  submitButton: {
    flex: 2,
  },
})

export default AllergiesScreen
