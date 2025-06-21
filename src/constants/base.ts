// Screen names
export const SCREEN_NAMES = {
  WELCOME: 'Welcome',
  HEALTH_CONCERNS: 'HealthConcerns',
  DIETS: 'Diets',
  LIFESTYLE: 'Lifestyle',
  ALLERGIES: 'Allergies',
} as const

// Storage keys
export const STORAGE_KEYS = {
  ONBOARDING_DATA: 'onboarding_data',
} as const

// Redux action types
export const REDUX_ACTIONS = {
  ONBOARDING_SAVE_DATA: 'onboarding/saveData',
  ONBOARDING_LOAD_DATA: 'onboarding/loadData',
} as const

// Colors
export const COLORS = {
  // Primary colors
  PRIMARY: '#FF6B47',
  PRIMARY_LIGHT: '#FFE5E5',

  // Secondary colors
  SECONDARY: '#2E5D32',
  SECONDARY_LIGHT: '#C8E6C9',

  // Success colors
  SUCCESS: '#4CAF50',
  SUCCESS_LIGHT: '#E8F5E8',

  // Neutral colors
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY_LIGHT: '#E0E0E0',
  GRAY_MEDIUM: '#CCCCCC',
  GRAY_DARK: '#888888',
  GRAY_TEXT: '#4A4A4A',
  GRAY_DISABLED: '#666666',

  // Background colors
  BACKGROUND_LIGHT: '#F5F5F5',

  // Error colors
  ERROR: '#F44336',

  // Accent colors
  ACCENT_BLUE: '#E3F2FD',
  ACCENT_PURPLE: '#F3E5F5',
  ACCENT_ORANGE: '#FFF3E0',
} as const

// Dimensions
export const DIMENSIONS = {
  // Border radius
  BORDER_RADIUS_SMALL: 2,
  BORDER_RADIUS_MEDIUM: 10,
  BORDER_RADIUS_LARGE: 20,
  BORDER_RADIUS_BUTTON: 25,

  // Spacing
  SPACING_XS: 4,
  SPACING_SM: 8,
  SPACING_MD: 12,
  SPACING_LG: 16,
  SPACING_XL: 20,
  SPACING_XXL: 24,
  SPACING_XXXL: 32,
  SPACING_SECTION: 40,
  SPACING_SCREEN: 60,

  // Button dimensions
  BUTTON_MIN_HEIGHT: 50,
  BUTTON_PADDING_VERTICAL: 16,
  BUTTON_PADDING_HORIZONTAL: 32,

  // Radio button dimensions
  RADIO_SIZE: 20,
  RADIO_INNER_SIZE: 10,
  RADIO_BORDER_WIDTH: 2,

  // Progress bar
  PROGRESS_BAR_HEIGHT: 4,

  // Illustrations
  PILL_SIZE: 40,
  CHARACTER_EMOJI_SIZE: 80,
} as const

// Font sizes
export const FONT_SIZES = {
  SMALL: 12,
  MEDIUM: 16,
  LARGE: 20,
  XL: 24,
  XXL: 32,
} as const

// Font weights
export const FONT_WEIGHTS = {
  NORMAL: '400' as const,
  MEDIUM: '500' as const,
  SEMIBOLD: '600' as const,
  BOLD: 'bold' as const,
}

// Animation values
export const ANIMATION = {
  ACTIVE_OPACITY: 0.8,
  LONG_PRESS_DELAY: 150,
  ACTIVATION_DISTANCE: 10,
} as const

// Limits
export const LIMITS = {
  MAX_HEALTH_CONCERNS: 5,
  MIN_HEALTH_CONCERNS: 1,
} as const

// Messages
export const MESSAGES = {
  LOADING: 'Loading...',
  ERROR_PREFIX: 'Error: ',
  SELECTION_REQUIRED: 'Selection Required',
  MAX_SELECTION: 'Maximum Selection',
  MAX_HEALTH_CONCERNS_MESSAGE: `You can select up to ${LIMITS.MAX_HEALTH_CONCERNS} health concerns.`,
  MIN_HEALTH_CONCERNS_MESSAGE: 'Please select at least one health concern.',
} as const

// Alcohol options
export const ALCOHOL_OPTIONS = {
  LOW: '0-1',
  MEDIUM: '2-5',
  HIGH: '5+',
} as const

export type AlcoholOption =
  (typeof ALCOHOL_OPTIONS)[keyof typeof ALCOHOL_OPTIONS]
