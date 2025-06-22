import { describe, it, expect, beforeEach } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import onboardingSlice, {
  setCurrentStep,
  nextStep,
  prevStep,
  setHealthConcerns,
  setPrioritizedConcerns,
  setSelectedDiets,
  setDailyExposure,
  setSmoke,
  setAlcohol,
  setAllergies,
  setCustomAllergies,
  resetOnboarding,
  formatOnboardingData,
} from '../onboardingSlice'
import { OnboardingState, HealthConcern, Diet, Allergy } from '@/types'
import { ALCOHOL_OPTIONS } from '@/constants'

type RootState = {
  onboarding: OnboardingState
}

describe('onboardingSlice', () => {
  let store: ReturnType<typeof configureStore>

  const getState = () => (store.getState() as RootState).onboarding

  beforeEach(() => {
    store = configureStore({
      reducer: {
        onboarding: onboardingSlice,
      },
    })
  })

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = getState()
      expect(state).toEqual({
        currentStep: 0,
        totalSteps: 4,
        healthConcerns: [],
        prioritizedConcerns: [],
        selectedDiets: [],
        isDailyExposure: null,
        isSmoke: null,
        alcohol: null,
        allergies: [],
        customAllergies: '',
        isLoading: false,
        error: null,
        isCompleted: false,
      })
    })
  })

  describe('step navigation', () => {
    it.each([
      { description: 'set step to 0', step: 0, expected: 0 },
      { description: 'set step to 1', step: 1, expected: 1 },
      { description: 'set step to 2', step: 2, expected: 2 },
      { description: 'set step to 3', step: 3, expected: 3 },
      { description: 'set step to max (4)', step: 4, expected: 4 },
    ])('should $description', ({ step, expected }) => {
      store.dispatch(setCurrentStep(step))
      const state = getState()
      expect(state.currentStep).toBe(expected)
    })

    it.each([
      { description: 'move from step 0 to 1', initialStep: 0, expectedStep: 1 },
      { description: 'move from step 1 to 2', initialStep: 1, expectedStep: 2 },
      { description: 'move from step 2 to 3', initialStep: 2, expectedStep: 3 },
      { description: 'stay at max step (3)', initialStep: 3, expectedStep: 3 },
    ])('should $description with nextStep', ({ initialStep, expectedStep }) => {
      store.dispatch(setCurrentStep(initialStep))
      store.dispatch(nextStep())
      const state = getState()
      expect(state.currentStep).toBe(expectedStep)
    })

    it.each([
      { description: 'stay at step 0', initialStep: 0, expectedStep: 0 },
      { description: 'move from step 1 to 0', initialStep: 1, expectedStep: 0 },
      { description: 'move from step 2 to 1', initialStep: 2, expectedStep: 1 },
      { description: 'move from step 3 to 2', initialStep: 3, expectedStep: 2 },
    ])('should $description with prevStep', ({ initialStep, expectedStep }) => {
      store.dispatch(setCurrentStep(initialStep))
      store.dispatch(prevStep())
      const state = getState()
      expect(state.currentStep).toBe(expectedStep)
    })
  })

  describe('health concerns', () => {
    const mockHealthConcerns = [
      { id: 1, name: 'Energy & Fatigue' },
      { id: 2, name: 'Immune Support' },
    ] as HealthConcern[]

    it.each([
      { description: 'empty array', concerns: [], expectedLength: 0 },
      {
        description: 'single concern',
        concerns: [mockHealthConcerns[0]],
        expectedLength: 1,
      },
      {
        description: 'multiple concerns',
        concerns: mockHealthConcerns,
        expectedLength: 2,
      },
    ])(
      'should set health concerns with $description',
      ({ concerns, expectedLength }) => {
        store.dispatch(setHealthConcerns(concerns))
        const state = getState()
        expect(state.healthConcerns).toHaveLength(expectedLength)
        expect(state.healthConcerns).toEqual(concerns)
      },
    )

    it.each([
      {
        description: 'empty prioritized concerns',
        concerns: [],
        expectedLength: 0,
      },
      {
        description: 'single prioritized concern',
        concerns: [mockHealthConcerns[0]],
        expectedLength: 1,
      },
      {
        description: 'multiple prioritized concerns',
        concerns: mockHealthConcerns,
        expectedLength: 2,
      },
    ])('should set $description', ({ concerns, expectedLength }) => {
      store.dispatch(setPrioritizedConcerns(concerns))
      const state = getState()
      expect(state.prioritizedConcerns).toHaveLength(expectedLength)
      expect(state.prioritizedConcerns).toEqual(concerns)
    })
  })

  describe('diets', () => {
    const mockDiets: Diet[] = [
      { id: 1, name: 'Vegetarian', tool_tip: '' },
      { id: 2, name: 'Vegan', tool_tip: '' },
    ]

    it.each([
      { description: 'empty diets', diets: [], expectedLength: 0 },
      { description: 'single diet', diets: [mockDiets[0]], expectedLength: 1 },
      { description: 'multiple diets', diets: mockDiets, expectedLength: 2 },
    ])('should set $description', ({ diets, expectedLength }) => {
      store.dispatch(setSelectedDiets(diets))
      const state = getState()
      expect(state.selectedDiets).toHaveLength(expectedLength)
      expect(state.selectedDiets).toEqual(diets)
    })
  })

  describe('lifestyle questions', () => {
    it.each([
      { description: 'daily exposure to true', value: true, expected: true },
      { description: 'daily exposure to false', value: false, expected: false },
    ])('should set $description', ({ value, expected }) => {
      store.dispatch(setDailyExposure(value))
      const state = getState()
      expect(state.isDailyExposure).toBe(expected)
    })

    it.each([
      { description: 'smoking to true', value: true, expected: true },
      { description: 'smoking to false', value: false, expected: false },
    ])('should set $description', ({ value, expected }) => {
      store.dispatch(setSmoke(value))
      const state = getState()
      expect(state.isSmoke).toBe(expected)
    })

    it.each([
      {
        description: 'low alcohol consumption',
        value: ALCOHOL_OPTIONS.LOW,
        expected: ALCOHOL_OPTIONS.LOW,
      },
      {
        description: 'medium alcohol consumption',
        value: ALCOHOL_OPTIONS.MEDIUM,
        expected: ALCOHOL_OPTIONS.MEDIUM,
      },
      {
        description: 'high alcohol consumption',
        value: ALCOHOL_OPTIONS.HIGH,
        expected: ALCOHOL_OPTIONS.HIGH,
      },
    ])('should set $description', ({ value, expected }) => {
      store.dispatch(setAlcohol(value))
      const state = getState()
      expect(state.alcohol).toBe(expected)
    })
  })

  describe('allergies', () => {
    const mockAllergies: Allergy[] = [
      { id: 1, name: 'Nuts' },
      { id: 2, name: 'Dairy' },
    ]

    it.each([
      { description: 'empty allergies', allergies: [], expectedLength: 0 },
      {
        description: 'single allergy',
        allergies: [mockAllergies[0]],
        expectedLength: 1,
      },
      {
        description: 'multiple allergies',
        allergies: mockAllergies,
        expectedLength: 2,
      },
    ])('should set $description', ({ allergies, expectedLength }) => {
      store.dispatch(setAllergies(allergies))
      const state = getState()
      expect(state.allergies).toHaveLength(expectedLength)
      expect(state.allergies).toEqual(allergies)
    })

    it.each([
      { description: 'empty custom allergies', value: '', expected: '' },
      {
        description: 'single custom allergy',
        value: 'Shellfish',
        expected: 'Shellfish',
      },
      {
        description: 'multiple custom allergies',
        value: 'Shellfish, Eggs',
        expected: 'Shellfish, Eggs',
      },
    ])('should set $description', ({ value, expected }) => {
      store.dispatch(setCustomAllergies(value))
      const state = getState()
      expect(state.customAllergies).toBe(expected)
    })
  })

  describe('reset functionality', () => {
    it('should reset all state to initial values', () => {
      // Set some values first
      store.dispatch(setCurrentStep(2))
      store.dispatch(setHealthConcerns([{ id: 1, name: 'Test' }]))
      store.dispatch(setDailyExposure(true))
      store.dispatch(setSmoke(false))
      store.dispatch(setAlcohol(ALCOHOL_OPTIONS.HIGH))

      // Reset
      store.dispatch(resetOnboarding())

      const state = getState()
      expect(state).toEqual({
        currentStep: 0,
        totalSteps: 4,
        healthConcerns: [],
        prioritizedConcerns: [],
        selectedDiets: [],
        isDailyExposure: null,
        isSmoke: null,
        alcohol: null,
        allergies: [],
        customAllergies: '',
        isLoading: false,
        error: null,
        isCompleted: false,
      })
    })
  })

  describe('formatOnboardingData', () => {
    it.each([
      {
        description: 'format complete onboarding data',
        state: {
          prioritizedConcerns: [
            { id: 1, name: 'Energy' },
            { id: 2, name: 'Immune' },
          ],
          selectedDiets: [{ id: 1, name: 'Vegetarian', tool_tip: '' }],
          isDailyExposure: true,
          isSmoke: false,
          alcohol: ALCOHOL_OPTIONS.LOW,
          allergies: [{ id: 1, name: 'Nuts' }],
          customAllergies: 'Shellfish',
        } as any,
        expectedHealthConcerns: 2,
        expectedDiets: 1,
        expectedAllergies: 1,
      },
      {
        description: 'format minimal onboarding data',
        state: {
          currentStep: 0,
          totalSteps: 4,
          healthConcerns: [],
          prioritizedConcerns: [],
          selectedDiets: [],
          isDailyExposure: false,
          isSmoke: true,
          alcohol: ALCOHOL_OPTIONS.HIGH,
          allergies: [],
          customAllergies: '',
          isLoading: false,
          error: null,
          isCompleted: false,
        } as OnboardingState,
        expectedHealthConcerns: 0,
        expectedDiets: 0,
        expectedAllergies: 0,
      },
    ])(
      'should $description',
      ({ state, expectedHealthConcerns, expectedDiets, expectedAllergies }) => {
        const formatted = formatOnboardingData(state)

        expect(formatted.health_concerns).toHaveLength(expectedHealthConcerns)
        expect(formatted.diets).toHaveLength(expectedDiets)
        expect(formatted.allergies).toHaveLength(expectedAllergies)
        expect(formatted.is_daily_exposure).toBe(state.isDailyExposure)
        expect(formatted.is_smoke).toBe(state.isSmoke)
        expect(formatted.alcohol).toBe(state.alcohol)
        expect(formatted.custom_allergies).toBe(state.customAllergies)
        expect(formatted.timestamp).toBeDefined()

        // Check priority assignment
        formatted.health_concerns.forEach((concern, index) => {
          expect(concern.priority).toBe(index + 1)
        })
      },
    )
  })
})
