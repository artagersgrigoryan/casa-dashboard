/**
 * Translation Utilities for Dashboard
 * Common functions for text formatting and translation helpers
 */

class TranslationUtils {
    constructor() {
        this.numberFormatters = new Map();
        this.dateFormatters = new Map();
        this.currencyFormatters = new Map();
        
        this.initializeFormatters();
    }

    /**
     * Initialize formatters for different locales
     */
    initializeFormatters() {
        const locales = {
            hy: 'hy-AM',
            en: 'en-US',
            ru: 'ru-RU'
        };

        // Number formatters
        Object.entries(locales).forEach(([lang, locale]) => {
            this.numberFormatters.set(lang, new Intl.NumberFormat(locale));
            this.dateFormatters.set(lang, new Intl.DateTimeFormat(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }));
            this.currencyFormatters.set(lang, new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: this.getCurrencyForLanguage(lang)
            }));
        });
    }

    /**
     * Get appropriate currency for language
     */
    getCurrencyForLanguage(language) {
        const currencies = {
            hy: 'AMD', // Armenian Dram
            en: 'USD', // US Dollar
            ru: 'RUB'  // Russian Ruble
        };
        return currencies[language] || 'USD';
    }

    /**
     * Format number according to language
     */
    formatNumber(number, language = 'en') {
        const formatter = this.numberFormatters.get(language);
        if (formatter) {
            return formatter.format(number);
        }
        return number.toString();
    }

    /**
     * Format currency according to language
     */
    formatCurrency(amount, language = 'en') {
        const formatter = this.currencyFormatters.get(language);
        if (formatter) {
            return formatter.format(amount);
        }
        return `$${amount.toFixed(2)}`;
    }

    /**
     * Format date according to language
     */
    formatDate(date, language = 'en') {
        const formatter = this.dateFormatters.get(language);
        if (formatter) {
            return formatter.format(date);
        }
        return date.toLocaleDateString();
    }

    /**
     * Format relative time (e.g., "2 hours ago")
     */
    formatRelativeTime(timestamp, language = 'en') {
        const now = new Date();
        const diff = now - new Date(timestamp);
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        const timeUnits = {
            hy: {
                seconds: 'վայրկյան',
                minutes: 'րոպե',
                hours: 'ժամ',
                days: 'օր',
                ago: 'առաջ'
            },
            en: {
                seconds: 'seconds',
                minutes: 'minutes',
                hours: 'hours',
                days: 'days',
                ago: 'ago'
            },
            ru: {
                seconds: 'секунд',
                minutes: 'минут',
                hours: 'часов',
                days: 'дней',
                ago: 'назад'
            }
        };

        const units = timeUnits[language] || timeUnits.en;

        if (days > 0) {
            return `${days} ${units.days} ${units.ago}`;
        } else if (hours > 0) {
            return `${hours} ${units.hours} ${units.ago}`;
        } else if (minutes > 0) {
            return `${minutes} ${units.minutes} ${units.ago}`;
        } else {
            return `${seconds} ${units.seconds} ${units.ago}`;
        }
    }

    /**
     * Pluralize text based on count and language
     */
    pluralize(count, singular, plural, language = 'en') {
        const pluralRules = {
            hy: (count) => count === 1 ? singular : plural,
            en: (count) => count === 1 ? singular : plural,
            ru: (count) => {
                if (count % 10 === 1 && count % 100 !== 11) {
                    return singular;
                } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
                    return plural;
                } else {
                    return plural + 'ов'; // Russian plural form
                }
            }
        };

        const rule = pluralRules[language] || pluralRules.en;
        return rule(count);
    }

    /**
     * Interpolate text with variables
     */
    interpolate(text, variables, language = 'en') {
        return text.replace(/\{(\w+)\}/g, (match, key) => {
            return variables[key] || match;
        });
    }

    /**
     * Capitalize first letter (language-aware)
     */
    capitalize(text, language = 'en') {
        if (!text) return text;
        
        const capitalizeRules = {
            hy: (text) => text.charAt(0).toUpperCase() + text.slice(1),
            en: (text) => text.charAt(0).toUpperCase() + text.slice(1),
            ru: (text) => text.charAt(0).toUpperCase() + text.slice(1)
        };

        const rule = capitalizeRules[language] || capitalizeRules.en;
        return rule(text);
    }

    /**
     * Truncate text with ellipsis
     */
    truncate(text, maxLength, language = 'en') {
        if (text.length <= maxLength) return text;
        
        const ellipsis = {
            hy: '...',
            en: '...',
            ru: '...'
        };
        
        return text.substring(0, maxLength) + (ellipsis[language] || '...');
    }

    /**
     * Format file size
     */
    formatFileSize(bytes, language = 'en') {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Bytes';
        
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        const size = Math.round(bytes / Math.pow(1024, i) * 100) / 100;
        
        const sizeLabels = {
            hy: ['Բայթ', 'ԿԲ', 'ՄԲ', 'ԳԲ'],
            en: ['Bytes', 'KB', 'MB', 'GB'],
            ru: ['Байт', 'КБ', 'МБ', 'ГБ']
        };
        
        const labels = sizeLabels[language] || sizeLabels.en;
        return `${size} ${labels[i]}`;
    }

    /**
     * Validate translation key format
     */
    validateTranslationKey(key) {
        const keyPattern = /^[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)*$/;
        return keyPattern.test(key);
    }

    /**
     * Get language direction (LTR/RTL)
     */
    getLanguageDirection(language) {
        const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
        return rtlLanguages.includes(language) ? 'rtl' : 'ltr';
    }

    /**
     * Sanitize HTML for translation
     */
    sanitizeHtml(html) {
        const div = document.createElement('div');
        div.textContent = html;
        return div.innerHTML;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationUtils;
}

// Global instance
window.TranslationUtils = new TranslationUtils();
