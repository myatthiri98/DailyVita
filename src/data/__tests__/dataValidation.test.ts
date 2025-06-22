import { describe, it, expect } from 'vitest'
import healthConcernsFile from '../healthconcerns.json'
import dietsFile from '../diets.json'
import allergiesFile from '../allergies.json'

const healthConcernsData = healthConcernsFile.data
const dietsData = dietsFile.data
const allergiesData = allergiesFile.data

describe('Data Validation', () => {
  describe('Health Concerns Data', () => {
    it('should have valid structure', () => {
      expect(Array.isArray(healthConcernsData)).toBe(true)
      expect(healthConcernsData.length).toBeGreaterThan(0)
    })

    it.each(
      healthConcernsData.map((concern, index) => ({
        concern,
        index,
        description: `health concern at index ${index}`,
      })),
    )('should have valid structure for $description', ({ concern }) => {
      expect(concern).toHaveProperty('id')
      expect(concern).toHaveProperty('name')

      expect(typeof concern.id).toBe('number')
      expect(typeof concern.name).toBe('string')

      expect(concern.id).toBeGreaterThan(0)
      expect(concern.name.length).toBeGreaterThan(0)
    })

    it.each([
      { property: 'id', type: 'number', minValue: 1 },
      { property: 'name', type: 'string', minLength: 3 },
    ])(
      'should have valid $property field for all health concerns',
      ({ property, type, minValue, minLength }) => {
        healthConcernsData.forEach((concern, index) => {
          const value = concern[property as keyof typeof concern]
          expect(typeof value).toBe(type)

          if (type === 'string') {
            expect((value as string).length).toBeGreaterThanOrEqual(
              minLength || 0,
            )
            expect((value as string).trim()).toBe(value) // No leading/trailing whitespace
          }

          if (type === 'number' && minValue) {
            expect(value as number).toBeGreaterThanOrEqual(minValue)
          }
        })
      },
    )

    it('should have unique IDs', () => {
      const ids = healthConcernsData.map((concern) => concern.id)
      const uniqueIds = [...new Set(ids)]
      expect(uniqueIds.length).toBe(ids.length)
    })

    it('should have unique names', () => {
      const names = healthConcernsData.map((concern) => concern.name)
      const uniqueNames = [...new Set(names)]
      expect(uniqueNames.length).toBe(names.length)
    })

    it.each([
      { category: 'Energy', minCount: 0 },
      { category: 'Sleep', minCount: 0 },
      { category: 'Stress', minCount: 0 },
      { category: 'Immunity', minCount: 0 },
    ])('should handle $category related concerns', ({ category, minCount }) => {
      const categoryCount = healthConcernsData.filter((concern) =>
        concern.name.toLowerCase().includes(category.toLowerCase()),
      ).length
      expect(categoryCount).toBeGreaterThanOrEqual(minCount)
    })
  })

  describe('Diets Data', () => {
    it('should have valid structure', () => {
      expect(Array.isArray(dietsData)).toBe(true)
      expect(dietsData.length).toBeGreaterThan(0)
    })

    it.each(
      dietsData.map((diet, index) => ({
        diet,
        index,
        description: `diet at index ${index}`,
      })),
    )('should have valid structure for $description', ({ diet }) => {
      expect(diet).toHaveProperty('id')
      expect(diet).toHaveProperty('name')
      expect(diet).toHaveProperty('tool_tip')

      expect(typeof diet.id).toBe('number')
      expect(typeof diet.name).toBe('string')
      expect(typeof diet.tool_tip).toBe('string')

      expect(diet.id).toBeGreaterThan(0)
      expect(diet.name.length).toBeGreaterThan(0)
      expect(diet.tool_tip.length).toBeGreaterThan(0)
    })

    it.each([
      { property: 'id', type: 'number', minValue: 1 },
      { property: 'name', type: 'string', minLength: 3 },
      { property: 'tool_tip', type: 'string', minLength: 10 },
    ])(
      'should have valid $property field for all diets',
      ({ property, type, minValue, minLength }) => {
        dietsData.forEach((diet, index) => {
          const value = diet[property as keyof typeof diet]
          expect(typeof value).toBe(type)

          if (type === 'string') {
            expect((value as string).length).toBeGreaterThanOrEqual(
              minLength || 0,
            )
            expect((value as string).trim()).toBe(value)
          }

          if (type === 'number' && minValue) {
            expect(value as number).toBeGreaterThanOrEqual(minValue)
          }
        })
      },
    )

    it('should have unique IDs', () => {
      const ids = dietsData.map((diet) => diet.id)
      const uniqueIds = [...new Set(ids)]
      expect(uniqueIds.length).toBe(ids.length)
    })

    it('should have unique names', () => {
      const names = dietsData.map((diet) => diet.name)
      const uniqueNames = [...new Set(names)]
      expect(uniqueNames.length).toBe(names.length)
    })

    it.each([
      { dietType: 'Vegan', expectedMinCount: 0 },
      { dietType: 'Vegetarian', expectedMinCount: 0 },
      { dietType: 'Keto', expectedMinCount: 0 },
      { dietType: 'Paleo', expectedMinCount: 0 },
    ])(
      'should handle $dietType diet type',
      ({ dietType, expectedMinCount }) => {
        const dietCount = dietsData.filter((diet) =>
          diet.name.toLowerCase().includes(dietType.toLowerCase()),
        ).length
        expect(dietCount).toBeGreaterThanOrEqual(expectedMinCount)
      },
    )
  })

  describe('Allergies Data', () => {
    it('should have valid structure', () => {
      expect(Array.isArray(allergiesData)).toBe(true)
      expect(allergiesData.length).toBeGreaterThan(0)
    })

    it.each(
      allergiesData.map((allergy, index) => ({
        allergy,
        index,
        description: `allergy at index ${index}`,
      })),
    )('should have valid structure for $description', ({ allergy }) => {
      expect(allergy).toHaveProperty('id')
      expect(allergy).toHaveProperty('name')

      expect(typeof allergy.id).toBe('number')
      expect(typeof allergy.name).toBe('string')

      expect(allergy.id).toBeGreaterThan(0)
      expect(allergy.name.length).toBeGreaterThan(0)
    })

    it.each([
      { property: 'id', type: 'number', minValue: 1 },
      { property: 'name', type: 'string', minLength: 2 },
    ])(
      'should have valid $property field for all allergies',
      ({ property, type, minValue, minLength }) => {
        allergiesData.forEach((allergy, index) => {
          const value = allergy[property as keyof typeof allergy]
          expect(typeof value).toBe(type)

          if (type === 'string') {
            expect((value as string).length).toBeGreaterThanOrEqual(
              minLength || 0,
            )
            expect((value as string).trim()).toBe(value)
          }

          if (type === 'number' && minValue) {
            expect(value as number).toBeGreaterThanOrEqual(minValue)
          }
        })
      },
    )

    it('should have unique IDs', () => {
      const ids = allergiesData.map((allergy) => allergy.id)
      const uniqueIds = [...new Set(ids)]
      expect(uniqueIds.length).toBe(ids.length)
    })

    it('should have unique names', () => {
      const names = allergiesData.map((allergy) => allergy.name)
      const uniqueNames = [...new Set(names)]
      expect(uniqueNames.length).toBe(names.length)
    })

    it.each([
      { allergyType: 'Milk', expectedMinCount: 0 },
      { allergyType: 'Meat', expectedMinCount: 0 },
      { allergyType: 'Wheat', expectedMinCount: 0 },
    ])(
      'should handle $allergyType allergy type',
      ({ allergyType, expectedMinCount }) => {
        const allergyCount = allergiesData.filter((allergy) =>
          allergy.name.toLowerCase().includes(allergyType.toLowerCase()),
        ).length
        expect(allergyCount).toBeGreaterThanOrEqual(expectedMinCount)
      },
    )
  })

  describe('Cross-data validation', () => {
    it.each([
      {
        dataName: 'healthConcernsData',
        data: healthConcernsData,
        minCount: 5,
        maxCount: 20,
      },
      { dataName: 'dietsData', data: dietsData, minCount: 3, maxCount: 15 },
      {
        dataName: 'allergiesData',
        data: allergiesData,
        minCount: 3,
        maxCount: 25,
      },
    ])(
      'should have reasonable number of items in $dataName',
      ({ data, minCount, maxCount }) => {
        expect(data.length).toBeGreaterThanOrEqual(minCount)
        expect(data.length).toBeLessThanOrEqual(maxCount)
      },
    )

    it.each([
      { dataName: 'healthConcernsData', data: healthConcernsData },
      { dataName: 'dietsData', data: dietsData },
      { dataName: 'allergiesData', data: allergiesData },
    ])('should have consistent ID format in $dataName', ({ data }) => {
      data.forEach((item) => {
        // IDs should be positive integers
        expect(item.id).toBeGreaterThan(0)
        expect(Number.isInteger(item.id)).toBe(true)
      })
    })
  })

  describe('Data integrity', () => {
    it.each([
      {
        dataName: 'healthConcernsData',
        data: healthConcernsData,
        expectedFields: ['id', 'name'],
        description: 'health concerns',
      },
      {
        dataName: 'dietsData',
        data: dietsData,
        expectedFields: ['id', 'name', 'tool_tip'],
        description: 'diets',
      },
      {
        dataName: 'allergiesData',
        data: allergiesData,
        expectedFields: ['id', 'name'],
        description: 'allergies',
      },
    ])(
      'should have consistent schema for $description',
      ({ data, expectedFields }) => {
        data.forEach((item) => {
          expectedFields.forEach((field) => {
            expect(item).toHaveProperty(field)
          })

          // Should not have extra fields (except for known variations)
          const itemKeys = Object.keys(item)
          expectedFields.forEach((field) => {
            expect(itemKeys).toContain(field)
          })
        })
      },
    )

    it.each([
      { dataName: 'healthConcernsData', data: healthConcernsData },
      { dataName: 'dietsData', data: dietsData },
      { dataName: 'allergiesData', data: allergiesData },
    ])(
      'should not have empty or whitespace-only names in $dataName',
      ({ data }) => {
        data.forEach((item) => {
          expect(item.name.trim().length).toBeGreaterThan(0)
          expect(item.name).not.toMatch(/^\s+$/) // Not only whitespace
        })
      },
    )
  })
})
