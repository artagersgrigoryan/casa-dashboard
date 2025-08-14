# Dashboard Folder Structure

This document explains the organized folder structure of the Property Management Dashboard.

## 📁 Folder Organization

```
Dashboard/
├── index.html                    # Main entry point (redirects to home)
├── pages/                        # All HTML pages
│   ├── home.html                # Dashboard home page
│   ├── customers.html            # Customers management page
│   ├── settings.html             # Settings page
│   └── [other pages...]         # Additional pages
├── components/                   # Reusable HTML components
│   └── sidebar.html             # Sidebar navigation component
├── js/                          # JavaScript files
│   ├── component-loader.js      # Component loading utility
│   ├── language-manager.js      # Language system
│   ├── translation-utils.js     # Translation utilities
│   └── sidebar.js               # Legacy sidebar (can be removed)
├── styles/                      # CSS stylesheets
│   ├── main.css                 # Main stylesheet
│   ├── components.css           # Component styles
│   ├── design-tokens.css        # CSS custom properties
│   ├── utilities.css            # Utility classes
│   └── themes-optimized.css     # Theme system
├── translations/                 # Language files
│   ├── en.json                  # English translations
│   ├── hy.json                  # Armenian translations
│   └── ru.json                  # Russian translations
├── Assets/                      # Static assets
│   └── Casa.logo.svg           # Logo file
└── themes.css                   # Legacy themes (can be removed)
```

## 🔗 Navigation Structure

### Entry Point
- **`index.html`** → Automatically redirects to `pages/home.html`

### Page Navigation
- **Home**: `pages/home.html`
- **Customers**: `pages/customers.html`
- **Settings**: `pages/settings.html`
- **Properties**: `pages/properties.html` (to be created)
- **Maintenance**: `pages/maintenance.html` (to be created)
- **Finances**: `pages/finances.html` (to be created)
- **Reports**: `pages/reports.html` (to be created)

## 📱 Component System

### Sidebar Component
- **Location**: `components/sidebar.html`
- **Navigation**: All links now point to `../pages/[page].html`
- **Fallback**: Built into `component-loader.js`

### Component Loading
- **Utility**: `js/component-loader.js`
- **Method**: `loadSidebarWithFunctionality('.sidebar-container')`
- **Fallback**: Automatic fallback if component file fails to load

## 🎨 Styling System

### CSS Organization
- **Main**: `styles/main.css` - Core layout and global styles
- **Components**: `styles/components.css` - Page-specific component styles
- **Design Tokens**: `styles/design-tokens.css` - CSS custom properties
- **Utilities**: `styles/utilities.css` - Helper classes
- **Themes**: `styles/themes-optimized.css` - Light/dark theme system

### Header Consistency
- **Dashboard Header**: Used in home page
- **Page Header**: Used in settings, customers, and other pages
- **Main Header**: Used in layouts with search and notifications
- **All headers**: Now consistent size and styling

## 🚀 Benefits of New Structure

### 1. **Better Organization**
- HTML pages are grouped in `pages/` folder
- Components are separated in `components/` folder
- Clear separation of concerns

### 2. **Easier Maintenance**
- Find pages quickly in `pages/` folder
- Component updates in one place
- Consistent file organization

### 3. **Scalability**
- Easy to add new pages
- Simple to create new components
- Clear structure for team collaboration

### 4. **Navigation**
- All internal links updated to use new paths
- Consistent navigation structure
- Proper relative paths for components

## 🔧 How to Add New Pages

### 1. Create HTML File
```bash
# Create new page in pages folder
touch pages/newpage.html
```

### 2. Add to Sidebar
```html
<!-- In components/sidebar.html -->
<li class="nav-item">
    <a href="../pages/newpage.html" class="nav-link" data-page="newpage">
        <i class="fas fa-icon"></i>
        <span data-translate="nav.newpage">New Page</span>
    </a>
</li>
```

### 3. Update Component Loader
```javascript
// In js/component-loader.js, add to pageMap
const pageMap = {
    // ... existing pages
    'newpage': 'newpage'
};
```

### 4. Add Translations
```json
// In translations/en.json
{
    "nav": {
        "newpage": "New Page"
    }
}
```

## 📝 File Naming Conventions

- **HTML Pages**: `kebab-case.html` (e.g., `customer-management.html`)
- **Components**: `kebab-case.html` (e.g., `data-table.html`)
- **JavaScript**: `kebab-case.js` (e.g., `form-validator.js`)
- **CSS**: `kebab-case.css` (e.g., `button-styles.css`)

## 🔍 Troubleshooting

### Navigation Issues
- Check that all links use `../pages/` prefix from components
- Verify page names match exactly in sidebar navigation
- Ensure component loader pageMap includes all pages

### Component Loading Issues
- Verify `components/` folder path is correct
- Check that `component-loader.js` is loaded before other scripts
- Ensure `.sidebar-container` element exists in HTML

### Styling Issues
- Check that CSS files are properly imported in `main.css`
- Verify design tokens are defined in `design-tokens.css`
- Ensure theme variables are set in `themes-optimized.css`

## 📚 Related Documentation

- **Sidebar Component**: See `README-SIDEBAR-COMPONENT.md`
- **Language System**: See `README-LANGUAGE-SYSTEM.md`
- **CSS Architecture**: See `styles/README.md`
