import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StatusBar,
    TextInput,
} from 'react-native';
import ApiService from '../services/api';
import styles from '../styles/styles';
import { saveEntriesToCache, loadEntriesFromCache } from '../helpers/storage';

export default function HomeScreen({ navigation, user, onLogout }) {
    const [entries, setEntries] = useState([]);
    const [search, setSearch] = useState("");
    const [filterMood, setFilterMood] = useState("all");
    const [sortOrder, setSortOrder] = useState("newest");

    // ✅ Load from cache instantly
    const loadCache = async () => {
        const cached = await loadEntriesFromCache();

        const normalized = cached.map(e => ({
            ...e,
            date: e.date ? new Date(e.date) : new Date(),
        }));

        setEntries(normalized);
    };


    // ✅ Load from backend & update cache
    const loadFromServer = useCallback(async () => {
        try {
            const res = await ApiService.getEntries();
            const normalized = res.entries.map(e => ({
                ...e,
                date: new Date(e.date),
                syncStatus: "synced",
            }));
            setEntries(normalized);
            saveEntriesToCache(normalized);
        } catch (err) {
            console.log("❌ Online load error:", err.message);
        }
    }, []);


    useEffect(() => {
        loadCache();       // Instant load
        loadFromServer();  // Background refresh

        const unsub = navigation.addListener("focus", loadFromServer);
        return unsub;
    }, []);

    // ✅ Save new entry (optimistic UI)
    const handleAddEntry = async (data) => {
        const tempId = "temp_" + Date.now();
        const newEntry = {
            _id: tempId,
            ...data,
            date: new Date(),
            syncStatus: "pending",
        };

        setEntries(prev => {
            const updated = [...prev, newEntry];
            saveEntriesToCache(updated);
            return updated;
        });

        try {
            await ApiService.createEntry(data);
            loadFromServer();
        } catch (err) {
            console.log("❌ Failed to sync new entry:", err.message);
        }
    };

    // ✅ Update entry (optimistic)
    const handleUpdateEntry = async (id, data) => {
        setEntries(prev => {
            const updated = prev.map(e =>
                e._id === id ? { ...e, ...data, syncStatus: "pending" } : e
            );
            saveEntriesToCache(updated);
            return updated;
        });

        try {
            await ApiService.updateEntry(id, data);
            loadFromServer();
        } catch (err) {
            console.log("❌ Update sync error:", err.message);
        }
    };

    // ✅ Delete entry (optimistic)
    const handleDeleteEntry = async (id) => {
        setEntries(prev => {
            const updated = prev.filter(e => e._id !== id);
            saveEntriesToCache(updated);
            return updated;
        });

        try {
            await ApiService.deleteEntry(id);
            loadFromServer();
        } catch (err) {
            console.log("❌ Delete sync error:", err.message);
        }
    };

    // ✅ Search + Filter + Sort
    const filteredEntries = entries
        .filter((e) => {
            if (filterMood !== "all" && e.mood !== filterMood) return false;
            if (search.trim()) {
                const q = search.toLowerCase();
                return (
                    e.title?.toLowerCase().includes(q) ||
                    e.content?.toLowerCase().includes(q)
                );
            }
            return true;
        })
        .sort((a, b) => (sortOrder === "newest" ? b.date - a.date : a.date - b.date));

    const moodEmoji = {
        happy: "😊",
        sad: "😢",
        excited: "🤩",
        calm: "😌",
        anxious: "😰",
    };

    const formatDate = (date) => {
        if (!date) return "Unknown";
        if (!(date instanceof Date)) date = new Date(date);

        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.customHeader}>
                <View>
                    <Text style={styles.homeTitle}>My Journal</Text>
                    <Text style={styles.homeSubtitle}>Hello, {user?.name}</Text>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate("Stats")}
                    style={styles.logoutChip}
                >
                    <Text style={styles.logoutChipText}>Stats</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={onLogout} style={styles.logoutChip}>
                    <Text style={styles.logoutChipText}>Logout</Text>
                </TouchableOpacity>
            </View>

            {/* Search */}
            <TextInput
                placeholder="Search entries..."
                placeholderTextColor="#999"
                style={styles.searchBar}
                value={search}
                onChangeText={setSearch}
            />

            {/* Mood Filters */}
            <View style={styles.filterRow}>
                {[
                    { key: "all", label: "All" },
                    { key: "happy", label: "😊 Happy" },
                    { key: "sad", label: "😢 Sad" },
                    { key: "excited", label: "🤩 Excited" },
                    { key: "calm", label: "😌 Calm" },
                    { key: "anxious", label: "😰 Anxious" },
                ].map((m) => (
                    <TouchableOpacity
                        key={m.key}
                        style={[
                            styles.filterChip,
                            filterMood === m.key && styles.filterChipSelected,
                        ]}
                        onPress={() => setFilterMood(m.key)}
                    >
                        <Text
                            style={[
                                styles.filterChipText,
                                filterMood === m.key && styles.filterChipSelectedText,
                            ]}
                        >
                            {m.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>


            {/* Entries */}
            <ScrollView style={styles.entriesList} showsVerticalScrollIndicator={false}>
                {filteredEntries.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyEmoji}>📝</Text>
                        <Text style={styles.emptyText}>No matching entries</Text>
                        <Text style={styles.emptySubtext}>Try adjusting search or filters</Text>
                    </View>
                ) : (
                    filteredEntries.map((entry) => (
                        <TouchableOpacity
                            key={entry._id}
                            style={styles.entryCard}
                            onPress={() =>
                                navigation.navigate("AddEdit", {
                                    entry,
                                    onSave: (data) => handleUpdateEntry(entry._id, data),
                                    onDelete: () => handleDeleteEntry(entry._id),
                                })
                            }
                        >
                            <View style={styles.entryHeader}>
                                <Text style={styles.entryMood}>{moodEmoji[entry.mood]}</Text>
                                <Text style={styles.entryDate}>{formatDate(entry.date)}</Text>
                            </View>

                            <Text style={styles.entryTitle}>{entry.title}</Text>
                            <Text style={styles.entryContent} numberOfLines={2}>
                                {entry.content}
                            </Text>

                            {entry.syncStatus === "pending" && (
                                <Text style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>
                                    Syncing…
                                </Text>
                            )}
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>

            {/* Add button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() =>
                    navigation.navigate("AddEdit", {
                        onSave: handleAddEntry,
                    })
                }
            >
                <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
