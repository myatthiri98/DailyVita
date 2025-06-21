import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack'
import CustomButton from '../components/CustomButton'
import { setCurrentStep } from '../store/slices/onboardingSlice'
import { RootStackParamList } from '../navigation/AppNavigator'
import { AppDispatch } from '../store'

const { width } = Dimensions.get('window')

interface WelcomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Welcome'>
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleGetStarted = (): void => {
    dispatch(setCurrentStep(1))
    navigation.navigate('HealthConcerns')
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Welcome to DailyVita</Text>
          <Text style={styles.subtitle}>
            Hello, we are here to make your life{'\n'}healthier and happier
          </Text>
        </View>

        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBox}>
            {/* Pills floating around */}
            <View style={[styles.pill, styles.pill1]}>
              <Text style={styles.pillText}>💊</Text>
            </View>
            <View style={[styles.pill, styles.pill2]}>
              <Text style={styles.pillText}>🧬</Text>
            </View>
            <View style={[styles.pill, styles.pill3]}>
              <Text style={styles.pillText}>💊</Text>
            </View>
            <View style={[styles.pill, styles.pill4]}>
              <Text style={styles.pillText}>🧪</Text>
            </View>

            {/* Main characters */}
            <View style={styles.charactersContainer}>
              <View style={styles.character}>
                <Text style={styles.characterEmoji}>👩‍⚕️</Text>
                <View style={styles.speechBubble}>
                  <Text style={styles.speechText}>💬</Text>
                </View>
              </View>
              <View style={styles.character}>
                <Text style={styles.characterEmoji}>👨‍⚕️</Text>
                <View style={styles.speechBubble}>
                  <Text style={styles.speechText}>💬</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <Text style={styles.description}>
            We will ask couple of questions to better{'\n'}understand your
            vitamin need.
          </Text>

          <CustomButton
            title="Get started"
            onPress={handleGetStarted}
            style={styles.getStartedButton}
          />
        </View>
      </View>
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
    justifyContent: 'space-between',
  },
  headerSection: {
    marginTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E5D32',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#4A4A4A',
    lineHeight: 24,
    textAlign: 'center',
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  illustrationBox: {
    width: width * 0.8,
    height: 300,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pill: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pill1: {
    top: 20,
    left: 30,
    backgroundColor: '#E3F2FD',
  },
  pill2: {
    top: 50,
    right: 20,
    backgroundColor: '#F3E5F5',
  },
  pill3: {
    bottom: 80,
    left: 20,
    backgroundColor: '#FFF3E0',
  },
  pill4: {
    bottom: 30,
    right: 40,
    backgroundColor: '#E8F5E8',
  },
  pillText: {
    fontSize: 20,
  },
  charactersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  character: {
    alignItems: 'center',
    position: 'relative',
  },
  characterEmoji: {
    fontSize: 80,
  },
  speechBubble: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  speechText: {
    fontSize: 12,
  },
  bottomSection: {
    marginBottom: 40,
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    color: '#4A4A4A',
    lineHeight: 24,
    marginBottom: 32,
    textAlign: 'center',
  },
  getStartedButton: {
    width: '100%',
  },
})

export default WelcomeScreen
