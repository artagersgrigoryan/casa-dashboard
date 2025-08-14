# Sidebar Component System

This document explains how to use the updated sidebar component system in the Property Management Dashboard.

## Overview

The sidebar has been converted from a static HTML inclusion to a proper component system that:
- Loads dynamically from a separate component file
- Provides fallback functionality if the component file can't be loaded
- Integrates with the existing language and theme systems
- Is easily maintainable and reusable across all pages

## File Structure

```
Dashboard/
├── components/
│   └── sidebar.html          # Sidebar component HTML
├── js/
│   ├── component-loader.js   # Component loading utility
│   ├── sidebar.js           # Sidebar management logic
│   ├── language-manager.js  # Language system
│   └── translation-utils.js # Translation utilities
└── [other HTML files]       # Pages that use the sidebar
```

## How to Use

### 1. Basic Setup

Include the component loader script before other scripts in your HTML:

```html
<script src="js/component-loader.js"></script>
<script src="js/sidebar.js"></script>
<script src="js/language-manager.js"></script>
<script src="js/translation-utils.js"></script>
```

### 2. HTML Structure

Add a sidebar container in your HTML:

```html
<div class="dashboard-container">
    <!-- Sidebar Container -->
    <div class="sidebar-container"></div>
    
    <!-- Main Content -->
    <main class="main-content">
        <!-- Your page content here -->
    </main>
</div>
```

### 3. JavaScript Initialization

Initialize the sidebar component when the DOM loads:

```javascript
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load sidebar component
        await window.componentLoader.loadComponentWithFallback('sidebar', '.sidebar-container');
        
        // Initialize language manager
        const languageManager = new LanguageManager();
        
        // Wait for language manager to be ready
        while (!languageManager.initialized) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        console.log('Page initialized successfully');
        
    } catch (error) {
        console.error('Failed to initialize page:', error);
    }
});
```

## Component Loading Methods

### Method 1: Load with Fallback (Recommended)
```javascript
await window.componentLoader.loadComponentWithFallback('sidebar', '.sidebar-container');
```
This method tries to load the component file first, and if it fails, uses the built-in fallback HTML.

### Method 2: Load Component Only
```javascript
await window.componentLoader.loadComponent('sidebar', '.sidebar-container');
```
This method only loads from the component file and returns false if it fails.

### Method 3: Load Multiple Components
```javascript
await window.componentLoader.loadComponents([
    { name: 'sidebar', target: '.sidebar-container' },
    { name: 'header', target: '.header-container' }
]);
```

## Features

### Automatic Active Page Detection
The sidebar automatically detects the current page and highlights the appropriate navigation item.

### Language Support
All sidebar text supports translation through the `data-translate` attributes.

### Theme Integration
The sidebar works with both light and dark themes.

### Mobile Responsiveness
Includes mobile sidebar toggle functionality.

### Error Handling
Comprehensive error handling with fallback content if the component file can't be loaded.

## Customization

### Adding New Navigation Items
Edit `components/sidebar.html` to add new navigation items:

```html
<li class="nav-item">
    <a href="newpage.html" class="nav-link" data-page="newpage">
        <i class="fas fa-icon"></i>
        <span data-translate="nav.newpage">New Page</span>
    </a>
</li>
```

### Modifying the Fallback
Update the `getComponentHTML()` method in `component-loader.js` to modify the fallback content.

### Styling
The sidebar uses CSS classes defined in `styles/main.css`. Customize the appearance by modifying these styles.

## Troubleshooting

### Sidebar Not Loading
1. Check browser console for error messages
2. Verify the `components/sidebar.html` file exists
3. Ensure the component loader script is loaded before other scripts
4. Check that the `.sidebar-container` element exists in your HTML

### Active Page Not Highlighted
1. Verify the current page filename matches the expected format
2. Check that navigation links have the correct `data-page` attributes
3. Ensure the sidebar is fully loaded before setting the active page

### Language Not Working
1. Verify the language manager is initialized
2. Check that translation files exist and are properly formatted
3. Ensure `data-translate` attributes are present on translatable elements

## Performance Considerations

- The component loader caches loaded components to avoid re-fetching
- Fallback content is built-in and doesn't require additional network requests
- Components are loaded asynchronously to avoid blocking page rendering

## Browser Support

The component system works in all modern browsers that support:
- ES6+ features (async/await, arrow functions)
- Fetch API
- Custom Events
- Template literals

For older browsers, consider using a polyfill or transpiler.
