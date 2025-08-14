/**
 * Language Manager for Dashboard
 * Implements i18n best practices with dynamic language switching
 */

class LanguageManager {
    constructor() {
        this.currentLanguage = 'hy'; // Default to Armenian
        this.supportedLanguages = ['hy', 'en', 'ru'];
        this.translations = {};
        this.initialized = false;
        
        this.init();
    }

    /**
     * Initialize the language manager
     */
    async init() {
        try {
            // Load translations
            await this.loadTranslations();
            
            // Set initial language from localStorage or default
            const savedLanguage = localStorage.getItem('language') || 'hy';
            await this.setLanguage(savedLanguage);
            
            // Set up event listeners
            this.setupEventListeners();
            
            this.initialized = true;
            console.log('Language Manager initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Language Manager:', error);
        }
    }

    /**
     * Load all translation files
     */
    async loadTranslations() {
        try {
            const [armenian, english, russian] = await Promise.all([
                this.fetchTranslationFile('hy'),
                this.fetchTranslationFile('en'),
                this.fetchTranslationFile('ru')
            ]);

            this.translations = {
                hy: armenian,
                en: english,
                ru: russian
            };
        } catch (error) {
            console.error('Failed to load translations:', error);
            // Fallback to embedded translations
            this.loadFallbackTranslations();
        }
    }

    /**
     * Fetch translation file from server
     */
    async fetchTranslationFile(language) {
        try {
            const response = await fetch(`../translations/${language}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.warn(`Failed to fetch ${language}.json, using fallback`);
            return this.getFallbackTranslations(language);
        }
    }

    /**
     * Load fallback translations if external files fail
     */
    loadFallbackTranslations() {
        this.translations = {
            hy: this.getFallbackTranslations('hy'),
            en: this.getFallbackTranslations('en'),
            ru: this.getFallbackTranslations('ru')
        };
    }

    /**
     * Get fallback translations (embedded in code)
     */
    getFallbackTranslations(language) {
        const fallbackTranslations = {
            hy: {
                nav: {
                    title: 'Անշարժ գույքի կառավարում',
                    dashboard: 'Գլխավոր էջ',
                    customers: 'Հաճախորդներ',
                    properties: 'Գույքեր',
                    maintenance: 'Նորոգում',
                    finances: 'Ֆինանսներ',
            
                    settings: 'Կարգավորումներ'
                },
                dashboard: {
                    title: 'Գլխավոր էջ',
                    subtitle: 'Բարի գալուստ! Ահա թե ինչ է կատարվում ձեր գույքի հետ:',
                    theme: 'Թեմա'
                },
                stats: {
                    totalProperty: 'Ընդհանուր գույքեր',
                    occupiedApartments: 'Զբաղված բնակարաններ',
                    monthlyIncome: 'Ամսական եկամուտ',
                    maintenanceRequests: 'Նորոգման հարցումներ'
                },
                content: {
                    recentProperties: 'Վերջին գույքեր',
                    recentActivity: 'Վերջին գործունեություն',
                    propertyStatus: {
                        occupied: 'Զբաղված',
                        available: 'Հասանելի',
                        maintenance: 'Նորոգում'
                    }
                },
                activity: {
                    newTenant: 'Նոր վարձակալ տեղափոխվեց A1 բնակարան',
                    maintenanceRequest: 'Նորոգման հարցում C2 բնակարանի համար',
                    rentPayment: 'Վարձավճար ստացվեց B3 բնակարանից',
                    inspectionCompleted: 'Գույքի ստուգում ավարտված է',
                    listingPublished: 'Նոր գույքի հայտարարություն հրապարակված է'
                },
                time: {
                    hoursAgo: 'ժամ առաջ',
                    daysAgo: 'օր առաջ'
                },
                user: {
                    name: 'Ադմինիստրատոր',
                    role: 'Ադմինիստրատոր'
                }
            },
            en: {
                nav: {
                    title: 'Property Management',
                    dashboard: 'Dashboard',
                    customers: 'Customers',
                    properties: 'Properties',
                    maintenance: 'Maintenance',
                    finances: 'Finances',
            
                    settings: 'Settings'
                },
                dashboard: {
                    title: 'Dashboard',
                    subtitle: 'Welcome! Here\'s what\'s happening with your property:',
                    theme: 'Theme'
                },
                stats: {
                    totalProperty: 'Total Property',
                    occupiedApartments: 'Occupied Apartments',
                    monthlyIncome: 'Monthly Income',
                    maintenanceRequests: 'Maintenance Requests'
                },
                content: {
                    recentProperties: 'Recent Properties',
                    recentActivity: 'Recent Activity',
                    propertyStatus: {
                        occupied: 'Occupied',
                        available: 'Available',
                        maintenance: 'Maintenance'
                    }
                },
                activity: {
                    newTenant: 'New tenant moved into A1 apartment',
                    maintenanceRequest: 'Maintenance request for C2 apartment',
                    rentPayment: 'Rent received from B3 apartment',
                    inspectionCompleted: 'Property inspection completed',
                    listingPublished: 'New property listing published'
                },
                time: {
                    hoursAgo: 'hours ago',
                    daysAgo: 'days ago'
                },
                user: {
                    name: 'Admin User',
                    role: 'Administrator'
                }
            },
            ru: {
                nav: {
                    title: 'Управление недвижимостью',
                    dashboard: 'Панель управления',
                    customers: 'Клиенты',
                    properties: 'Недвижимость',
                    maintenance: 'Обслуживание',
                    finances: 'Финансы',
            
                    settings: 'Настройки'
                },
                dashboard: {
                    title: 'Панель управления',
                    subtitle: 'Добро пожаловать! Вот что происходит с вашей недвижимостью:',
                    theme: 'Тема'
                },
                stats: {
                    totalProperty: 'Всего объектов',
                    occupiedApartments: 'Занятые квартиры',
                    monthlyIncome: 'Месячный доход',
                    maintenanceRequests: 'Заявки на обслуживание'
                },
                content: {
                    recentProperties: 'Последние объекты',
                    recentActivity: 'Последняя активность',
                    propertyStatus: {
                        occupied: 'Занят',
                        available: 'Доступен',
                        maintenance: 'Обслуживание'
                    }
                },
                activity: {
                    newTenant: 'Новый арендатор въехал в квартиру A1',
                    maintenanceRequest: 'Заявка на обслуживание квартиры C2',
                    rentPayment: 'Получена арендная плата за квартиру B3',
                    inspectionCompleted: 'Осмотр недвижимости завершен',
                    listingPublished: 'Опубликовано новое объявление о недвижимости'
                },
                time: {
                    hoursAgo: 'часов назад',
                    daysAgo: 'дней назад'
                },
                user: {
                    name: 'Администратор',
                    role: 'Администратор'
                }
            }
        };

        return fallbackTranslations[language] || fallbackTranslations['en'];
    }

    /**
     * Set language and update UI
     */
    async setLanguage(language) {
        if (!this.supportedLanguages.includes(language)) {
            console.warn(`Unsupported language: ${language}`);
            language = 'en'; // Fallback to English
        }

        this.currentLanguage = language;
        
        // Update HTML lang attribute
        document.documentElement.setAttribute('lang', language);
        
        // Save to localStorage
        localStorage.setItem('language', language);
        
        // Update language selector
        this.updateLanguageSelector(language);
        
        // Translate all text content
        this.translatePage();
        
        // Dispatch custom event for other components
        this.dispatchLanguageChangeEvent(language);
        
        console.log(`Language changed to: ${language}`);
    }

    /**
     * Update language selector UI
     */
    updateLanguageSelector(language) {
        const languageSelector = document.getElementById('languageSelector');
        if (languageSelector) {
            languageSelector.value = language;
        }
    }

    /**
     * Translate the entire page
     */
    translatePage() {
        if (!this.translations[this.currentLanguage]) {
            console.error(`No translations found for language: ${this.currentLanguage}`);
            return;
        }

        const t = this.translations[this.currentLanguage];

        // Translate data-translate attributes first
        this.translateDataTranslateElements(t);
        
        // Translate navigation
        this.translateNavigation(t.nav);
        
        // Translate dashboard content
        this.translateDashboard(t.dashboard);
        
        // Translate stats
        this.translateStats(t.stats);
        
        // Translate content cards
        this.translateContentCards(t.content);
        
        // Translate activity items
        this.translateActivityItems(t.activity, t.time);
        
        // Translate user info
        this.translateUserInfo(t.user);
    }

    /**
     * Translate elements with data-translate attributes
     */
    translateDataTranslateElements(translations) {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getNestedTranslation(translations, key);
            if (translation) {
                element.textContent = translation;
            }
        });
    }

    /**
     * Get nested translation value
     */
    getNestedTranslation(translations, key) {
        const keys = key.split('.');
        let value = translations;
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return null;
            }
        }
        
        return value;
    }

    /**
     * Translate navigation items
     */
    translateNavigation(navTranslations) {
        const navItems = document.querySelectorAll('.nav-link');
        navItems.forEach((item, index) => {
            const keys = ['dashboard', 'customers', 'properties', 'maintenance', 'finances', 'settings'];
            if (keys[index] && navTranslations[keys[index]]) {
                const span = item.querySelector('span');
                if (span) {
                    span.textContent = navTranslations[keys[index]];
                }
            }
        });
    }

    /**
     * Translate dashboard header
     */
    translateDashboard(dashboardTranslations) {
        const title = document.querySelector('.dashboard-title');
        const subtitle = document.querySelector('.dashboard-subtitle');
        const themeLabel = document.querySelector('.theme-label');

        if (title && dashboardTranslations.title) {
            title.textContent = dashboardTranslations.title;
        }
        if (subtitle && dashboardTranslations.subtitle) {
            subtitle.textContent = dashboardTranslations.subtitle;
        }
        if (themeLabel && dashboardTranslations.theme) {
            themeLabel.textContent = dashboardTranslations.theme;
        }
    }

    /**
     * Translate stats cards
     */
    translateStats(statsTranslations) {
        const statLabels = document.querySelectorAll('.stat-label');
        const labels = [
            'totalProperty',
            'occupiedApartments', 
            'monthlyIncome',
            'maintenanceRequests'
        ];

        statLabels.forEach((label, index) => {
            if (labels[index] && statsTranslations[labels[index]]) {
                label.textContent = statsTranslations[labels[index]];
            }
        });
    }

    /**
     * Translate content card titles
     */
    translateContentCards(contentTranslations) {
        const cardTitles = document.querySelectorAll('.card-title');
        const titles = ['recentProperties', 'recentActivity'];

        cardTitles.forEach((title, index) => {
            if (titles[index] && contentTranslations[titles[index]]) {
                title.textContent = contentTranslations[titles[index]];
            }
        });
    }

    /**
     * Translate activity items
     */
    translateActivityItems(activityTranslations, timeTranslations) {
        const activityItems = document.querySelectorAll('.activity-item > div:first-child');
        const timeItems = document.querySelectorAll('.activity-time');
        
        const activities = [
            'newTenant',
            'maintenanceRequest',
            'rentPayment',
            'inspectionCompleted',
            'listingPublished'
        ];

        activityItems.forEach((item, index) => {
            if (activities[index] && activityTranslations[activities[index]]) {
                item.textContent = activityTranslations[activities[index]];
            }
        });

        // Translate time indicators
        timeItems.forEach((timeItem) => {
            const text = timeItem.textContent;
            if (text.includes('hours ago') && timeTranslations.hoursAgo) {
                timeItem.textContent = text.replace('hours ago', timeTranslations.hoursAgo);
            } else if (text.includes('days ago') && timeTranslations.hoursAgo) {
                timeItem.textContent = text.replace('days ago', timeTranslations.daysAgo);
            }
        });
    }

    /**
     * Translate user info
     */
    translateUserInfo(userTranslations) {
        const userName = document.querySelector('.user-name');
        const userRole = document.querySelector('.user-role');

        if (userName && userTranslations.name) {
            userName.textContent = userTranslations.name;
        }
        if (userRole && userTranslations.role) {
            userRole.textContent = userTranslations.role;
        }
    }

    /**
     * Get translation for a specific key
     */
    t(key, defaultValue = '') {
        if (!this.initialized) {
            return defaultValue;
        }

        const keys = key.split('.');
        let translation = this.translations[this.currentLanguage];

        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                return defaultValue;
            }
        }

        return translation;
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        const languageSelector = document.getElementById('languageSelector');
        if (languageSelector) {
            languageSelector.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        }
    }

    /**
     * Dispatch custom event for language change
     */
    dispatchLanguageChangeEvent(language) {
        const event = new CustomEvent('languageChanged', {
            detail: { language, translations: this.translations[language] }
        });
        document.dispatchEvent(event);
    }

    /**
     * Get current language
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    /**
     * Get supported languages
     */
    getSupportedLanguages() {
        return [...this.supportedLanguages];
    }

    /**
     * Check if language is supported
     */
    isLanguageSupported(language) {
        return this.supportedLanguages.includes(language);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageManager;
}

// Global instance
window.LanguageManager = LanguageManager;

// Create global instance for easy access
window.languageManager = new LanguageManager();
