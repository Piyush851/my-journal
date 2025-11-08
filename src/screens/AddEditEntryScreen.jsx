import React, { useState } from "react";
import {
    View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert,
} from "react-native";
import ApiService from "../services/api";
import styles from "../styles/styles";

export default function AddEditEntryScreen({ route, navigation }) {
    const entry = route.params?.entry || null;
    const onSave = route.params?.onSave;

    const [title, setTitle] = useState(entry?.title || "");
    const [content, setContent] = useState(entry?.content || "");
    const [mood, setMood] = useState(entry?.mood || "happy");
    const [loading, setLoading] = useState(false);

    const moods = [
        { value: "happy", emoji: "😊", label: "Happy" },
        { value: "sad", emoji: "😢", label: "Sad" },
        { value: "excited", emoji: "🤩", label: "Excited" },
        { value: "calm", emoji: "😌", label: "Calm" },
        { value: "anxious", emoji: "😰", label: "Anxious" },
    ];

    const handleSave = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        try {
            setLoading(true);
            await onSave?.({ title, content, mood });
            navigation.goBack();
        } catch (err) {
            Alert.alert("Error", err.message);
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = () => {
        Alert.alert("Delete Entry", "Are you sure you want to delete this entry?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    try {
                        setLoading(true);
                        await ApiService.deleteEntry(entry._id);
                        navigation.goBack();
                    } catch (err) {
                        Alert.alert("Delete Failed", err.message);
                    } finally {
                        setLoading(false);
                    }
                },
            },
        ]);
    };

    return (
        <SafeAreaView style={styles.modalContainer}>
            {/* Custom Header */}
            <View style={styles.editorHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.headerBack}>Cancel</Text>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>{entry ? "Edit Entry" : "New Entry"}</Text>

                <TouchableOpacity onPress={handleSave} disabled={loading}>
                    <Text style={styles.headerSave}>{loading ? "Saving..." : "Save"}</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
                <Text style={styles.label}>How are you feeling?</Text>
                <View style={styles.moodSelector}>
                    {moods.map((m) => (
                        <TouchableOpacity
                            key={m.value}
                            style={[styles.moodOption, mood === m.value && styles.moodOptionSelected]}
                            onPress={() => setMood(m.value)}
                        >
                            <Text style={styles.moodEmoji}>{m.emoji}</Text>
                            <Text style={styles.moodLabel}>{m.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.titleInput}
                    placeholder="Give your entry a title..."
                    placeholderTextColor="#999"
                    value={title}
                    onChangeText={setTitle}
                />

                <Text style={styles.label}>What's on your mind?</Text>
                <TextInput
                    style={styles.contentInput}
                    placeholder="Write your thoughts here..."
                    placeholderTextColor="#999"
                    value={content}
                    onChangeText={setContent}
                    multiline
                    textAlignVertical="top"
                />

                {entry && (
                    <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete} disabled={loading}>
                        <Text style={styles.deleteButtonText}>Delete Entry</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
