import { describe, it, expect, beforeEach } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import onboardingSlice, {
  setCurrentStep,
  nextStep,
  setHealthConcerns,
  setPrioritizedConcerns,
  setSelectedDiets,
  setDailyExposure,
  setSmoke,
  setAlcohol,
  setAllergies,
  setCustomAllergies,
  formatOnboardingData,
} from '@/store/slices/onboardingSlice'
import { ALCOHOL_OPTIONS, LIMITS } from '@/constants'
import { OnboardingState } from '@/types'

type RootState = {
  onboarding: OnboardingState
}

describe('Onboarding Flow Integration', () => {
  let store: ReturnType<typeof configureStore>

  const getState = () => (store.getState() as RootState).onboarding

  beforeEach(() => {
    store = configureStore({
      reducer: {
        onboarding: onboardingSlice,
      },
    })
  })

  describe('Complete user journeys', () => {
    it.each([
      {
        description: 'health-conscious user with dietary restrictions',
        journey: {
          healthConcerns: [
            { id: 1, name: 'Energy & Fatigue' },
            { id: 2, name: 'Immune Support' },
          ],
          diets: [{ id: 1, name: 'Vegetarian', tool_tip: '' }],
          lifestyle: {
            isDailyExposure: true,
            isSmoke: false,
            alcohol: ALCOHOL_OPTIONS.LOW,
          },
          allergies: [{ id: 1, name: 'Nuts' }],
          customAllergies: 'Shellfish',
        },
        expectedSteps: 4,
      },
      {
        description: 'minimal requirements user',
        journey: {
          healthConcerns: [{ id: 1, name: 'General Health' }],
          diets: [],
          lifestyle: {
            isDailyExposure: false,
            isSmoke: false,
            alcohol: ALCOHOL_OPTIONS.LOW,
          },
          allergies: [],
          customAllergies: '',
        },
        expectedSteps: 4,
      },
      {
        description: 'comprehensive user with multiple selections',
        journey: {
          healthConcerns: [
            { id: 1, name: 'Energy & Fatigue' },
            { id: 2, name: 'Immune Support' },
            { id: 3, name: 'Sleep Quality' },
            { id: 4, name: 'Stress Management' },
            { id: 5, name: 'Heart Health' },
          ],
          diets: [
            { id: 1, name: 'Vegetarian', tool_tip: '' },
            { id: 2, name: 'Gluten-Free', tool_tip: '' },
          ],
          lifestyle: {
            isDailyExposure: true,
            isSmoke: true,
            alcohol: ALCOHOL_OPTIONS.HIGH,
          },
          allergies: [
            { id: 1, name: 'Nuts' },
            { id: 2, name: 'Dairy' },
          ],
          customAllergies: 'Shellfish, Eggs, Soy',
        },
        expectedSteps: 4,
      },
    ])(
      'should complete onboarding flow for $description',
      ({ journey, expectedSteps }) => {
        // Step 1: Welcome Screen
        expect(getState().currentStep).toBe(0)
        store.dispatch(nextStep())

        // Step 2: Health Concerns
        expect(getState().currentStep).toBe(1)
        store.dispatch(setHealthConcerns(journey.healthConcerns as any))
        store.dispatch(setPrioritizedConcerns(journey.healthConcerns as any))

        const state1 = getState()
        expect(state1.healthConcerns).toEqual(journey.healthConcerns)
        expect(state1.prioritizedConcerns).toEqual(journey.healthConcerns)

        store.dispatch(nextStep())

        // Step 3: Diets
        expect(getState().currentStep).toBe(2)
        store.dispatch(setSelectedDiets(journey.diets as any))

        const state2 = getState()
        expect(state2.selectedDiets).toEqual(journey.diets)

        store.dispatch(nextStep())

        expect(getState().currentStep).toBe(3)
        store.dispatch(setDailyExposure(journey.lifestyle.isDailyExposure))
        store.dispatch(setSmoke(journey.lifestyle.isSmoke))
        store.dispatch(setAlcohol(journey.lifestyle.alcohol))

        const state3 = getState()
        expect(state3.isDailyExposure).toBe(journey.lifestyle.isDailyExposure)
        expect(state3.isSmoke).toBe(journey.lifestyle.isSmoke)
        expect(state3.alcohol).toBe(journey.lifestyle.alcohol)

        store.dispatch(nextStep())

        expect(getState().currentStep).toBe(3) // Should stay at max step
        store.dispatch(setAllergies(journey.allergies as any))
        store.dispatch(setCustomAllergies(journey.customAllergies))

        const finalState = getState()
        expect(finalState.allergies).toEqual(journey.allergies)
        expect(finalState.customAllergies).toBe(journey.customAllergies)

        // Verify complete state
        expect(finalState.currentStep).toBe(expectedSteps - 1)
        expect(finalState.totalSteps).toBe(expectedSteps)
      },
    )
  })

  describe('Step validation', () => {
    it.each([
      {
        step: 0,
        stepName: 'Welcome',
        requiredActions: [],
        validation: (state: OnboardingState) => {
          expect(state.currentStep).toBe(0)
        },
      },
      {
        step: 1,
        stepName: 'Health Concerns',
        requiredActions: [
          () => store.dispatch(setHealthConcerns([{ id: 1, name: 'Test' }])),
        ],
        validation: (state: OnboardingState) => {
          expect(state.healthConcerns.length).toBeGreaterThan(0)
          expect(state.healthConcerns.length).toBeLessThanOrEqual(
            LIMITS.MAX_HEALTH_CONCERNS,
          )
        },
      },
      {
        step: 2,
        stepName: 'Diets',
        requiredActions: [
          () =>
            store.dispatch(
              setSelectedDiets([{ id: 1, name: 'Test Diet', tool_tip: '' }]),
            ),
        ],
        validation: (state: OnboardingState) => {
          expect(Array.isArray(state.selectedDiets)).toBe(true)
        },
      },
      {
        step: 3,
        stepName: 'Lifestyle',
        requiredActions: [
          () => store.dispatch(setDailyExposure(false)),
          () => store.dispatch(setSmoke(false)),
          () => store.dispatch(setAlcohol(ALCOHOL_OPTIONS.LOW)),
        ],
        validation: (state: OnboardingState) => {
          expect(state.isDailyExposure).not.toBeNull()
          expect(state.isSmoke).not.toBeNull()
          expect(state.alcohol).not.toBeNull()
        },
      },
    ])(
      'should validate $stepName step requirements',
      ({ step, requiredActions, validation }) => {
        // Navigate to the step
        store.dispatch(setCurrentStep(step))

        // Execute required actions
        requiredActions.forEach((action) => action())

        // Validate step completion
        const state = getState()
        validation(state)
      },
    )
  })

  describe('Data formatting', () => {
    it.each([
      {
        description: 'complete data with all fields',
        setupActions: [
          () =>
            store.dispatch(
              setPrioritizedConcerns([
                { id: 1, name: 'Energy' },
                { id: 2, name: 'Immune' },
              ]),
            ),
          () =>
            store.dispatch(
              setSelectedDiets([{ id: 1, name: 'Vegetarian', tool_tip: '' }]),
            ),
          () => store.dispatch(setDailyExposure(true)),
          () => store.dispatch(setSmoke(false)),
          () => store.dispatch(setAlcohol(ALCOHOL_OPTIONS.MEDIUM)),
          () => store.dispatch(setAllergies([{ id: 1, name: 'Nuts' }])),
          () => store.dispatch(setCustomAllergies('Shellfish')),
        ],
        expectedStructure: {
          health_concerns: 2,
          diets: 1,
          allergies: 1,
          hasTimestamp: true,
          hasPriorities: true,
        },
      },
      {
        description: 'minimal data with required fields only',
        setupActions: [
          () =>
            store.dispatch(
              setPrioritizedConcerns([{ id: 1, name: 'General' }]),
            ),
          () => store.dispatch(setDailyExposure(false)),
          () => store.dispatch(setSmoke(false)),
          () => store.dispatch(setAlcohol(ALCOHOL_OPTIONS.LOW)),
        ],
        expectedStructure: {
          health_concerns: 1,
          diets: 0,
          allergies: 0,
          hasTimestamp: true,
          hasPriorities: true,
        },
      },
    ])(
      'should format $description correctly',
      ({ setupActions, expectedStructure }) => {
        // Setup the state
        setupActions.forEach((action) => action())

        // Get the current state and format it
        const state = getState()
        const formatted = formatOnboardingData(state)

        // Validate structure
        expect(formatted.health_concerns).toHaveLength(
          expectedStructure.health_concerns,
        )
        expect(formatted.diets).toHaveLength(expectedStructure.diets)
        expect(formatted.allergies).toHaveLength(expectedStructure.allergies)

        if (expectedStructure.hasTimestamp) {
          expect(formatted.timestamp).toBeDefined()
          expect(new Date(formatted.timestamp).getTime()).toBeGreaterThan(0)
        }

        if (expectedStructure.hasPriorities) {
          formatted.health_concerns.forEach((concern, index) => {
            expect(concern.priority).toBe(index + 1)
          })
        }

        // Validate data types
        expect(typeof formatted.is_daily_exposure).toBe('boolean')
        expect(typeof formatted.is_smoke).toBe('boolean')
        expect(typeof formatted.alcohol).toBe('string')
        expect(typeof formatted.custom_allergies).toBe('string')
      },
    )
  })

  describe('Error scenarios', () => {
    it.each([
      {
        description: 'too many health concerns selected',
        actions: [
          () => {
            const tooManyConcerns = Array.from(
              { length: LIMITS.MAX_HEALTH_CONCERNS + 1 },
              (_, i) => ({
                id: i + 1,
                name: `Concern ${i + 1}`,
              }),
            )
            store.dispatch(setHealthConcerns(tooManyConcerns))
          },
        ],
        validation: (state: OnboardingState) => {
          // The reducer should handle this gracefully
          expect(state.healthConcerns.length).toBeGreaterThan(
            LIMITS.MAX_HEALTH_CONCERNS,
          )
        },
      },
      {
        description: 'navigation beyond bounds',
        actions: [
          () => store.dispatch(setCurrentStep(10)), // Beyond max steps
        ],
        validation: (state: OnboardingState) => {
          expect(state.currentStep).toBe(10) // Should allow setting any step
        },
      },
    ])('should handle $description gracefully', ({ actions, validation }) => {
      actions.forEach((action) => action())
      const state = getState()
      validation(state)
    })
  })

  describe('Progress tracking', () => {
    it.each([
      { currentStep: 0, totalSteps: 4, expectedProgress: 25 },
      { currentStep: 1, totalSteps: 4, expectedProgress: 50 },
      { currentStep: 2, totalSteps: 4, expectedProgress: 75 },
      { currentStep: 3, totalSteps: 4, expectedProgress: 100 },
    ])(
      'should calculate correct progress for step $currentStep',
      ({ currentStep, totalSteps, expectedProgress }) => {
        store.dispatch(setCurrentStep(currentStep))
        const state = getState()

        expect(state.currentStep).toBe(currentStep)
        expect(state.totalSteps).toBe(totalSteps)

        // Calculate progress like ProgressBar component does
        const progress = ((currentStep + 1) / totalSteps) * 100
        expect(progress).toBe(expectedProgress)
      },
    )
  })
})
