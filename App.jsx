import React, { useState } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddEditEntryScreen from './src/screens/AddEditEntryScreen';
import ApiService from './src/services/api';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);

  // ✅ Load entries from backend on login
  const loadEntries = async () => {
    try {
      const res = await ApiService.getEntries();
      const normalized = res.entries.map(e => ({
        ...e,
        date: new Date(e.date)
      }));
      setEntries(normalized);
    } catch (error) {
      console.log("❌ Error loading entries:", error.message);
    }
  };

  // ✅ LOGIN
  const handleLogin = async (userData) => {
    setUser(userData);
    await loadEntries();
    setCurrentScreen('home');
  };

  // ✅ SIGNUP
  const handleSignup = async (userData) => {
    setUser(userData);
    await loadEntries();
    setCurrentScreen('home');
  };

  // ✅ LOGOUT
  const handleLogout = async () => {
    await ApiService.logout();
    setUser(null);
    setEntries([]);
    setCurrentScreen('login');
  };

  // ✅ ADD ENTRY (backend)
  const handleAddEntry = async () => {
    setEditingEntry(null);
    setCurrentScreen('addEntry');
  };

  const saveNewEntry = async (entryData) => {
    await ApiService.createEntry(entryData);
    await loadEntries(); // refresh
    setCurrentScreen('home');
  };

  // ✅ EDIT ENTRY (backend)
  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setCurrentScreen('editEntry');
  };

  const updateEntry = async (entryData) => {
    await ApiService.updateEntry(editingEntry._id, entryData);
    await loadEntries();
    setEditingEntry(null);
    setCurrentScreen('home');
  };

  // ✅ DELETE ENTRY (backend)
  const deleteEntry = async () => {
    await ApiService.deleteEntry(editingEntry._id);
    await loadEntries();
    setEditingEntry(null);
    setCurrentScreen('home');
  };

  // ✅ SCREEN ROUTING
  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen
            onLogin={handleLogin}
            onNavigateToSignup={() => setCurrentScreen('signup')}
          />
        );

      case 'signup':
        return (
          <SignupScreen
            onSignup={handleSignup}
            onNavigateToLogin={() => setCurrentScreen('login')}
          />
        );

      case 'home':
        return (
          <HomeScreen
            user={user}
            onAddEntry={handleAddEntry}
            onEditEntry={handleEditEntry}
            onLogout={handleLogout}
          />
        );

      case 'addEntry':
        return (
          <AddEditEntryScreen
            onSave={saveNewEntry}
            onCancel={() => setCurrentScreen('home')}
          />
        );

      case 'editEntry':
        return (
          <AddEditEntryScreen
            entry={editingEntry}
            onSave={updateEntry}
            onDelete={deleteEntry}
            onCancel={() => setCurrentScreen('home')}
          />
        );

      default:
        return null;
    }
  };

  return renderScreen();
}
