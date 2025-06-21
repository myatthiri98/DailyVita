export interface HealthConcern {
  id: number
  name: string
}

export interface Diet {
  id: number
  name: string
  tool_tip: string
}

export interface Allergy {
  id: number
  name: string
}

export interface OnboardingState {
  currentStep: number
  totalSteps: number
  healthConcerns: HealthConcern[]
  prioritizedConcerns: HealthConcern[]
  selectedDiets: Diet[]
  isDailyExposure: boolean | null
  isSmoke: boolean | null
  alcohol: string | null
  allergies: Allergy[]
  customAllergies: string
  isLoading: boolean
  error: string | null
  isCompleted: boolean
}

export interface RootState {
  onboarding: OnboardingState
}

export interface NavigationProps {
  navigation: {
    navigate: (screen: string) => void
    goBack: () => void
  }
}

export interface ButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  style?: any
  textStyle?: any
}

export interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export interface RadioButtonProps {
  selected: any
  onPress: (value: any) => void
  label: string
  value: any
}

export interface ApiStateProps {
  isLoading?: boolean
  error?: string | null
  children?: React.ReactNode
}

export type AlcoholOptions = '0-1' | '2-5' | '5+'

export interface FormattedOnboardingData {
  health_concerns: (HealthConcern & { priority: number })[]
  diets: Diet[]
  is_daily_exposure: boolean | null
  is_smoke: boolean | null
  alcohol: string | null
  allergies: Allergy[]
  custom_allergies: string
  timestamp: string
}
