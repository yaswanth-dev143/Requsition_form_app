import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const FormCard = ({ form, onEdit, onExport, onDelete, formatDate }) => {
  return (
    <View style={styles.formCard}>
      <View style={styles.formCardHeader}>
        <Text style={styles.formNumber}>Requisition #{form.formNumber}</Text>
        <Text style={styles.formDate}>{formatDate(form.date)}</Text>
      </View>
      <Text style={styles.formDetail}>Requested By: {form.requestedBy}</Text>
      <Text style={styles.formDetail}>Items: {form.items.length}</Text>
      <View style={styles.formActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onEdit(form)}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.exportButton]}
          onPress={() => onExport(form)}
        >
          <Text style={styles.actionButtonText}>Export PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => onDelete(form.formNumber)}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  formCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  formNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  formDate: {
    fontSize: 14,
    color: '#666',
  },
  formDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  formActions: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  exportButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  actionButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
});