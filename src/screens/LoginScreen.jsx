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
import AuthService from '../services/AuthService';
import styles from '../styles/styles';

export default function LoginScreen({ onLogin, onNavigateToSignup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        const result = AuthService.login(email, password);
        if (result.success) {
            onLogin(result.user);
        } else {
            Alert.alert('Error', result.error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.authContainer}>
                <View style={styles.headerSection}>
                    <Text style={styles.logo}>📔</Text>
                    <Text style={styles.title}>My Journal</Text>
                    <Text style={styles.subtitle}>Welcome back! Sign in to continue</Text>
                </View>

                <View style={styles.formSection}>
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

                    <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
                        <Text style={styles.primaryButtonText}>Sign In</Text>
                    </TouchableOpacity>

                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <TouchableOpacity style={styles.secondaryButton} onPress={onNavigateToSignup}>
                        <Text style={styles.secondaryButtonText}>Create New Account</Text>
                    </TouchableOpacity>

                    <Text style={styles.demoText}>Demo: demo@journal.com / demo123</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}