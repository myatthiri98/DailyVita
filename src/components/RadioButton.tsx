import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const RadioButton: React.FC<{
  selected: any
  onPress: (value: any) => void
  label: string
  value: any
}> = ({ selected, onPress, label, value }) => (
  <TouchableOpacity
    style={styles.radioContainer}
    onPress={() => onPress(value)}
  >
    <View style={styles.radioCircle}>
      {selected === value && <View style={styles.radioSelected} />}
    </View>
    <Text style={styles.radioLabel}>{label}</Text>
  </TouchableOpacity>
)

export default RadioButton

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2E5D32',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#2E5D32',
  },
  radioLabel: {
    fontSize: 16,
    color: '#2E5D32',
    fontWeight: '500',
  },
})
