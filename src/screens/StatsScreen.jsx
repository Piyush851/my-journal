import React, { useEffect, useState } from "react";
import 'react-native-svg';
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    Dimensions,
} from "react-native";
import { PieChart, LineChart } from "react-native-gifted-charts";
import styles from "../styles/styles";
import { loadEntriesFromCache } from "../helpers/storage";

const screenWidth = Dimensions.get("window").width;

export default function StatsScreen() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        const cached = await loadEntriesFromCache();
        const normalized = cached.map((e) => ({
            ...e,
            date: new Date(e.date),
        }));
        setEntries(normalized);
    };

    // ✅ Mood Count
    const moodCount = entries.reduce((acc, e) => {
        acc[e.mood] = (acc[e.mood] || 0) + 1;
        return acc;
    }, {});

    const pieData = Object.keys(moodCount).map((mood, index) => ({
        value: moodCount[mood],
        color: ["#60a5fa", "#fb7185", "#fbbf24", "#34d399", "#a78bfa"][index],
        text: moodCount[mood].toString(),
    }));

    // ✅ Last 7 days
    const last7 = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toDateString();
    });

    const dailyEntries = last7.map((day) =>
        entries.filter((e) => e.date.toDateString() === day).length
    );

    const lineData = dailyEntries.map((count, index) => ({
        value: count,
        label: ["6d", "5d", "4d", "3d", "2d", "1d", "Today"][index],
        dataPointColor: "#2563eb",
    }));

    // ✅ Streak
    const uniqueDays = new Set(entries.map((e) => e.date.toDateString()));
    const currentStreak = uniqueDays.size;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.homeTitle}>Analytics</Text>
                <Text style={styles.homeSubtitle}>Your journaling insights</Text>

                {/* ✅ Pie Chart */}
                <Text style={styles.statLabel}>Mood Breakdown</Text>
                {pieData.length > 0 ? (
                    <PieChart
                        data={pieData}
                        radius={110}
                        showText
                        textColor="#1e293b"
                        textSize={14}
                        focusOnPress
                        donut
                        innerRadius={60}
                        innerCircleColor="#fff"
                        strokeWidth={0}   // ✅ No gradient needed
                    />
                ) : (
                    <Text style={styles.emptyText}>Not enough data</Text>
                )}

                {/* ✅ Line Chart */}
                <Text style={[styles.statLabel, { marginTop: 20 }]}>Last 7 Days</Text>

                <LineChart
                    data={lineData}
                    width={screenWidth - 20}
                    height={220}
                    color="#2563eb"
                    hideDataPoints={false}
                    spacing={40}
                    thickness={3}
                    yAxisThickness={0}
                    xAxisThickness={1}
                    xAxisColor="#e2e8f0"
                    hideRules
                    initialSpacing={20}
                />

                {/* ✅ Streak Box */}
                <View
                    style={{
                        marginTop: 24,
                        padding: 20,
                        backgroundColor: "#f1f5f9",
                        borderRadius: 16,
                        borderWidth: 1,
                        borderColor: "#e2e8f0",
                    }}
                >
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "#1e293b" }}>
                        Current Streak
                    </Text>
                    <Text
                        style={{
                            fontSize: 40,
                            fontWeight: "700",
                            color: "#2563eb",
                            marginTop: 5,
                        }}
                    >
                        {currentStreak} days
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
