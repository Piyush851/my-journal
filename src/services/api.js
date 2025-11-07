import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from "../config/apiConfig";


class ApiService {
    constructor() {
        this.token = null;
    }

    async setToken(token) {
        this.token = token;
        if (token) {
            await AsyncStorage.setItem('authToken', token);
        } else {
            await AsyncStorage.removeItem('authToken');
        }
    }

    async getToken() {
        if (!this.token) {
            this.token = await AsyncStorage.getItem('authToken');
        }
        return this.token;
    }

    async request(endpoint, options = {}) {
        const token = await this.getToken();

        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options.headers,
            },
        };

        try {
            console.log(`📡 API Call: ${API_URL}${endpoint}`);
            const response = await fetch(`${API_URL}${endpoint}`, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            return data;
        } catch (error) {
            console.error('❌ API Error:', error.message);
            throw error;
        }
    }

    // Auth endpoints
    async login(email, password) {
        const data = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        if (data.token) {
            await this.setToken(data.token);
        }

        return data;
    }

    async signup(name, email, password) {
        console.log("📤 Sending signup request to:", `${API_URL}/auth/signup`);

        const data = await this.request('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        });

        if (data.token) {
            await this.setToken(data.token);
        }

        return data;
    }

    async logout() {
        await this.setToken(null);
    }

    async getCurrentUser() {
        return await this.request('/auth/me');
    }

    // Entry endpoints
    async getEntries() {
        return await this.request('/entries');
    }

    async getEntry(id) {
        return await this.request(`/entries/${id}`);
    }

    async createEntry(entryData) {
        return await this.request('/entries', {
            method: 'POST',
            body: JSON.stringify(entryData),
        });
    }

    async updateEntry(id, entryData) {
        return await this.request(`/entries/${id}`, {
            method: 'PUT',
            body: JSON.stringify(entryData),
        });
    }

    async deleteEntry(id) {
        return await this.request(`/entries/${id}`, {
            method: 'DELETE',
        });
    }

    async getStats() {
        return await this.request('/entries/stats/summary');
    }
}

export default new ApiService();