import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import CustomButton from '../components/CustomButton'
import ProgressBar from '../components/ProgressBar'
import {
  setHealthConcerns,
  setPrioritizedConcerns,
  nextStep,
  prevStep,
} from '../store/slices/onboardingSlice'
import { BaseNavigationProps, HealthConcern } from '../types'
import { RootState, AppDispatch } from '../store'
import {
  COLORS,
  DIMENSIONS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SCREEN_NAMES,
  ANIMATION,
  LIMITS,
  MESSAGES,
} from '../constants'
import { commonStyles, textStyles, shadows } from '../constants'
import healthConcernsData from '../data/healthconcerns.json'

type HealthConcernsScreenProps = BaseNavigationProps<'HealthConcerns'>

const HealthConcernsScreen: React.FC<HealthConcernsScreenProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const { currentStep, totalSteps, healthConcerns } = useSelector(
    (state: RootState) => state.onboarding,
  )
  const [selectedConcerns, setSelectedConcerns] =
    useState<HealthConcern[]>(healthConcerns)
  const [prioritizedData, setPrioritizedData] = useState<HealthConcern[]>([])

  // Update prioritized data when selected concerns change
  useEffect(() => {
    setPrioritizedData([...selectedConcerns])
  }, [selectedConcerns])

  const handleConcernToggle = (concern: HealthConcern): void => {
    setSelectedConcerns((prev) => {
      const isSelected = prev.some((item) => item.id === concern.id)
      if (isSelected) {
        return prev.filter((item) => item.id !== concern.id)
      } else {
        if (prev.length >= LIMITS.MAX_HEALTH_CONCERNS) {
          Alert.alert(
            MESSAGES.MAX_SELECTION,
            MESSAGES.MAX_HEALTH_CONCERNS_MESSAGE,
          )
          return prev
        }
        return [...prev, concern]
      }
    })
  }

  const renderPriorityItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<HealthConcern>) => {
    return (
      <TouchableOpacity
        style={[styles.priorityItem, isActive && styles.priorityItemActive]}
        onLongPress={drag}
        delayLongPress={ANIMATION.LONG_PRESS_DELAY}
        activeOpacity={ANIMATION.ACTIVE_OPACITY}
      >
        <View style={styles.priorityContent}>
          <View style={styles.priorityContainer}>
            <Text style={styles.priorityText}>{item.name}</Text>
          </View>
          <View style={styles.dragHandle}>
            <View style={styles.dragLine} />
            <View style={styles.dragLine} />
            <View style={styles.dragLine} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const handleNext = (): void => {
    if (selectedConcerns.length === 0) {
      Alert.alert(
        MESSAGES.SELECTION_REQUIRED,
        MESSAGES.MIN_HEALTH_CONCERNS_MESSAGE,
      )
      return
    }

    dispatch(setHealthConcerns(selectedConcerns))
    dispatch(setPrioritizedConcerns(prioritizedData))
    dispatch(nextStep())
    navigation.navigate(SCREEN_NAMES.DIETS)
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

      <ScrollView
        style={commonStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Health Concerns Selection Section */}
        <View style={styles.header}>
          <Text style={textStyles.title}>
            Select the top health concerns.{' '}
            <Text style={textStyles.asterisk}>*</Text>
          </Text>
          <Text style={textStyles.title}>
            (up to {LIMITS.MAX_HEALTH_CONCERNS})
          </Text>
        </View>

        <View style={styles.concernsGrid}>
          {healthConcernsData.data.map((concern: HealthConcern) => {
            const isSelected = selectedConcerns.some(
              (item) => item.id === concern.id,
            )

            return (
              <TouchableOpacity
                key={concern.id}
                style={[
                  styles.concernItem,
                  isSelected && styles.concernItemSelected,
                ]}
                onPress={() => handleConcernToggle(concern)}
                testID={`concern-${concern.id}`}
              >
                <Text
                  style={[
                    styles.concernText,
                    isSelected && styles.concernTextSelected,
                  ]}
                >
                  {concern.name}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Prioritize Section */}
        {selectedConcerns.length > 0 && (
          <View style={styles.prioritizeSection}>
            <Text style={textStyles.sectionTitle}>Prioritize</Text>

            <GestureHandlerRootView style={styles.priorityList}>
              <DraggableFlatList
                data={prioritizedData}
                onDragEnd={({ data: newData }) => setPrioritizedData(newData)}
                keyExtractor={(item: HealthConcern) => item.id.toString()}
                renderItem={renderPriorityItem}
                scrollEnabled={false}
                activationDistance={ANIMATION.ACTIVATION_DISTANCE}
                dragItemOverflow={true}
              />
            </GestureHandlerRootView>
          </View>
        )}

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
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: DIMENSIONS.SPACING_XXXL,
    marginBottom: DIMENSIONS.SPACING_XXXL,
    paddingHorizontal: DIMENSIONS.SPACING_XXL,
  },
  concernsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DIMENSIONS.SPACING_SM,
    paddingHorizontal: DIMENSIONS.SPACING_XXL,
    marginBottom: DIMENSIONS.SPACING_XXXL,
  },
  concernItem: {
    backgroundColor: COLORS.SUCCESS_LIGHT,
    paddingVertical: DIMENSIONS.SPACING_MD,
    paddingHorizontal: DIMENSIONS.SPACING_LG,
    borderRadius: DIMENSIONS.BORDER_RADIUS_LARGE,
    marginBottom: DIMENSIONS.SPACING_SM,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    minHeight: DIMENSIONS.SPACING_SECTION,
    justifyContent: 'center',
  },
  concernItemSelected: {
    backgroundColor: '#4A5D6A',
    borderColor: COLORS.SECONDARY,
  },
  concernText: {
    fontSize: FONT_SIZES.SMALL + 1, // 13px
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    color: COLORS.SECONDARY,
    textAlign: 'center',
  },
  concernTextSelected: {
    color: COLORS.WHITE,
  },
  prioritizeSection: {
    marginBottom: DIMENSIONS.SPACING_MD,
    paddingHorizontal: DIMENSIONS.SPACING_XXL,
  },
  priorityList: {
    minHeight: 200,
  },
  priorityItem: {
    backgroundColor: COLORS.WHITE,
    borderRadius: DIMENSIONS.BORDER_RADIUS_MEDIUM,
    marginBottom: DIMENSIONS.SPACING_SM,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
    ...shadows.small,
  },
  priorityItemActive: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    transform: [{ scale: 1.02 }],
    borderColor: COLORS.SECONDARY,
  },
  priorityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DIMENSIONS.SPACING_MD,
    paddingHorizontal: DIMENSIONS.SPACING_MD,
    justifyContent: 'space-between',
  },
  priorityContainer: {
    backgroundColor: '#4A5D6A',
    borderColor: 'transparent',
    paddingVertical: DIMENSIONS.SPACING_XS + 1, // 5px
    paddingHorizontal: DIMENSIONS.SPACING_MD,
    borderRadius: DIMENSIONS.BORDER_RADIUS_LARGE,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityText: {
    flex: 1,
    fontSize: FONT_SIZES.MEDIUM - 1, // 15px
    fontWeight: FONT_WEIGHTS.MEDIUM,
    color: COLORS.WHITE,
  },
  dragHandle: {
    marginLeft: DIMENSIONS.SPACING_MD,
    paddingVertical: DIMENSIONS.SPACING_XS,
  },
  dragLine: {
    width: DIMENSIONS.SPACING_LG,
    height: 2,
    backgroundColor: COLORS.GRAY_DARK,
    marginBottom: DIMENSIONS.SPACING_XS,
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

export default HealthConcernsScreen
