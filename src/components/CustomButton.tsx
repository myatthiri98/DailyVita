import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { ButtonProps, ButtonVariant } from '@/types'
import {
  COLORS,
  DIMENSIONS,
  FONT_SIZES,
  FONT_WEIGHTS,
  ANIMATION,
} from '@/constants'

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = (variant: ButtonVariant): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: variant === 'primary' ? COLORS.PRIMARY : 'transparent',
      borderWidth: variant === 'secondary' ? 1 : 0,
      borderColor: variant === 'secondary' ? COLORS.PRIMARY : 'transparent',
    }

    if (disabled) {
      return {
        ...baseStyle,
        backgroundColor: COLORS.GRAY_MEDIUM,
        borderColor: COLORS.GRAY_MEDIUM,
      }
    }

    return baseStyle
  }

  const getTextStyle = (variant: ButtonVariant): TextStyle => {
    const baseStyle: TextStyle = {
      color: variant === 'primary' ? COLORS.WHITE : COLORS.PRIMARY,
    }

    if (disabled) {
      return {
        ...baseStyle,
        color: COLORS.GRAY_DARK,
      }
    }

    return baseStyle
  }

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(variant), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={ANIMATION.ACTIVE_OPACITY}
      testID={`button-${variant}-${disabled ? 'disabled' : 'enabled'}`}
    >
      <Text style={[styles.buttonText, getTextStyle(variant), textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: DIMENSIONS.BORDER_RADIUS_BUTTON,
    paddingVertical: DIMENSIONS.BUTTON_PADDING_VERTICAL,
    paddingHorizontal: DIMENSIONS.BUTTON_PADDING_HORIZONTAL,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: DIMENSIONS.BUTTON_MIN_HEIGHT,
  },
  buttonText: {
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
  },
})

export default CustomButton
