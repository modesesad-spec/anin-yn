// AUTHENTICATION SYSTEM
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.systemName = 'CUSTOM JAILBREAK';
        this.userNick = 'OWNER';
        this.init();
    }
    
    init() {
        // Cek jika sudah login
        if (localStorage.getItem('jb_logged_in') === 'true') {
            this.currentUser = {
                username: localStorage.getItem('jb_username') || 'admin',
                systemName: localStorage.getItem('jb_system_name') || 'CUSTOM JAILBREAK',
                userNick: localStorage.getItem('jb_user_nick') || 'OWNER'
            };
            
            // Redirect ke dashboard jika di login page
            if (window.location.pathname.includes('index.html') || 
                window.location.pathname === '/') {
                window.location.href = 'dashboard.html';
            }
            
            this.updateUI();
        } else {
            // Redirect ke login jika di dashboard tapi belum login
            if (window.location.pathname.includes('dashboard.html')) {
                window.location.href = 'index.html';
            }
        }
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Login button
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.login());
        }
        
        // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
        
        // Enter key untuk login
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.login();
            });
        }
    }
    
    login() {
        const username = document.getElementById('username')?.value || 'admin';
        const password = document.getElementById('password')?.value || 'admin123';
        const systemName = document.getElementById('system-name')?.value || 'CUSTOM JAILBREAK';
        const userNick = document.getElementById('user-nick')?.value || 'OWNER';
        
        // Simple authentication (bisa dikembangkan)
        if (username && password) {
            // Simpan data ke localStorage
            localStorage.setItem('jb_logged_in', 'true');
            localStorage.setItem('jb_username', username);
            localStorage.setItem('jb_system_name', systemName);
            localStorage.setItem('jb_user_nick', userNick);
            localStorage.setItem('jb_login_time', new Date().toISOString());
            
            // Set current user
            this.currentUser = {
                username: username,
                systemName: systemName,
                userNick: userNick
            };
            
            // Redirect ke dashboard
            window.location.href = 'dashboard.html';
        } else {
            alert('❌ Masukkan username dan password!');
        }
    }
    
    logout() {
        if (confirm('Logout dari sistem?')) {
            localStorage.removeItem('jb_logged_in');
            localStorage.removeItem('jb_username');
            localStorage.removeItem('jb_system_name');
            localStorage.removeItem('jb_user_nick');
            localStorage.removeItem('jb_login_time');
            
            window.location.href = 'index.html';
        }
    }
    
    updateUI() {
        // Update system name
        const systemNameElements = [
            document.getElementById('system-name-display'),
            document.getElementById('system-name-login'),
            document.getElementById('page-title')
        ];
        
        systemNameElements.forEach(el => {
            if (el) el.textContent = this.currentUser.systemName;
        });
        
        // Update user nick
        const userNickElements = [
            document.getElementById('user-nick-display'),
            document.getElementById('setting-user-nick')
        ];
        
        userNickElements.forEach(el => {
            if (el) el.textContent = this.currentUser.userNick;
        });
        
        // Update settings form
        const systemNameInput = document.getElementById('setting-system-name');
        if (systemNameInput) {
            systemNameInput.value = this.currentUser.systemName;
        }
    }
    
    getSystemName() {
        return this.currentUser?.systemName || 'CUSTOM JAILBREAK';
    }
    
    getUserNick() {
        return this.currentUser?.userNick || 'OWNER';
    }
    
    isAuthenticated() {
        return localStorage.getItem('jb_logged_in') === 'true';
    }
}

// Initialize auth system
const auth = new AuthSystem();