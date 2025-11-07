import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Alert,
} from 'react-native';
import ApiService from '../services/api';
import styles from '../styles/styles';

export default function AddEditEntryScreen({ entry, onSave, onDelete, onCancel }) {
    const [title, setTitle] = useState(entry?.title || '');
    const [content, setContent] = useState(entry?.content || '');
    const [mood, setMood] = useState(entry?.mood || 'happy');
    const [loading, setLoading] = useState(false);

    const moods = [
        { value: 'happy', emoji: '😊', label: 'Happy' },
        { value: 'sad', emoji: '😢', label: 'Sad' },
        { value: 'excited', emoji: '🤩', label: 'Excited' },
        { value: 'calm', emoji: '😌', label: 'Calm' },
        { value: 'anxious', emoji: '😰', label: 'Anxious' },
    ];

    const handleSave = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            setLoading(true);

            let result;

            if (entry) {
                // ✅ Update existing entry
                console.log("📤 Updating entry:", entry._id);
                result = await ApiService.updateEntry(entry._id, {
                    title,
                    content,
                    mood
                });
            } else {
                // ✅ Create new entry
                console.log("📤 Creating new entry");
                result = await ApiService.createEntry({
                    title,
                    content,
                    mood
                });
            }

            console.log("✅ Entry saved:", result);
            onSave(); // tells parent to reload list and go back

        } catch (error) {
            console.log("❌ Save Error:", error.message);
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        Alert.alert(
            "Delete Entry",
            "Are you sure you want to delete this entry?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: deleteEntryBackend
                }
            ]
        );
    };

    const deleteEntryBackend = async () => {
        try {
            console.log("🗑 Deleting entry:", entry._id);
            await ApiService.deleteEntry(entry._id);
            onDelete(); // reload list
        } catch (error) {
            console.log("❌ Delete Error:", error.message);
            Alert.alert("Error", error.message);
        }
    };

    return (
        <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
                <TouchableOpacity onPress={onCancel}>
                    <Text style={styles.modalButton}>Cancel</Text>
                </TouchableOpacity>

                <Text style={styles.modalTitle}>
                    {entry ? 'Edit Entry' : 'New Entry'}
                </Text>

                <TouchableOpacity onPress={handleSave} disabled={loading}>
                    <Text style={[styles.modalButton, styles.modalSaveButton]}>
                        {loading ? "Saving..." : "Save"}
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
                <Text style={styles.label}>How are you feeling?</Text>

                <View style={styles.moodSelector}>
                    {moods.map((m) => (
                        <TouchableOpacity
                            key={m.value}
                            style={[
                                styles.moodOption,
                                mood === m.value && styles.moodOptionSelected
                            ]}
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
                    value={title}
                    onChangeText={setTitle}
                    placeholderTextColor="#999"
                />

                <Text style={styles.label}>What's on your mind?</Text>
                <TextInput
                    style={styles.contentInput}
                    placeholder="Write your thoughts here..."
                    value={content}
                    onChangeText={setContent}
                    multiline
                    textAlignVertical="top"
                    placeholderTextColor="#999"
                />

                {entry && (
                    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                        <Text style={styles.deleteButtonText}>Delete Entry</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
