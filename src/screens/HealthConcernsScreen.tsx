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
import { StackNavigationProp } from '@react-navigation/stack'
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
import { RootStackParamList } from '../navigation/AppNavigator'
import { RootState, AppDispatch } from '../store'
import { HealthConcern } from '../types'
import healthConcernsData from '../data/healthconcerns.json'

interface HealthConcernsScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'HealthConcerns'>
}

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
        if (prev.length >= 5) {
          Alert.alert(
            'Maximum Selection',
            'You can select up to 5 health concerns.',
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
        delayLongPress={150}
        activeOpacity={0.8}
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
        'Selection Required',
        'Please select at least one health concern.',
      )
      return
    }

    dispatch(setHealthConcerns(selectedConcerns))
    dispatch(setPrioritizedConcerns(prioritizedData))
    dispatch(nextStep())
    navigation.navigate('Diets')
  }

  const handleBack = (): void => {
    dispatch(prevStep())
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Health Concerns Selection Section */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Select the top health concerns.{' '}
            <Text style={styles.asterisk}>*</Text>
          </Text>
          <Text style={styles.subtitle}>(up to 5)</Text>
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
            <Text style={styles.prioritizeTitle}>Prioritize</Text>

            <GestureHandlerRootView style={styles.priorityList}>
              <DraggableFlatList
                data={prioritizedData}
                onDragEnd={({ data: newData }) => setPrioritizedData(newData)}
                keyExtractor={(item: HealthConcern) => item.id.toString()}
                renderItem={renderPriorityItem}
                scrollEnabled={false}
                activationDistance={10}
                dragItemOverflow={true}
              />
            </GestureHandlerRootView>
          </View>
        )}
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
      </ScrollView>
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
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  concernsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 30,
  },
  concernItem: {
    backgroundColor: '#E8F5E8',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    minHeight: 40,
    justifyContent: 'center',
  },
  concernItemSelected: {
    backgroundColor: '#4A5D6A',
    borderColor: '#2E5D32',
  },
  concernText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2E5D32',
    textAlign: 'center',
  },
  concernTextSelected: {
    color: '#FFFFFF',
  },
  prioritizeSection: {
    marginBottom: 10,
  },
  prioritizeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5D32',
    marginBottom: 16,
  },
  priorityList: {
    minHeight: 200,
  },
  priorityItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  priorityItemActive: {
    backgroundColor: '#F5F5F5',
    transform: [{ scale: 1.02 }],
    borderColor: '#2E5D32',
  },
  priorityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  priorityContainer: {
    backgroundColor: '#4A5D6A',
    borderColor: 'transparent',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  dragHandle: {
    marginLeft: 12,
    paddingVertical: 2,
  },
  dragLine: {
    width: 16,
    height: 2,
    backgroundColor: '#999999',
    marginBottom: 2,
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

export default HealthConcernsScreen
