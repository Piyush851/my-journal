import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Alert,
} from 'react-native';
import ApiService from '../services/api';
import styles from '../styles/styles';

export default function LoginScreen({ navigation, onLogin, onNavigateToSignup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGoSignup = () => {
        if (onNavigateToSignup) return onNavigateToSignup();
        navigation.navigate('Signup');
    };

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        try {
            setLoading(true);
            const result = await ApiService.login(email, password);
            onLogin(result.user);
        } catch (err) {
            Alert.alert('Login Failed', err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.headerSection}>
                <Text style={styles.logo}>📔</Text>
                <Text style={styles.screenTitle}>Welcome back</Text>
                <Text style={styles.screenSubtitle}>Sign in to continue</Text>
            </View>

            <View style={styles.formSection}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} disabled={loading}>
                    <Text style={styles.primaryButtonText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkButton} onPress={handleGoSignup}>
                    <Text style={styles.linkButtonText}>Create a new account</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
