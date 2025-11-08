import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import HomeScreen from "../screens/HomeScreen";
import StatsScreen from "../screens/StatsScreen";
import AddEditEntryScreen from "../screens/AddEditEntryScreen";
import ApiService from "../services/api";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const data = await ApiService.getCurrentUser();
                setUser(data.user);
            } catch {
                setUser(null);
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    if (loading) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>

                {user === null ? (
                    <>
                        <Stack.Screen name="Login">
                            {(props) => (
                                <LoginScreen
                                    {...props}
                                    onLogin={(userData) => {
                                        setUser(userData);
                                        // ✅ Do NOT navigate manually
                                    }}
                                />
                            )}
                        </Stack.Screen>

                        <Stack.Screen name="Signup">
                            {(props) => (
                                <SignupScreen
                                    {...props}
                                    onSignup={(userData) => {
                                        setUser(userData);
                                        // ✅ Do NOT navigate manually
                                    }}
                                />
                            )}
                        </Stack.Screen>

                    </>
                ) : (
                    <>
                        <Stack.Screen name="Home">
                            {(props) => (
                                <HomeScreen
                                    {...props}
                                    user={user}
                                    onLogout={async () => {
                                        await ApiService.logout();
                                        setUser(null); // This is enough to switch screens
                                    }}

                                />
                            )}
                        </Stack.Screen>

                        <Stack.Screen name="AddEdit">
                            {(props) => (
                                <AddEditEntryScreen
                                    {...props}
                                    entry={props.route.params?.entry}
                                    onSave={props.route.params?.onSave}
                                />
                            )}
                        </Stack.Screen>
                        <Stack.Screen
                            name="Stats"
                            component={StatsScreen}
                            options={{ headerShown: false }}
                        />

                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
