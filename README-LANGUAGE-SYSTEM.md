# Dashboard Language System Documentation

## Overview

This dashboard implements a comprehensive internationalization (i18n) system following industry best practices. The system supports multiple languages with dynamic switching, fallback mechanisms, and proper text formatting.

## Supported Languages

- **Հայերեն (Armenian)** - Default language
- **English** - International standard
- **Русский (Russian)** - Regional support

## Architecture

### Core Files

1. **`js/language-manager.js`** - Main language management class
2. **`js/translation-utils.js`** - Utility functions for formatting and text manipulation
3. **`translations/hy.json`** - Armenian translations
4. **`translations/en.json`** - English translations
5. **`translations/ru.json`** - Russian translations

### Key Features

- **Dynamic Language Switching** - Instant language changes without page reload
- **Fallback System** - Embedded translations if external files fail
- **Data Attributes** - HTML elements use `data-translate` attributes
- **Persistent Storage** - Language preferences saved in localStorage
- **Event System** - Custom events for language changes
- **Utility Functions** - Number, date, and currency formatting

## Implementation

### HTML Structure

Elements that need translation use `data-translate` attributes:

```html
<h1 data-translate="dashboard.title">Dashboard</h1>
<a href="#" data-translate="nav.home">Home</a>
```

### Translation Keys

Translation keys follow a hierarchical structure:

```
nav.home              → Navigation home link
dashboard.title       → Dashboard title
stats.totalProperties → Stats card label
content.propertyStatus.occupied → Property status text
```

### JavaScript Usage

#### Basic Translation

```javascript
// Get translation for a key
const title = languageManager.t('dashboard.title', 'Default Title');

// Check current language
const currentLang = languageManager.getCurrentLanguage();

// Get supported languages
const languages = languageManager.getSupportedLanguages();
```

#### Language Switching

```javascript
// Change language
await languageManager.setLanguage('en');

// Listen for language changes
document.addEventListener('languageChanged', (event) => {
    console.log('Language changed to:', event.detail.language);
});
```

#### Utility Functions

```javascript
// Format numbers
const formatted = TranslationUtils.formatNumber(1234.56, 'hy');

// Format currency
const currency = TranslationUtils.formatCurrency(99.99, 'ru');

// Format dates
const date = TranslationUtils.formatDate(new Date(), 'en');

// Pluralization
const text = TranslationUtils.pluralize(5, 'property', 'properties', 'en');
```

## Translation Files

### JSON Structure

Each language file follows the same structure:

```json
{
  "nav": {
    "home": "Home",
    "properties": "Properties"
  },
  "dashboard": {
    "title": "Dashboard",
    "subtitle": "Welcome back!"
  }
}
```

### Adding New Languages

1. Create new JSON file in `translations/` directory
2. Add language code to `supportedLanguages` array in `LanguageManager`
3. Update `getCurrencyForLanguage()` method if needed
4. Add locale to `initializeFormatters()` method

### Adding New Content

1. Add `data-translate` attribute to HTML element
2. Add translation key to all language JSON files
3. Update `translatePage()` method if needed

## Best Practices

### 1. Translation Keys

- Use descriptive, hierarchical keys
- Keep keys consistent across languages
- Use lowercase with dots for separation
- Avoid special characters in keys

### 2. Text Content

- Provide context for translators
- Use placeholders for dynamic content: `{count} properties`
- Keep text concise and clear
- Consider text length variations between languages

### 3. HTML Structure

- Always provide fallback text in HTML
- Use semantic HTML elements
- Ensure accessibility with proper ARIA labels
- Test with screen readers

### 4. Performance

- Load translations asynchronously
- Use fallback translations if external files fail
- Cache translations in memory
- Minimize DOM queries during translation

## Error Handling

### Fallback Mechanisms

1. **External File Failure** - Falls back to embedded translations
2. **Missing Translation Key** - Returns default value or key
3. **Invalid Language** - Falls back to English
4. **Network Issues** - Uses cached translations

### Debugging

```javascript
// Enable debug logging
console.log('Current language:', languageManager.getCurrentLanguage());
console.log('Available translations:', languageManager.translations);

// Check specific translation
console.log('Translation for nav.home:', languageManager.t('nav.home'));
```

## Testing

### Manual Testing

1. **Language Switching** - Test all language options
2. **Persistence** - Verify language preference is saved
3. **Fallbacks** - Test with network disconnected
4. **Accessibility** - Test with screen readers

### Automated Testing

```javascript
// Test translation loading
test('should load translations successfully', async () => {
    const manager = new LanguageManager();
    await manager.init();
    expect(manager.initialized).toBe(true);
});

// Test language switching
test('should switch language correctly', async () => {
    await languageManager.setLanguage('ru');
    expect(languageManager.getCurrentLanguage()).toBe('ru');
});
```

## Browser Support

- **Modern Browsers** - Full support (Chrome 60+, Firefox 55+, Safari 12+)
- **ES6 Features** - Classes, async/await, Map, Promise
- **Fallbacks** - Graceful degradation for older browsers

## Performance Considerations

- **Bundle Size** - External translation files reduce main bundle
- **Lazy Loading** - Load only needed language initially
- **Caching** - Browser caching for translation files
- **Memory Usage** - Efficient data structures for translations

## Security

- **XSS Prevention** - HTML sanitization in utility functions
- **Input Validation** - Validate translation keys
- **Content Security Policy** - Compatible with strict CSP
- **Data Sanitization** - Clean user input before translation

## Future Enhancements

1. **RTL Support** - Right-to-left language support
2. **Pluralization Rules** - More complex pluralization logic
3. **Context-Aware Translation** - Gender, formality, etc.
4. **Machine Translation** - Integration with translation APIs
5. **Translation Management** - Admin interface for translations
6. **A/B Testing** - Test different translation versions

## Troubleshooting

### Common Issues

1. **Translations Not Loading**
   - Check file paths and permissions
   - Verify JSON syntax
   - Check browser console for errors

2. **Language Not Switching**
   - Verify event listeners are attached
   - Check localStorage permissions
   - Ensure DOM elements exist

3. **Formatting Issues**
   - Check locale support in browser
   - Verify number/date format compatibility
   - Test with different browsers

### Support

For issues or questions:
1. Check browser console for error messages
2. Verify file structure and permissions
3. Test with different browsers
4. Review this documentation

## License

This language system is part of the Dashboard project and follows the same licensing terms.
