# DailyVita - Personalized Vitamin Onboarding App

A beautiful React Native TypeScript application that guides users through a personalized vitamin recommendation onboarding process.

![DailyVita App](https://img.shields.io/badge/React%20Native-0.73-blue.svg) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg) ![Expo](https://img.shields.io/badge/Expo-SDK%2050-blue.svg)

## 📱 Features

- **Multi-step Onboarding Flow**: Guided user experience with progress tracking
- **Health Concerns Selection**: Select and prioritize up to 5 health concerns with drag-and-drop functionality
- **Diet Preferences**: Choose dietary preferences with interactive tooltips
- **Allergy Management**: Select common allergies and add custom allergies
- **Lifestyle Assessment**: Radio button questionnaire for lifestyle factors
- **Data Persistence**: Save user preferences using AsyncStorage
- **Beautiful UI**: Modern design with smooth animations and transitions
- **Cross-Platform**: Works on both iOS and Android

## 🛠 Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation 6
- **Async Operations**: Redux Toolkit Query
- **Storage**: AsyncStorage
- **Gestures**: React Native Gesture Handler
- **Drag & Drop**: React Native Draggable FlatList
- **Icons**: React Native Vector Icons
- **Safe Area**: React Native Safe Area Context

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio & Android Emulator (for Android development)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/dailyvita.git
   cd dailyvita
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**

   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on specific platforms:**

   ```bash
   # iOS
   npm run ios

   # Android
   npm run android

   # Web
   npm run web
   ```

## 📁 Project Structure

```
DailyVita/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── CustomButton.tsx  # Custom button component
│   │   ├── ProgressBar.tsx   # Progress indicator
│   │   ├── RadioButton.tsx   # Radio button component
│   │   └── withApiState.tsx  # HOC for API states
│   ├── constants/            # App constants
│   ├── data/                 # Static data files
│   │   ├── allergies.json    # Predefined allergies
│   │   ├── diets.json        # Diet options with tooltips
│   │   └── healthconcerns.json # Health concerns data
│   ├── hooks/                # Custom React hooks
│   ├── navigation/           # Navigation configuration
│   │   └── AppNavigator.tsx  # Main navigation stack
│   ├── screens/              # App screens
│   │   ├── WelcomeScreen.tsx      # Welcome/landing screen
│   │   ├── HealthConcernsScreen.tsx # Health concerns & prioritization
│   │   ├── DietsScreen.tsx        # Diet selection with tooltips
│   │   ├── AllergiesScreen.tsx    # Allergy selection
│   │   └── LifestyleScreen.tsx    # Lifestyle questionnaire
│   ├── store/                # Redux store configuration
│   │   ├── index.ts          # Store setup
│   │   └── slices/           # Redux slices
│   │       └── onboardingSlice.ts # Onboarding state management
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # Global types
│   └── utils/                # Utility functions
├── assets/                   # Static assets (images, icons)
├── App.tsx                   # Root component
├── app.json                  # Expo configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## 🎯 Usage

### Onboarding Flow

1. **Welcome Screen**: Introduction to DailyVita
2. **Health Concerns**: Select up to 5 health concerns and prioritize them using drag-and-drop
3. **Diet Selection**: Choose dietary preferences with helpful tooltips
4. **Allergies**: Select common allergies or add custom ones
5. **Lifestyle**: Answer questions about sun exposure, smoking, and alcohol consumption
6. **Completion**: Data is saved and logged to console in the specified format

### Final Data Format

The app outputs data in the following JSON format:

```json
{
  "health_concerns": [
    { "id": 1, "name": "Sleep", "priority": 1 },
    { "id": 2, "name": "Immunity", "priority": 2 }
  ],
  "diets": [{ "id": 1, "name": "Vegan", "tool_tip": "Description..." }],
  "is_daily_exposure": true,
  "is_smoke": false,
  "alcohol": "0-1",
  "allergies": [{ "id": 1, "name": "Milk" }],
  "custom_allergies": "Custom allergy text",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🧪 Available Scripts

```bash
# Development
npm start          # Start Expo development server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run on web browser

# Code Quality
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
npm run format     # Format code with Prettier
npm run type-check # Run TypeScript type checking

# Build
npm run build      # Build for production
```

## 🎨 Design System

### Colors

- **Primary Green**: `#2E5D32`
- **Light Green**: `#C8E6C9`
- **Background Green**: `#E8F5E8`
- **Accent Orange**: `#FF6B47`
- **Text Dark**: `#2E5D32`
- **Text Light**: `#666666`

### Typography

- **Headings**: Bold, 20-32px
- **Body Text**: Regular/Medium, 14-18px
- **Captions**: Regular, 12-14px

## 🚀 Deployment

### Expo Build

```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android

# Build for both platforms
expo build:all
```

### EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure EAS
eas build:configure

# Build for development
eas build --platform all --profile development

# Build for production
eas build --platform all --profile production
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - _Initial work_ - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Design inspiration from modern health and wellness apps
- Icons and illustrations from various open-source libraries
- React Native and Expo communities for excellent documentation

## 📞 Support

If you have any questions or need help with setup, please open an issue or contact us at support@dailyvita.com.

---

Made with ❤️ by the DailyVita Team
