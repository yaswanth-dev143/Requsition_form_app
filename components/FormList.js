import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FormCard } from './FormCard';
import { FormHeader } from './FormHeader';

export const FormList = ({ forms, onNewForm, onEditForm, onExportForm, onDeleteForm, formatDate }) => {
  return (
    <View style={styles.container}>
      <FormHeader
        title="Requisition Forms"
        showAddButton={true}
        onAdd={onNewForm}
      />

      <ScrollView style={styles.listContainer}>
        {forms.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No forms yet</Text>
            <Text style={styles.emptySubtext}>Create your first requisition form</Text>
          </View>
        ) : (
          forms
            .sort((a, b) => b.formNumber - a.formNumber)
            .map((form) => (
              <FormCard
                key={form.formNumber}
                form={form}
                onEdit={onEditForm}
                onExport={onExportForm}
                onDelete={onDeleteForm}
                formatDate={formatDate}
              />
            ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    flex: 1,
    padding: 15,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
});