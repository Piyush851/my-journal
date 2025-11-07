import React, { useState, useEffect } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddEditEntryScreen from './src/screens/AddEditEntryScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);

  useEffect(() => {
    fetch("http://192.168.1.5:5000/api/health")
      .then(res => res.json())
      .then(data => console.log("✅ Connected:", data))
      .catch(err => console.log("❌ Error:", err));
  }, []);


  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentScreen('home');
  };

  const handleSignup = (userData) => {
    setUser(userData);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setUser(null);
    setEntries([]);
    setCurrentScreen('login');
  };

  const handleAddEntry = (entryData) => {
    const newEntry = {
      id: Date.now().toString(),
      ...entryData,
      date: new Date(),
    };
    setEntries([...entries, newEntry]);
    setCurrentScreen('home');
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setCurrentScreen('editEntry');
  };

  const handleUpdateEntry = (entryData) => {
    setEntries(entries.map(e =>
      e.id === editingEntry.id
        ? { ...e, ...entryData, date: e.date }
        : e
    ));
    setEditingEntry(null);
    setCurrentScreen('home');
  };

  const handleDeleteEntry = (entryId) => {
    setEntries(entries.filter(e => e.id !== entryId));
    setEditingEntry(null);
    setCurrentScreen('home');
  };

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
            entries={entries}
            onAddEntry={() => setCurrentScreen('addEntry')}
            onEditEntry={handleEditEntry}
            onLogout={handleLogout}
          />
        );
      case 'addEntry':
        return (
          <AddEditEntryScreen
            onSave={handleAddEntry}
            onCancel={() => setCurrentScreen('home')}
          />
        );
      case 'editEntry':
        return (
          <AddEditEntryScreen
            entry={editingEntry}
            onSave={handleUpdateEntry}
            onDelete={handleDeleteEntry}
            onCancel={() => setCurrentScreen('home')}
          />
        );
      default:
        return null;
    }
  };

  return renderScreen();
}