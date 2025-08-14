/**
 * DASHBOARD CORE - Consolidated JavaScript Functionality
 * Combines component loading, sidebar management, language management, and utilities
 */

// ========================================
// CORE DASHBOARD CLASS
// ========================================
class DashboardCore {
    constructor() {
        this.components = new Map();
        this.loadedComponents = new Set();
        this.currentPage = this.getCurrentPage();
        this.sidebarLoaded = false;
        this.languageManager = null;
        this.initialized = false;
    }

    // Initialize dashboard
    async init() {
        try {
            console.log('Initializing Dashboard Core...');
            
            // Initialize language manager
            this.languageManager = new LanguageManager();
            await this.waitForLanguageManager();
            
            // Load sidebar
            await this.loadSidebar();
            
            // Set up global event listeners
            this.setupGlobalListeners();
            
            this.initialized = true;
            console.log('Dashboard Core initialized successfully');
            
            // Dispatch ready event
            document.dispatchEvent(new CustomEvent('dashboardReady'));
            
        } catch (error) {
            console.error('Failed to initialize Dashboard Core:', error);
        }
    }

    // Wait for language manager to be ready
    async waitForLanguageManager() {
        while (!this.languageManager.initialized) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    // Get current page identifier
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '');
        
        const pageMap = {
            'home': 'home',
            'customers': 'customers',
            'properties': 'properties',
            'property-detail': 'properties',
            'employees': 'employees',
            'finances': 'finances',
            'settings': 'settings'
        };
        
        return pageMap[filename] || 'home';
    }

    // Load sidebar component
    async loadSidebar() {
        const sidebarContainer = document.querySelector('.sidebar-container');
        if (!sidebarContainer) {
            console.error('Sidebar container not found');
            return false;
        }

        try {
            // Try to load from components folder
            const componentPath = this.getComponentPath('sidebar');
            const response = await fetch(componentPath);
            
            if (response.ok) {
                const html = await response.text();
                sidebarContainer.innerHTML = html;
                
                // Initialize sidebar functionality
                this.initializeSidebar();
                
                this.sidebarLoaded = true;
                console.log('Sidebar loaded successfully');
                return true;
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error loading sidebar:', error);
            // Use fallback sidebar
            this.createSidebarFallback(sidebarContainer);
            return false;
        }
    }

    // Get component path based on current location
    getComponentPath(componentName) {
        if (window.location.pathname.includes('/pages/')) {
            return `../components/${componentName}.html`;
        } else {
            return `components/${componentName}.html`;
        }
    }

    // Create fallback sidebar if loading fails
    createSidebarFallback(container) {
        const fallbackHTML = `
            <aside class="sidebar">
                <div class="sidebar-header">
                    <h1>
                        <i class="fas fa-building"></i>
                        <span data-translate="nav.title">Property Management</span>
                    </h1>
                </div>
                
                <nav class="sidebar-nav">
                    <ul class="nav-menu">
                        <li class="nav-item">
                            <a href="home.html" class="nav-link" data-page="home">
                                <i class="fas fa-home"></i>
                                <span data-translate="nav.home">Dashboard</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="customers.html" class="nav-link" data-page="customers">
                                <i class="fas fa-users"></i>
                                <span data-translate="nav.customers">Customers</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="properties.html" class="nav-link" data-page="properties">
                                <i class="fas fa-building"></i>
                                <span data-translate="nav.properties">Properties</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="employees.html" class="nav-link" data-page="employees">
                                <i class="fas fa-user-tie"></i>
                                <span data-translate="nav.employees">Employees</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="finances.html" class="nav-link" data-page="finances">
                                <i class="fas fa-chart-line"></i>
                                <span data-translate="nav.finances">Finances</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="settings.html" class="nav-link" data-page="settings">
                                <i class="fas fa-cog"></i>
                                <span data-translate="nav.settings">Settings</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
        `;
        
        container.innerHTML = fallbackHTML;
        this.initializeSidebar();
        this.sidebarLoaded = true;
    }

    // Initialize sidebar functionality
    initializeSidebar() {
        // Set active page
        this.setActivePage();
        
        // Set up language selector
        this.setupLanguageSelector();
        
        // Set up mobile sidebar toggle
        this.setupMobileSidebar();
    }

    // Set active page in sidebar
    setActivePage() {
        const currentPage = this.getCurrentPage();
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const pageAttr = link.getAttribute('data-page');
            if (pageAttr === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Set up language selector
    setupLanguageSelector() {
        const languageSelector = document.querySelector('.page-header .language-selector');
        if (languageSelector && this.languageManager) {
            const currentLang = document.documentElement.lang || 'en';
            languageSelector.value = currentLang;
            
            languageSelector.addEventListener('change', (e) => {
                const newLang = e.target.value;
                this.languageManager.setLanguage(newLang);
            });
        }
    }

    // Set up mobile sidebar toggle
    setupMobileSidebar() {
        const toggleBtn = document.querySelector('.mobile-sidebar-toggle');
        const sidebar = document.querySelector('.sidebar');
        
        if (toggleBtn && sidebar) {
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.toggle('show');
            });
        }
    }

    // Set up global event listeners
    setupGlobalListeners() {
        // Handle window resize
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Handle page visibility change
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    }

    // Handle window resize
    handleResize() {
        // Add responsive behavior here if needed
        console.log('Window resized');
    }

    // Handle page visibility change
    handleVisibilityChange() {
        if (document.hidden) {
            console.log('Page hidden');
        } else {
            console.log('Page visible');
        }
    }

    // Load component by name
    async loadComponent(componentName, targetSelector) {
        const target = document.querySelector(targetSelector);
        if (!target) {
            console.error(`Target selector '${targetSelector}' not found for component '${componentName}'`);
            return false;
        }

        if (this.loadedComponents.has(componentName)) {
            console.log(`Component '${componentName}' already loaded`);
            return true;
        }

        try {
            const componentPath = this.getComponentPath(componentName);
            const response = await fetch(componentPath);
            
            if (response.ok) {
                const html = await response.text();
                target.innerHTML = html;
                this.loadedComponents.add(componentName);
                
                // Dispatch component loaded event
                document.dispatchEvent(new CustomEvent('componentLoaded', {
                    detail: { componentName, target }
                }));
                
                return true;
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error loading component '${componentName}':`, error);
            return false;
        }
    }
}

// ========================================
// LANGUAGE MANAGER
// ========================================
class LanguageManager {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {};
        this.initialized = false;
        this.init();
    }

    async init() {
        try {
            await this.loadTranslations();
            this.setLanguage(this.getBrowserLanguage());
            this.initialized = true;
            console.log('Language Manager initialized');
        } catch (error) {
            console.error('Failed to initialize Language Manager:', error);
        }
    }

    async loadTranslations() {
        try {
            const response = await fetch('../translations/en.json');
            if (response.ok) {
                this.translations.en = await response.json();
            }
            
            const hyResponse = await fetch('../translations/hy.json');
            if (hyResponse.ok) {
                this.translations.hy = await response.json();
            }
            
            const ruResponse = await fetch('../translations/ru.json');
            if (ruResponse.ok) {
                this.translations.ru = await response.json();
            }
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    getBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0];
        
        if (['en', 'hy', 'ru'].includes(langCode)) {
            return langCode;
        }
        return 'en';
    }

    setLanguage(language) {
        if (!this.translations[language]) {
            console.error(`Language '${language}' not supported`);
            return;
        }

        this.currentLanguage = language;
        document.documentElement.lang = language;
        
        // Apply translations
        this.applyTranslations();
        
        // Save preference
        localStorage.setItem('preferredLanguage', language);
        
        console.log(`Language changed to: ${language}`);
    }

    applyTranslations() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key);
            if (translation) {
                element.textContent = translation;
            }
        });
    }

    getTranslation(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLanguage];
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return null;
            }
        }
        
        return value;
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
const DashboardUtils = {
    // Show notification
    showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto-hide
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    },

    // Get notification icon based on type
    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    },

    // Format currency
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },

    // Format date
    formatDate(date, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        
        return new Intl.DateTimeFormat('en-US', {
            ...defaultOptions,
            ...options
        }).format(new Date(date));
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Generate random ID
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    },

    // Validate email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Validate phone number
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
};

// ========================================
// GLOBAL INITIALIZATION
// ========================================
let dashboardCore;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded, initializing Dashboard Core...');
    
    try {
        dashboardCore = new DashboardCore();
        await dashboardCore.init();
        
        // Dispatch global event
        window.dispatchEvent(new CustomEvent('dashboardInitialized', {
            detail: { dashboardCore }
        }));
        
    } catch (error) {
        console.error('Failed to initialize dashboard:', error);
    }
});

// Export for use in other scripts
window.DashboardCore = DashboardCore;
window.DashboardUtils = DashboardUtils;
window.dashboardCore = dashboardCore;
