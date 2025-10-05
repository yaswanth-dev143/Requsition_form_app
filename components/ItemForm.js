import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { UnitSelector } from './UnitPicker';

export const ItemForm = ({ item, index, onUpdate, onRemove, onUnitPress }) => {
  return (
    <View style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemNumber}>Item {index + 1}</Text>
        <TouchableOpacity onPress={() => onRemove(index)}>
          <Text style={styles.removeButton}>✕ Remove</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        value={item.itemName}
        onChangeText={(text) => onUpdate(index, 'itemName', text)}
        placeholder="Item Name *"
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          value={item.quantity}
          onChangeText={(text) => onUpdate(index, 'quantity', text)}
          placeholder="Quantity *"
          keyboardType="numeric"
        />
        <UnitSelector
          value={item.unit}
          onPress={() => onUnitPress(index)}
        />
      </View>

      <TextInput
        style={styles.input}
        value={item.purpose}
        onChangeText={(text) => onUpdate(index, 'purpose', text)}
        placeholder="Purpose *"
      />

      <TextInput
        style={styles.input}
        value={item.remarks}
        onChangeText={(text) => onUpdate(index, 'remarks', text)}
        placeholder="Remarks (optional)"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  removeButton: {
    color: '#f44336',
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
});