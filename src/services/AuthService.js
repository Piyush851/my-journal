class AuthService {
    constructor() {
        this.users = [
            { email: 'demo@journal.com', password: 'demo123', name: 'Demo User' }
        ];
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        return user ? { success: true, user } : { success: false, error: 'Invalid credentials' };
    }

    signup(email, password, name) {
        if (this.users.find(u => u.email === email)) {
            return { success: false, error: 'Email already exists' };
        }
        const user = { email, password, name };
        this.users.push(user);
        return { success: true, user };
    }
}

export default new AuthService();