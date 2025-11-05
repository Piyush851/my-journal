import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import styles from '../styles/styles';

export default function HomeScreen({ user, entries, onAddEntry, onEditEntry, onLogout }) {
    const sortedEntries = [...entries].sort((a, b) => b.date - a.date);

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const getMoodEmoji = (mood) => {
        const moods = { happy: '😊', sad: '😢', excited: '🤩', calm: '😌', anxious: '😰' };
        return moods[mood] || '😊';
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>My Journal</Text>
                    <Text style={styles.headerSubtitle}>Hello, {user.name}!</Text>
                </View>
                <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>{entries.length}</Text>
                    <Text style={styles.statLabel}>Total Entries</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>
                        {entries.filter(e => {
                            const today = new Date();
                            return e.date.toDateString() === today.toDateString();
                        }).length}
                    </Text>
                    <Text style={styles.statLabel}>Today</Text>
                </View>
            </View>

            {/* Entries List */}
            <ScrollView style={styles.entriesList} showsVerticalScrollIndicator={false}>
                {sortedEntries.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyEmoji}>📝</Text>
                        <Text style={styles.emptyText}>No entries yet</Text>
                        <Text style={styles.emptySubtext}>Start your journaling journey today!</Text>
                    </View>
                ) : (
                    sortedEntries.map((entry) => (
                        <TouchableOpacity
                            key={entry.id}
                            style={styles.entryCard}
                            onPress={() => onEditEntry(entry)}
                        >
                            <View style={styles.entryHeader}>
                                <Text style={styles.entryMood}>{getMoodEmoji(entry.mood)}</Text>
                                <Text style={styles.entryDate}>{formatDate(entry.date)}</Text>
                            </View>
                            <Text style={styles.entryTitle}>{entry.title}</Text>
                            <Text style={styles.entryContent} numberOfLines={2}>
                                {entry.content}
                            </Text>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>

            {/* Add Button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={onAddEntry}
            >
                <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}