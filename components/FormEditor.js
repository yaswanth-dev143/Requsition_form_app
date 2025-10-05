import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FormHeader } from './FormHeader';
import { ItemForm } from './ItemForm';
import { UnitPicker } from './UnitPicker';

export const FormEditor = ({
  currentForm,
  requestedBy,
  setRequestedBy,
  storeIncharge,
  setStoreIncharge,
  items,
  updateItem,
  addItem,
  removeItem,
  onExport,
  onBack
}) => {
  const [showUnitPicker, setShowUnitPicker] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const handleUnitPress = (index) => {
    setSelectedItemIndex(index);
    setShowUnitPicker(true);
  };

  return (
    <View style={styles.container}>
      <FormHeader
        title={currentForm ? `Edit Form #${currentForm.formNumber}` : 'New Requisition Form'}
        showBack={true}
        onBack={onBack}
      />

      <ScrollView style={styles.formContainer}>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Requested By *</Text>
          <TextInput
            style={styles.input}
            value={requestedBy}
            onChangeText={setRequestedBy}
            placeholder="Enter in-charge name"
          />
        </View>

        <View style={styles.fieldGroup}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Items *</Text>
            <TouchableOpacity style={styles.addItemButton} onPress={addItem}>
              <Text style={styles.addItemText}>+ Add Item</Text>
            </TouchableOpacity>
          </View>

          {items.map((item, index) => (
            <ItemForm
              key={index}
              item={item}
              index={index}
              onUpdate={updateItem}
              onRemove={removeItem}
              onUnitPress={handleUnitPress}
            />
          ))}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Store In-charge *</Text>
          <TextInput
            style={styles.input}
            value={storeIncharge}
            onChangeText={setStoreIncharge}
            placeholder="Enter store in-charge name"
          />
        </View>

        <TouchableOpacity style={styles.exportPDFButton} onPress={onExport}>
          <Text style={styles.exportPDFText}>
            {currentForm ? 'Update & Export PDF' : 'Save & Export PDF'}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>

      <UnitPicker
        visible={showUnitPicker}
        onClose={() => setShowUnitPicker(false)}
        onSelect={(unit) => {
          if (selectedItemIndex !== null) {
            updateItem(selectedItemIndex, 'unit', unit);
          }
          setShowUnitPicker(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    flex: 1,
    padding: 15,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addItemButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addItemText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  exportPDFButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  exportPDFText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});