import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Alert,
} from 'react-native';
import ApiService from '../services/api';
import styles from '../styles/styles';

export default function SignupScreen({ navigation, onSignup, onNavigateToLogin }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGoLogin = () => {
        if (onNavigateToLogin) return onNavigateToLogin();
        navigation.navigate('Login');
    };

    const handleSignup = async () => {
        if (!name || !email || !password || !confirm) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (password !== confirm) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }

        try {
            setLoading(true);
            const result = await ApiService.signup(name, email, password);
            onSignup(result.user);
        } catch (err) {
            Alert.alert('Signup Failed', err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.headerSection}>
                <Text style={styles.logo}>📔</Text>
                <Text style={styles.screenTitle}>Create account</Text>
                <Text style={styles.screenSubtitle}>Start your journaling journey</Text>
            </View>

            <View style={styles.formSection}>
                <TextInput
                    style={styles.input}
                    placeholder="Full name"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setName}
                />

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

                <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    placeholderTextColor="#999"
                    value={confirm}
                    onChangeText={setConfirm}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.primaryButton} onPress={handleSignup} disabled={loading}>
                    <Text style={styles.primaryButtonText}>{loading ? 'Creating Account...' : 'Sign Up'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkButton} onPress={handleGoLogin}>
                    <Text style={styles.linkButtonText}>Already have an account? Sign in</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
