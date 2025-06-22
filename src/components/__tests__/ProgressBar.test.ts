import { describe, it, expect } from 'vitest'

describe('ProgressBar Logic', () => {
  const calculateProgress = (
    currentStep: number,
    totalSteps: number,
  ): number => {
    return ((currentStep + 1) / totalSteps) * 100
  }

  describe('progress calculation', () => {
    it.each([
      {
        description: 'step 0 of 4 (25%)',
        currentStep: 0,
        totalSteps: 4,
        expectedProgress: 25,
      },
      {
        description: 'step 1 of 4 (50%)',
        currentStep: 1,
        totalSteps: 4,
        expectedProgress: 50,
      },
      {
        description: 'step 2 of 4 (75%)',
        currentStep: 2,
        totalSteps: 4,
        expectedProgress: 75,
      },
      {
        description: 'step 3 of 4 (100%)',
        currentStep: 3,
        totalSteps: 4,
        expectedProgress: 100,
      },
      {
        description: 'step 0 of 5 (20%)',
        currentStep: 0,
        totalSteps: 5,
        expectedProgress: 20,
      },
      {
        description: 'step 2 of 5 (60%)',
        currentStep: 2,
        totalSteps: 5,
        expectedProgress: 60,
      },
      {
        description: 'step 4 of 5 (100%)',
        currentStep: 4,
        totalSteps: 5,
        expectedProgress: 100,
      },
    ])(
      'should calculate correct progress for $description',
      ({ currentStep, totalSteps, expectedProgress }) => {
        const progress = calculateProgress(currentStep, totalSteps)
        expect(progress).toBe(expectedProgress)
      },
    )
  })

  describe('edge cases', () => {
    it.each([
      {
        description: 'single step (100%)',
        currentStep: 0,
        totalSteps: 1,
        expectedProgress: 100,
      },
      {
        description: 'zero steps (Infinity)',
        currentStep: 0,
        totalSteps: 0,
        expectedProgress: Infinity,
      },
      {
        description: 'negative step',
        currentStep: -1,
        totalSteps: 4,
        expectedProgress: 0,
      },
      {
        description: 'step beyond total',
        currentStep: 5,
        totalSteps: 4,
        expectedProgress: 150,
      },
    ])(
      'should handle $description',
      ({ currentStep, totalSteps, expectedProgress }) => {
        const progress = calculateProgress(currentStep, totalSteps)
        expect(progress).toBe(expectedProgress)
      },
    )
  })

  describe('progress validation', () => {
    it.each([
      { currentStep: 0, totalSteps: 4, minProgress: 0, maxProgress: 100 },
      { currentStep: 1, totalSteps: 4, minProgress: 0, maxProgress: 100 },
      { currentStep: 2, totalSteps: 4, minProgress: 0, maxProgress: 100 },
      { currentStep: 3, totalSteps: 4, minProgress: 0, maxProgress: 100 },
    ])(
      'should return valid progress for currentStep=$currentStep, totalSteps=$totalSteps',
      ({ currentStep, totalSteps, minProgress, maxProgress }) => {
        const progress = calculateProgress(currentStep, totalSteps)
        expect(progress).toBeGreaterThanOrEqual(minProgress)
        expect(progress).toBeLessThanOrEqual(maxProgress)
        expect(typeof progress).toBe('number')
        expect(Number.isFinite(progress)).toBe(true)
      },
    )
  })

  describe('mathematical properties', () => {
    it.each([
      { totalSteps: 3 },
      { totalSteps: 4 },
      { totalSteps: 5 },
      { totalSteps: 10 },
    ])(
      'should have increasing progress values for totalSteps=$totalSteps',
      ({ totalSteps }) => {
        const progressValues = []
        for (let step = 0; step < totalSteps; step++) {
          progressValues.push(calculateProgress(step, totalSteps))
        }

        // Each progress value should be greater than the previous
        for (let i = 1; i < progressValues.length; i++) {
          expect(progressValues[i]).toBeGreaterThan(progressValues[i - 1])
        }

        // First step should always be > 0
        expect(progressValues[0]).toBeGreaterThan(0)

        // Last step should always be 100
        expect(progressValues[progressValues.length - 1]).toBe(100)
      },
    )
  })

  describe('step validation', () => {
    it.each([
      {
        description: 'valid step range',
        currentStep: 2,
        totalSteps: 5,
        isValid: true,
      },
      {
        description: 'first step',
        currentStep: 0,
        totalSteps: 5,
        isValid: true,
      },
      {
        description: 'last step',
        currentStep: 4,
        totalSteps: 5,
        isValid: true,
      },
      {
        description: 'negative step',
        currentStep: -1,
        totalSteps: 5,
        isValid: false,
      },
      {
        description: 'step beyond total',
        currentStep: 5,
        totalSteps: 5,
        isValid: false,
      },
    ])(
      'should validate $description correctly',
      ({ currentStep, totalSteps, isValid }) => {
        const isStepValid = currentStep >= 0 && currentStep < totalSteps
        expect(isStepValid).toBe(isValid)

        if (isValid) {
          const progress = calculateProgress(currentStep, totalSteps)
          expect(progress).toBeGreaterThan(0)
          expect(progress).toBeLessThanOrEqual(100)
        }
      },
    )
  })

  describe('percentage formatting', () => {
    it.each([
      { currentStep: 0, totalSteps: 4, expectedString: '25%' },
      { currentStep: 1, totalSteps: 4, expectedString: '50%' },
      { currentStep: 2, totalSteps: 4, expectedString: '75%' },
      { currentStep: 3, totalSteps: 4, expectedString: '100%' },
    ])(
      'should format progress as percentage string for step $currentStep',
      ({ currentStep, totalSteps, expectedString }) => {
        const progress = calculateProgress(currentStep, totalSteps)
        const formattedProgress = `${progress}%`
        expect(formattedProgress).toBe(expectedString)
      },
    )
  })
})
