import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveEntriesToCache = async (entries) => {
    try {
        await AsyncStorage.setItem("journal_entries", JSON.stringify(entries));
    } catch (err) {
        console.log("❌ Cache save error:", err);
    }
};

export const loadEntriesFromCache = async () => {
    try {
        const data = await AsyncStorage.getItem("journal_entries");
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.log("❌ Cache load error:", err);
        return [];
    }
};
