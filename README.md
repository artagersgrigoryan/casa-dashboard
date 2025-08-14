# 🏠 Property Management Dashboard

A modern, responsive web application for managing property portfolios, customers, employees, and financial operations.

## ✨ Features

- **📊 Dashboard Overview** - Real-time statistics and charts
- **👥 Customer Management** - Complete customer database and interactions
- **🏢 Property Management** - Property listings, details, and status tracking
- **👨‍💼 Employee Management** - Staff information and performance tracking
- **💰 Financial Management** - Income/expense tracking and reporting
- **⚙️ Settings & Configuration** - User preferences and system settings
- **🌍 Multi-language Support** - English, Armenian, and Russian
- **📱 Responsive Design** - Works on all devices and screen sizes

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd Dashboard
   ```

2. Open `index.html` in your browser, or serve with a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. Navigate to `http://localhost:8000` in your browser

## 📁 Project Structure

```
Dashboard/
├── Assets/                 # Images and logos
├── components/            # Reusable HTML components
│   ├── sidebar.html      # Navigation sidebar
│   ├── dashboard-header.html
│   └── page-header.html
├── js/                   # JavaScript functionality
│   ├── component-loader.js
│   ├── language-manager.js
│   ├── sidebar.js
│   └── translation-utils.js
├── pages/                # Main application pages
│   ├── home.html         # Dashboard overview
│   ├── customers.html    # Customer management
│   ├── properties.html   # Property listings
│   ├── property-detail.html
│   ├── employees.html    # Employee management
│   ├── finances.html     # Financial tracking
│   └── settings.html     # User settings
├── styles/               # CSS styling
│   ├── main.css         # Main stylesheet
│   ├── components.css   # Component styles
│   ├── utilities.css    # Utility classes
│   └── design-tokens.css # CSS variables
└── translations/         # Multi-language support
    ├── en.json          # English
    ├── hy.json          # Armenian
    └── ru.json          # Russian
```

## 🎨 Design System

### Color Palette
- **Primary**: #4361ee (Blue)
- **Secondary**: #3f37c9 (Purple)
- **Accent**: #4cc9f0 (Cyan)
- **Success**: #4ade80 (Green)
- **Warning**: #fbbf24 (Yellow)
- **Danger**: #f87171 (Red)

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Base Size**: 16px
- **Line Height**: 1.6

### Spacing
- **Base Unit**: 0.25rem (4px)
- **Scale**: 0.25rem, 0.5rem, 0.75rem, 1rem, 1.25rem, 1.5rem, 2rem, 2.5rem, 3rem, 4rem, 5rem

## 🔧 Technical Details

### Frontend Technologies
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **Chart.js** - Data visualization
- **Font Awesome** - Icon library

### Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Performance Features
- **Optimized CSS** - Consolidated stylesheets
- **Efficient JavaScript** - Modular architecture
- **Responsive Images** - Optimized for different screen sizes
- **Lazy Loading** - Components load on demand

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints at:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌍 Internationalization

Supports three languages:
- **English (en)** - Default language
- **Armenian (hy)** - Հայերեն
- **Russian (ru)** - Русский

Language switching is available in the page header and persists across sessions.

## 🚀 Deployment

### GitHub Pages
1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select source branch (usually `main` or `master`)
4. Your dashboard will be available at `https://username.github.io/repository-name`

### Netlify
1. Connect your GitHub repository
2. Build command: (none needed for static site)
3. Publish directory: `.`
4. Deploy automatically on push

### Vercel
1. Import your GitHub repository
2. Framework preset: Other
3. Deploy automatically on push

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -m 'Add feature'`
5. Push: `git push origin feature-name`
6. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Chart.js** for data visualization
- **Font Awesome** for icons
- **CSS Grid & Flexbox** for modern layouts

## 📞 Support

For questions or support, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue with details

---

**Built with ❤️ for modern property management**
