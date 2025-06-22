import { vi } from 'vitest'

global.window = global.window || {}
Object.defineProperty(global.window, 'addEventListener', { value: vi.fn() })
Object.defineProperty(global.window, 'removeEventListener', { value: vi.fn() })

const mockAsyncStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

vi.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)

vi.mock('react-native', () => ({
  View: 'View',
  Text: 'Text',
  TouchableOpacity: 'TouchableOpacity',
  StyleSheet: {
    create: (styles: any) => styles,
  },
  Dimensions: {
    get: () => ({ width: 375, height: 812 }),
  },
}))

vi.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}))

vi.mock('lottie-react-native', () => ({
  default: 'LottieView',
}))

vi.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: vi.fn(),
    goBack: vi.fn(),
  }),
}))

export { mockAsyncStorage }
