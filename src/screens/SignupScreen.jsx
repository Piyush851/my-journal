import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Alert,
} from 'react-native';
import ApiService from '../services/api';   // ✅ Correct import
import styles from '../styles/styles';

export default function SignupScreen({ onSignup, onNavigateToLogin }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }

        try {
            setLoading(true);

            console.log("📤 Calling backend API:", email);

            const result = await ApiService.signup(name, email, password);

            console.log("✅ Signup success:", result);

            onSignup(result.user);   // ✅ Pass real backend user

        } catch (error) {
            console.log("❌ Signup error:", error.message);
            Alert.alert('Signup Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.authContainer}>

                <View style={styles.headerSection}>
                    <Text style={styles.logo}>📔</Text>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Start your journaling journey</Text>
                </View>

                <View style={styles.formSection}>

                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor="#999"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#999"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholderTextColor="#999"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        placeholderTextColor="#999"
                    />

                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={handleSignup}
                        disabled={loading}
                    >
                        <Text style={styles.primaryButtonText}>
                            {loading ? "Creating Account..." : "Sign Up"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.linkButton} onPress={onNavigateToLogin}>
                        <Text style={styles.linkButtonText}>
                            Already have an account? Sign In
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    );
}
