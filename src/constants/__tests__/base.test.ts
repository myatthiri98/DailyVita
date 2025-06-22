import { describe, it, expect } from 'vitest'
import {
  SCREEN_NAMES,
  STORAGE_KEYS,
  COLORS,
  DIMENSIONS,
  FONT_SIZES,
  ALCOHOL_OPTIONS,
  LIFESTYLE_QUESTIONS,
  RADIO_LABELS,
  BUTTON_TITLES,
  WELCOME_MESSAGES,
  LIMITS,
  MESSAGES,
} from '../base'

describe('Constants Validation', () => {
  describe('SCREEN_NAMES', () => {
    it.each([
      { name: 'WELCOME', expected: 'Welcome' },
      { name: 'HEALTH_CONCERNS', expected: 'HealthConcerns' },
      { name: 'DIETS', expected: 'Diets' },
      { name: 'LIFESTYLE', expected: 'Lifestyle' },
      { name: 'ALLERGIES', expected: 'Allergies' },
    ])('should have correct value for $name', ({ name, expected }) => {
      expect(SCREEN_NAMES[name as keyof typeof SCREEN_NAMES]).toBe(expected)
    })

    it('should have all required screen names', () => {
      const requiredScreens = [
        'WELCOME',
        'HEALTH_CONCERNS',
        'DIETS',
        'LIFESTYLE',
        'ALLERGIES',
      ]
      requiredScreens.forEach((screen) => {
        expect(SCREEN_NAMES).toHaveProperty(screen)
      })
    })
  })

  describe('COLORS', () => {
    it.each([
      { colorName: 'PRIMARY', expectedValue: '#FF6B47', type: 'hex' },
      { colorName: 'WHITE', expectedValue: '#FFFFFF', type: 'hex' },
      { colorName: 'BLACK', expectedValue: '#000000', type: 'hex' },
      { colorName: 'SUCCESS', expectedValue: '#4CAF50', type: 'hex' },
      { colorName: 'ERROR', expectedValue: '#F44336', type: 'hex' },
    ])(
      'should have valid $type color for $colorName',
      ({ colorName, expectedValue }) => {
        expect(COLORS[colorName as keyof typeof COLORS]).toBe(expectedValue)
      },
    )

    it.each([
      { colorName: 'PRIMARY', pattern: /^#[0-9A-F]{6}$/i },
      { colorName: 'SECONDARY', pattern: /^#[0-9A-F]{6}$/i },
      { colorName: 'SUCCESS', pattern: /^#[0-9A-F]{6}$/i },
      { colorName: 'ERROR', pattern: /^#[0-9A-F]{6}$/i },
      { colorName: 'WHITE', pattern: /^#[0-9A-F]{6}$/i },
      { colorName: 'BLACK', pattern: /^#[0-9A-F]{6}$/i },
    ])(
      'should have valid hex format for $colorName',
      ({ colorName, pattern }) => {
        const color = COLORS[colorName as keyof typeof COLORS]
        expect(color).toMatch(pattern)
      },
    )
  })

  describe('DIMENSIONS', () => {
    it.each([
      { dimension: 'BORDER_RADIUS_SMALL', expectedValue: 2, type: 'number' },
      { dimension: 'BORDER_RADIUS_MEDIUM', expectedValue: 10, type: 'number' },
      { dimension: 'BORDER_RADIUS_LARGE', expectedValue: 20, type: 'number' },
      { dimension: 'BUTTON_MIN_HEIGHT', expectedValue: 50, type: 'number' },
      { dimension: 'SPACING_XS', expectedValue: 4, type: 'number' },
      { dimension: 'SPACING_SM', expectedValue: 8, type: 'number' },
      { dimension: 'SPACING_MD', expectedValue: 12, type: 'number' },
      { dimension: 'SPACING_LG', expectedValue: 16, type: 'number' },
    ])(
      'should have correct $type value for $dimension',
      ({ dimension, expectedValue }) => {
        expect(DIMENSIONS[dimension as keyof typeof DIMENSIONS]).toBe(
          expectedValue,
        )
        expect(typeof DIMENSIONS[dimension as keyof typeof DIMENSIONS]).toBe(
          'number',
        )
      },
    )

    it.each([
      { dimension: 'SPACING_XS', min: 0, max: 10 },
      { dimension: 'SPACING_SM', min: 5, max: 15 },
      { dimension: 'SPACING_MD', min: 10, max: 20 },
      { dimension: 'SPACING_LG', min: 15, max: 25 },
      { dimension: 'BUTTON_MIN_HEIGHT', min: 40, max: 60 },
    ])(
      'should have reasonable value range for $dimension',
      ({ dimension, min, max }) => {
        const value = DIMENSIONS[dimension as keyof typeof DIMENSIONS]
        expect(value).toBeGreaterThanOrEqual(min)
        expect(value).toBeLessThanOrEqual(max)
      },
    )
  })

  describe('FONT_SIZES', () => {
    it.each([
      { size: 'SMALL', expectedValue: 12, type: 'number' },
      { size: 'MEDIUM', expectedValue: 16, type: 'number' },
      { size: 'LARGE', expectedValue: 20, type: 'number' },
      { size: 'XL', expectedValue: 24, type: 'number' },
      { size: 'XXL', expectedValue: 32, type: 'number' },
    ])(
      'should have correct $type value for $size',
      ({ size, expectedValue }) => {
        expect(FONT_SIZES[size as keyof typeof FONT_SIZES]).toBe(expectedValue)
        expect(typeof FONT_SIZES[size as keyof typeof FONT_SIZES]).toBe(
          'number',
        )
      },
    )

    it('should have ascending font size values', () => {
      const sizes = Object.values(FONT_SIZES)
      for (let i = 1; i < sizes.length; i++) {
        expect(sizes[i]).toBeGreaterThan(sizes[i - 1])
      }
    })
  })

  describe('ALCOHOL_OPTIONS', () => {
    it.each([
      { option: 'LOW', expectedValue: '0-1', description: 'low consumption' },
      {
        option: 'MEDIUM',
        expectedValue: '2-5',
        description: 'medium consumption',
      },
      { option: 'HIGH', expectedValue: '5+', description: 'high consumption' },
    ])(
      'should have correct value for $description',
      ({ option, expectedValue }) => {
        expect(ALCOHOL_OPTIONS[option as keyof typeof ALCOHOL_OPTIONS]).toBe(
          expectedValue,
        )
      },
    )

    it('should have all required alcohol options', () => {
      const requiredOptions = ['LOW', 'MEDIUM', 'HIGH']
      requiredOptions.forEach((option) => {
        expect(ALCOHOL_OPTIONS).toHaveProperty(option)
      })
    })
  })

  describe('LIFESTYLE_QUESTIONS', () => {
    it.each([
      {
        question: 'SUN_EXPOSURE',
        expectedText: 'Is your daily exposure to sun is limited?',
        type: 'boolean question',
      },
      {
        question: 'SMOKING',
        expectedText: 'Do you current smoke (tobacco or marijuana)?',
        type: 'boolean question',
      },
      {
        question: 'ALCOHOL_CONSUMPTION',
        expectedText:
          'On average, how many alcoholic beverages do you have in a week?',
        type: 'multiple choice question',
      },
    ])('should have correct text for $type', ({ question, expectedText }) => {
      expect(
        LIFESTYLE_QUESTIONS[question as keyof typeof LIFESTYLE_QUESTIONS],
      ).toBe(expectedText)
    })

    it.each([
      { question: 'SUN_EXPOSURE' },
      { question: 'SMOKING' },
      { question: 'ALCOHOL_CONSUMPTION' },
    ])('should have non-empty question text for $question', ({ question }) => {
      const questionText =
        LIFESTYLE_QUESTIONS[question as keyof typeof LIFESTYLE_QUESTIONS]
      expect(questionText).toBeTruthy()
      expect(questionText.length).toBeGreaterThan(0)
      expect(questionText.trim()).toBe(questionText) // No leading/trailing whitespace
    })
  })

  describe('BUTTON_TITLES', () => {
    it.each([
      {
        button: 'GET_STARTED',
        expectedText: 'Get started',
        context: 'welcome screen',
      },
      { button: 'NEXT', expectedText: 'Next', context: 'navigation' },
      { button: 'BACK', expectedText: 'Back', context: 'navigation' },
      {
        button: 'GET_PERSONALIZED_VITAMIN',
        expectedText: 'Get my personalized vitamin',
        context: 'final action',
      },
    ])(
      'should have correct text for $context button',
      ({ button, expectedText }) => {
        expect(BUTTON_TITLES[button as keyof typeof BUTTON_TITLES]).toBe(
          expectedText,
        )
      },
    )
  })

  describe('WELCOME_MESSAGES', () => {
    it.each([
      {
        message: 'TITLE',
        expectedText: 'Welcome to DailyVita',
        minLength: 10,
        maxLength: 50,
      },
      {
        message: 'SUBTITLE',
        expectedText:
          'Hello, we are here to make your life healthier and happier',
        minLength: 20,
        maxLength: 100,
      },
      {
        message: 'DESCRIPTION',
        expectedText:
          'We will ask couple of questions to better understand your vitamin need.',
        minLength: 30,
        maxLength: 150,
      },
    ])(
      'should have appropriate length for $message',
      ({ message, expectedText, minLength, maxLength }) => {
        const text = WELCOME_MESSAGES[message as keyof typeof WELCOME_MESSAGES]
        expect(text).toBe(expectedText)
        expect(text.length).toBeGreaterThanOrEqual(minLength)
        expect(text.length).toBeLessThanOrEqual(maxLength)
      },
    )
  })

  describe('LIMITS', () => {
    it.each([
      { limit: 'MAX_HEALTH_CONCERNS', expectedValue: 5, type: 'maximum' },
      { limit: 'MIN_HEALTH_CONCERNS', expectedValue: 1, type: 'minimum' },
    ])(
      'should have reasonable $type value for $limit',
      ({ limit, expectedValue }) => {
        expect(LIMITS[limit as keyof typeof LIMITS]).toBe(expectedValue)
        expect(typeof LIMITS[limit as keyof typeof LIMITS]).toBe('number')
      },
    )

    it('should have MIN less than MAX for health concerns', () => {
      expect(LIMITS.MIN_HEALTH_CONCERNS).toBeLessThan(
        LIMITS.MAX_HEALTH_CONCERNS,
      )
    })
  })

  describe('MESSAGES', () => {
    it.each([
      { message: 'LOADING', expectedText: 'Loading...', category: 'status' },
      { message: 'ERROR_PREFIX', expectedText: 'Error: ', category: 'error' },
      {
        message: 'SELECTION_REQUIRED',
        expectedText: 'Selection Required',
        category: 'validation',
      },
      {
        message: 'MAX_SELECTION',
        expectedText: 'Maximum Selection',
        category: 'validation',
      },
    ])(
      'should have appropriate $category message for $message',
      ({ message, expectedText }) => {
        expect(MESSAGES[message as keyof typeof MESSAGES]).toBe(expectedText)
      },
    )

    it.each([
      { message: 'MAX_HEALTH_CONCERNS_MESSAGE' },
      { message: 'MIN_HEALTH_CONCERNS_MESSAGE' },
      { message: 'COMPLETE_ALL_QUESTIONS' },
    ])(
      'should have descriptive validation message for $message',
      ({ message }) => {
        const messageText = MESSAGES[message as keyof typeof MESSAGES]
        expect(messageText).toBeTruthy()
        expect(messageText.length).toBeGreaterThan(10) // Should be descriptive
      },
    )
  })

  describe('Type consistency', () => {
    it.each([
      { constantName: 'SCREEN_NAMES', type: 'string' },
      { constantName: 'STORAGE_KEYS', type: 'string' },
      { constantName: 'COLORS', type: 'string' },
      { constantName: 'LIFESTYLE_QUESTIONS', type: 'string' },
      { constantName: 'RADIO_LABELS', type: 'string' },
      { constantName: 'BUTTON_TITLES', type: 'string' },
      { constantName: 'WELCOME_MESSAGES', type: 'string' },
      { constantName: 'ALCOHOL_OPTIONS', type: 'string' },
      { constantName: 'MESSAGES', type: 'string' },
    ])(
      'should have all $type values in $constantName',
      ({ constantName, type }) => {
        const constants = {
          SCREEN_NAMES,
          STORAGE_KEYS,
          COLORS,
          LIFESTYLE_QUESTIONS,
          RADIO_LABELS,
          BUTTON_TITLES,
          WELCOME_MESSAGES,
          ALCOHOL_OPTIONS,
          MESSAGES,
        }

        const constantObject = constants[constantName as keyof typeof constants]
        Object.values(constantObject).forEach((value) => {
          expect(typeof value).toBe(type)
        })
      },
    )

    it.each([
      { constantName: 'DIMENSIONS', type: 'number' },
      { constantName: 'FONT_SIZES', type: 'number' },
      { constantName: 'LIMITS', type: 'number' },
    ])(
      'should have all $type values in $constantName',
      ({ constantName, type }) => {
        const constants = {
          DIMENSIONS,
          FONT_SIZES,
          LIMITS,
        }

        const constantObject = constants[constantName as keyof typeof constants]
        Object.values(constantObject).forEach((value) => {
          expect(typeof value).toBe(type)
        })
      },
    )
  })
})
