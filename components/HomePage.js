import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const HomePage = ({ 
  formsCount, 
  onNewForm, 
  onViewForms, 
  recentForms = [] 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Requisition Manager</Text>
        <Text style={styles.subtitle}>Streamline your requisition process</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{formsCount}</Text>
            <Text style={styles.statLabel}>Total Forms</Text>
          </View>
          {recentForms.length > 0 && (
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{recentForms.length}</Text>
              <Text style={styles.statLabel}>Recent Forms</Text>
            </View>
          )}
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.primaryButton]} 
            onPress={onNewForm}
          >
            <Text style={styles.actionButtonText}>Create New Requisition</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton]} 
            onPress={onViewForms}
          >
            <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>
              View All Forms
            </Text>
          </TouchableOpacity>
        </View>

        {recentForms.length > 0 && (
          <View style={styles.recentFormsContainer}>
            <Text style={styles.sectionTitle}>Recent Forms</Text>
            {recentForms.slice(0, 3).map((form) => (
              <View key={form.formNumber} style={styles.recentFormCard}>
                <View>
                  <Text style={styles.formNumber}>Form #{form.formNumber}</Text>
                  <Text style={styles.formDetail}>
                    Requested by: {form.requestedBy}
                  </Text>
                  <Text style={styles.formDetail}>
                    Items: {form.items.length}
                  </Text>
                </View>
              </View>
            ))}
          </View>
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
  header: {
    backgroundColor: '#2196F3',
    padding: 30,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    minWidth: 150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  actionsContainer: {
    marginBottom: 30,
  },
  actionButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#2196F3',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  secondaryButtonText: {
    color: '#2196F3',
  },
  recentFormsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  recentFormCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  formNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  formDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
});