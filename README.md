# Requisition Form App

A mobile application for managing and tracking requisition forms digitally. This app streamlines the process of creating, managing, and tracking requisition requests with features like PDF generation, form searching, and digital record keeping.

## Features

- 📝 Create and edit requisition forms
- 📱 User-friendly mobile interface
- 🔍 Search and filter forms
- 📄 PDF generation and sharing
- 📊 Form history tracking
- 💾 Offline data storage
- 🔄 Recent forms quick access
- 📱 Bottom navigation for easy access

## Tech Stack

- **Frontend Framework**: React Native with Expo
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: AsyncStorage for local data persistence
- **UI Components**: 
  - React Native Paper
  - Expo Vector Icons
  - Custom components
- **PDF Generation**: Expo Print
- **File Sharing**: Expo Sharing
- **Navigation**: Bottom Tab Navigation

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, Mac only)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Requisition_Form_App
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on Android/iOS:
   ```bash
   # For Android
   npm run android

   # For iOS
   npm run ios
   ```

### Installing the APK

1. Download the APK from the latest release
2. Enable "Install from Unknown Sources" in your Android settings
3. Open the APK file to install
4. Launch the app

## Project Structure

```
Requisition_Form_App/
├── assets/               # App icons and images
├── components/          # React Native components
│   ├── BottomNavBar.js  # Bottom navigation
│   ├── FormEditor.js    # Form creation/editing
│   ├── FormList.js      # List of forms
│   ├── HomePage.js      # Home screen
│   └── SearchBar.js     # Search functionality
├── app/                 # App navigation and screens
├── constants/          # App constants and theme
├── scripts/           # Build and utility scripts
├── App.js             # Main app component
├── app.json          # Expo configuration
├── package.json      # Dependencies and scripts
└── eas.json         # EAS Build configuration
```

## Core Components

### FormEditor
- Handles form creation and editing
- Validates form inputs
- Generates PDF documents

### FormList
- Displays list of all forms
- Supports sorting and filtering
- Handles form deletion

### SearchBar
- Text-based search functionality
- Date range filtering
- Sort order selection

### BottomNavBar
- Navigation between main sections
- Home, Search, Create, and Recent views

## Data Structure

Forms are stored with the following structure:
```Json```
```
{
  formNumber: number,
  date: string,
  requestedBy: string,
  storeIncharge: string,
  items: [
    {
      itemName: string,
      quantity: string,
      unit: string,
      purpose: string,
      remarks: string
    }
  ],
  pdfUri: string
}
```

