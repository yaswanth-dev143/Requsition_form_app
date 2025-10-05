import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { BottomNavBar } from './components/BottomNavBar';
import { FormEditor } from './components/FormEditor';
import { FormList } from './components/FormList';
import { HomePage } from './components/HomePage';
import { SearchBar } from './components/SearchBar';

// Available unit options
const UNIT_OPTIONS = [
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

export default function App() {
  const [screen, setScreen] = useState('home'); // 'home', 'search', 'form', or 'recent'
  const [forms, setForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [currentForm, setCurrentForm] = useState(null);
  const [showUnitPicker, setShowUnitPicker] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    date: 'all',
    sortBy: 'newest'
  });
  
  // Form fields
  const [requestedBy, setRequestedBy] = useState('');
  const [storeIncharge, setStoreIncharge] = useState('');
  const [items, setItems] = useState([
    { itemName: '', quantity: '', unit: '', purpose: '', remarks: '' }
  ]);

  useEffect(() => {
    loadForms();
  }, []);

  // Apply search and filters to forms
  useEffect(() => {
    let result = [...forms];
    
    // Apply text search
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      result = result.filter(form => 
        // Search in form number
        String(form.formNumber).includes(searchLower) ||
        // Search in requester name
        form.requestedBy.toLowerCase().includes(searchLower) ||
        // Search in store incharge
        form.storeIncharge.toLowerCase().includes(searchLower) ||
        // Search in items
        form.items.some(item =>
          item.itemName.toLowerCase().includes(searchLower) ||
          item.purpose.toLowerCase().includes(searchLower) ||
          item.remarks?.toLowerCase().includes(searchLower)
        )
      );
    }
    
    // Apply date filter
    if (activeFilters.date !== 'all') {
      const now = new Date();
      const dayInMs = 24 * 60 * 60 * 1000;
      
      switch (activeFilters.date) {
        case 'today':
          result = result.filter(form => {
            const formDate = new Date(form.date);
            return (now - formDate) < dayInMs;
          });
          break;
        case 'week':
          result = result.filter(form => {
            const formDate = new Date(form.date);
            return (now - formDate) < (7 * dayInMs);
          });
          break;
        case 'month':
          result = result.filter(form => {
            const formDate = new Date(form.date);
            return (now - formDate) < (30 * dayInMs);
          });
          break;
      }
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return activeFilters.sortBy === 'newest' 
        ? dateB - dateA 
        : dateA - dateB;
    });
    
    setFilteredForms(result);
  }, [forms, searchText, activeFilters]);

  const loadForms = async () => {
    try {
      const savedForms = await AsyncStorage.getItem('requisitionForms');
      if (savedForms) {
        setForms(JSON.parse(savedForms));
      }
    } catch (error) {
      console.error('Error loading forms:', error);
    }
  };

  const saveForms = async (updatedForms) => {
    try {
      await AsyncStorage.setItem('requisitionForms', JSON.stringify(updatedForms));
      setForms(updatedForms);
    } catch (error) {
      console.error('Error saving forms:', error);
    }
  };

  const getNextFormNumber = () => {
    if (forms.length === 0) return 1;
    return Math.max(...forms.map(f => f.formNumber)) + 1;
  };

  const addItem = () => {
    setItems([...items, { itemName: '', quantity: '', unit: '', purpose: '', remarks: '' }]);
  };

  const removeItem = (index) => {
    if (items.length === 1) {
      Alert.alert('Error', 'At least one item is required');
      return;
    }
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const validateForm = () => {
    if (!requestedBy.trim()) {
      Alert.alert('Validation Error', 'Requested By is required');
      return false;
    }
    if (!storeIncharge.trim()) {
      Alert.alert('Validation Error', 'Store In-charge is required');
      return false;
    }
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item.itemName.trim()) {
        Alert.alert('Validation Error', `Item ${i + 1}: Item Name is required`);
        return false;
      }
      if (!item.quantity.trim() || isNaN(item.quantity) || parseFloat(item.quantity) <= 0) {
        Alert.alert('Validation Error', `Item ${i + 1}: Valid positive quantity is required`);
        return false;
      }
      if (!item.unit.trim()) {
        Alert.alert('Validation Error', `Item ${i + 1}: Unit is required`);
        return false;
      }
      if (!item.purpose.trim()) {
        Alert.alert('Validation Error', `Item ${i + 1}: Purpose is required`);
        return false;
      }
    }
    return true;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const generatePDFHTML = (formNumber, date, reqBy, storeInch, itemsList) => {
    const itemRows = itemsList.map((item, index) => `
      <tr>
        <td>${item.itemName}</td>
        <td style="text-align: center;">${item.quantity}</td>
        <td style="text-align: center;">${item.unit}</td>
        <td>${item.purpose}</td>
        <td>${item.remarks || '-'}</td>
      </tr>
    `).join('');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
            
            body {
              font-family: 'Open Sans', sans-serif;
              padding: 40px;
              margin: 0;
              color: #2c3e50;
              line-height: 1.6;
              background-color: #ffffff;
            }

            * {
              box-sizing: border-box;
            }

            .document {
              max-width: 1000px;
              margin: 0 auto;
              background: #ffffff;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
              border-radius: 8px;
              padding: 40px;
            }

            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #3498db;
              position: relative;
            }

            .title {
              font-size: 32px;
              font-weight: 700;
              color: #2c3e50;
              margin-bottom: 20px;
              text-transform: uppercase;
              letter-spacing: 2px;
            }

            .info-row {
              display: flex;
              justify-content: space-between;
              padding: 0 40px;
              font-size: 15px;
              color: #34495e;
            }

            .field {
              margin: 25px 0;
              padding: 15px;
              background-color: #f8f9fa;
              border-radius: 6px;
              border-left: 4px solid #3498db;
            }

            .field strong {
              color: #2c3e50;
              font-weight: 600;
            }

            table {
              width: 100%;
              border-collapse: separate;
              border-spacing: 0;
              margin: 25px 0;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            th {
              background-color: #3498db;
              color: white;
              padding: 15px;
              text-align: left;
              font-weight: 600;
              font-size: 14px;
              text-transform: uppercase;
            }

            td {
              padding: 12px 15px;
              border-bottom: 1px solid #e1e1e1;
              font-size: 14px;
            }

            tr:nth-child(even) {
              background-color: #f8f9fa;
            }

            tr:last-child td {
              border-bottom: none;
            }

            tr:hover {
              background-color: #f1f4f7;
            }

            .footer {
              margin-top: 50px;
              padding-top: 30px;
              border-top: 2px solid #3498db;
            }

            .signature-section {
              margin-top: 40px;
              display: flex;
              justify-content: space-between;
            }

            .signature-box {
              flex: 1;
              max-width: 300px;
              margin: 0 20px;
            }

            .signature-line {
              margin-top: 40px;
              border-top: 1px solid #34495e;
              padding-top: 10px;
              font-size: 14px;
              color: #7f8c8d;
              text-align: center;
            }

            .label {
              font-weight: 600;
              color: #34495e;
              margin-right: 10px;
            }

            .value {
              color: #2c3e50;
              font-weight: normal;
            }

            @media print {
              body {
                padding: 0;
                background: white;
              }
              .document {
                box-shadow: none;
                padding: 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="document">
            <div class="header">
              <div class="title">REQUISITION FORM</div>
              <div class="info-row">
                <div><span class="label">Requisition No:</span><span class="value">${formNumber}</span></div>
                <div><span class="label">Date:</span><span class="value">${date}</span></div>
              </div>
            </div>
            
            <div class="field">
              <span class="label">Requested By:</span>
              <span class="value">${reqBy}</span>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th style="text-align: center;">Quantity</th>
                  <th style="text-align: center;">Unit</th>
                  <th>Purpose</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                ${itemRows}
              </tbody>
            </table>

            <div class="footer">
              <div class="field">
                <span class="label">Store In-charge:</span>
                <span class="value">${storeInch}</span>
              </div>
              
              <div class="signature-section">
                <div class="signature-box">
                  <div class="signature-line">
                    Store In-charge Signature
                  </div>
                </div>
                <div class="signature-box">
                  <div class="signature-line">
                    Requester Signature
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  const exportPDF = async () => {
    if (!validateForm()) return;

    try {
      const formNumber = currentForm ? currentForm.formNumber : getNextFormNumber();
      const date = currentForm ? currentForm.date : new Date().toISOString();
      const formattedDate = formatDate(date);

      const html = generatePDFHTML(formNumber, formattedDate, requestedBy, storeIncharge, items);
      
      const { uri } = await Print.printToFileAsync({ html });
      
      // Save form data
      const newForm = {
        formNumber,
        date,
        requestedBy,
        storeIncharge,
        items,
        pdfUri: uri,
      };

      let updatedForms;
      if (currentForm) {
        updatedForms = forms.map(f => f.formNumber === formNumber ? newForm : f);
      } else {
        updatedForms = [...forms, newForm];
      }
      
      await saveForms(updatedForms);

      // Share PDF
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert('Success', 'PDF generated successfully!');
      }

      // Reset form
      resetForm();
      setScreen('list');
    } catch (error) {
      Alert.alert('Error', 'Failed to generate PDF: ' + error.message);
    }
  };

  const resetForm = () => {
    setRequestedBy('');
    setStoreIncharge('');
    setItems([{ itemName: '', quantity: '', unit: '', purpose: '', remarks: '' }]);
    setCurrentForm(null);
  };

  const openForm = (form) => {
    setCurrentForm(form);
    setRequestedBy(form.requestedBy);
    setStoreIncharge(form.storeIncharge);
    setItems(form.items);
    setScreen('form');
  };

  const reExportPDF = async (form) => {
    try {
      const formattedDate = formatDate(form.date);
      const html = generatePDFHTML(form.formNumber, formattedDate, form.requestedBy, form.storeIncharge, form.items);
      const { uri } = await Print.printToFileAsync({ html });
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to export PDF: ' + error.message);
    }
  };

  const deleteForm = (formNumber) => {
    Alert.alert(
      'Delete Form',
      'Are you sure you want to delete this form?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedForms = forms.filter(f => f.formNumber !== formNumber);
            saveForms(updatedForms);
          }
        }
      ]
    );
  };

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return (
          <HomePage
            formsCount={forms.length}
            recentForms={forms.slice(0, 3)}
            onNewForm={() => {
              resetForm();
              setScreen('form');
            }}
            onViewForms={() => setScreen('search')}
          />
        );
      
      case 'search':
        return (
          <>
            <SearchBar
              searchText={searchText}
              onSearchChange={setSearchText}
              activeFilters={activeFilters}
              onFilterChange={setActiveFilters}
            />
            <FormList
              forms={filteredForms}
              onNewForm={() => {
                resetForm();
                setScreen('form');
              }}
              onEditForm={openForm}
              onExportForm={reExportPDF}
              onDeleteForm={deleteForm}
              formatDate={formatDate}
            />
          </>
        );
      
      case 'form':
        return (
          <FormEditor
            currentForm={currentForm}
            requestedBy={requestedBy}
            setRequestedBy={setRequestedBy}
            storeIncharge={storeIncharge}
            setStoreIncharge={setStoreIncharge}
            items={items}
            updateItem={updateItem}
            addItem={addItem}
            removeItem={removeItem}
            onExport={exportPDF}
            onBack={() => setScreen('search')}
          />
        );

      case 'recent':
        return (
          <FormList
            forms={forms.slice(0, 10)} // Show last 10 forms
            onNewForm={() => {
              resetForm();
              setScreen('form');
            }}
            onEditForm={openForm}
            onExportForm={reExportPDF}
            onDeleteForm={deleteForm}
            formatDate={formatDate}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {renderScreen()}
      </View>
      <BottomNavBar
        currentScreen={screen}
        onScreenChange={(newScreen) => {
          if (newScreen === 'form') {
            resetForm();
          }
          setScreen(newScreen);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
    marginBottom: 60, // Height of the bottom navigation bar
  },
});