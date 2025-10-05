import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const UNIT_OPTIONS = [
  'Nos',
  'Kg',
  'Bags',
  'Liters',
  'Meters',
  'Boxes',
  'Pieces',
  'Sets',
  'Rolls',
  'Other'
];

export const UnitPicker = ({ visible, onClose, onSelect }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Unit</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={UNIT_OPTIONS}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.unitOption}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text style={styles.unitOptionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export const UnitSelector = ({ value, onPress }) => (
  <TouchableOpacity
    style={[styles.input, styles.halfInput, styles.unitSelector]}
    onPress={onPress}
  >
    <Text style={value ? styles.unitText : styles.unitPlaceholder}>
      {value || 'Select Unit *'}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalClose: {
    fontSize: 20,
    color: '#666',
    padding: 5,
  },
  unitOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  unitOptionText: {
    fontSize: 16,
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
  halfInput: {
    width: '48%',
  },
  unitSelector: {
    justifyContent: 'center',
    paddingVertical: 14,
  },
  unitText: {
    fontSize: 16,
    color: '#333',
  },
  unitPlaceholder: {
    fontSize: 16,
    color: '#999',
  },
});