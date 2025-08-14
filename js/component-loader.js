// Component Loader Utility
class ComponentLoader {
    constructor() {
        this.components = new Map();
        this.loadedComponents = new Set();
        this.currentPage = this.getCurrentPage();
        this.sidebarLoaded = false;
    }

    // Load a component by name
    async loadComponent(componentName, targetSelector) {
        const target = document.querySelector(targetSelector);
        if (!target) {
            console.error(`Target selector '${targetSelector}' not found for component '${componentName}'`);
            return false;
        }

        // Check if component is already loaded
        if (this.loadedComponents.has(componentName)) {
            console.log(`Component '${componentName}' already loaded`);
            return true;
        }

        // Safety check: prevent infinite loops
        if (target.innerHTML.trim() !== '') {
            console.log(`Target already has content, skipping component load for '${componentName}'`);
            this.loadedComponents.add(componentName);
            return true;
        }

        try {
            // Try to load from components folder
            // Detect if we're in pages/ folder and adjust path accordingly
            let componentPath;
            if (window.location.pathname.includes('/pages/')) {
                // We're in pages folder, go up one level to reach components
                componentPath = `../components/${componentName}.html`;
            } else {
                // We're in root or other location, use relative path
                componentPath = `components/${componentName}.html`;
            }
            
            console.log(`Attempting to load component from: ${componentPath}`);
            const response = await fetch(componentPath);
            if (response.ok) {
                const html = await response.text();
                target.innerHTML = html;
                this.loadedComponents.add(componentName);
                console.log(`Component '${componentName}' loaded successfully from ${componentPath}`);
                
                // Dispatch custom event for component loaded
                const event = new CustomEvent('componentLoaded', {
                    detail: { componentName, target }
                });
                document.dispatchEvent(event);
                
                return true;
            } else {
                throw new Error(`HTTP error! status: ${response.status} for ${componentPath}`);
            }
        } catch (error) {
            console.error(`Error loading component '${componentName}':`, error);
            return false;
        }
    }

    // Load multiple components
    async loadComponents(components) {
        const promises = components.map(comp => 
            this.loadComponent(comp.name, comp.target)
        );
        
        try {
            const results = await Promise.allSettled(promises);
            const successCount = results.filter(r => r.status === 'fulfilled' && r.value).length;
            console.log(`Loaded ${successCount}/${components.length} components successfully`);
            return results;
        } catch (error) {
            console.error('Error loading components:', error);
            return [];
        }
    }

    // Get component HTML synchronously (for fallback)
    getComponentHTML(componentName) {
        const componentHTMLs = {
            'sidebar': `
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
                                    <span data-translate="nav.dashboard">1. Dashboard</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="customers.html" class="nav-link" data-page="customers">
                                    <i class="fas fa-users"></i>
                                    <span data-translate="nav.customers">2. Customers</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="properties.html" class="nav-link" data-page="properties">
                                    <i class="fas fa-building"></i>
                                    <span data-translate="nav.properties">3. Properties</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="employees.html" class="nav-link" data-page="employees">
                                    <i class="fas fa-users"></i>
                                    <span data-translate="nav.employees">4. Employees</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="maintenance.html" class="nav-link" data-page="maintenance">
                                    <i class="fas fa-tools"></i>
                                    <span data-translate="nav.maintenance">5. Maintenance</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="finances.html" class="nav-link" data-page="finances">
                                    <i class="fas fa-chart-line"></i>
                                    <span data-translate="nav.finances">6. Finances</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="settings.html" class="nav-link" data-page="settings">
                                    <i class="fas fa-cog"></i>
                                    <span data-translate="nav.settings">7. Settings</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    
                    <div class="sidebar-footer">
                        <div class="user-profile">
                            <img src="https://via.placeholder.com/40" alt="User Avatar">
                            <div class="user-info">
                                <div class="user-name" data-translate="user.name">Admin User</div>
                                <div class="user-role" data-translate="user.role">Administrator</div>
                            </div>
                        </div>
                    </div>
                </aside>
            `
        };

        return componentHTMLs[componentName] || '';
    }

    // Load component with fallback
    async loadComponentWithFallback(componentName, targetSelector) {
        const success = await this.loadComponent(componentName, targetSelector);
        
        if (!success) {
            console.log(`Loading fallback for component '${componentName}'`);
            const target = document.querySelector(targetSelector);
            if (target) {
                const fallbackHTML = this.getComponentHTML(componentName);
                if (fallbackHTML) {
                    target.innerHTML = fallbackHTML;
                    this.loadedComponents.add(componentName);
                    console.log(`Component '${componentName}' loaded from fallback`);
                    
                    // Dispatch custom event for component loaded
                    const event = new CustomEvent('componentLoaded', {
                        detail: { componentName, target, fallback: true }
                    });
                    document.dispatchEvent(event);
                    
                    return true;
                } else {
                    console.error(`No fallback HTML available for component '${componentName}'`);
                }
            } else {
                console.error(`Target selector '${targetSelector}' not found for fallback`);
            }
        }
        
        return success;
    }

    // Get current page from URL or data attribute
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '');
        console.log('Detected filename:', filename);
        
        // Map filenames to page identifiers
        const pageMap = {
            'home': 'home',
            'customers': 'customers',
            'properties': 'properties',
            'property-detail': 'properties',
            'employees': 'employees',
            'maintenance': 'maintenance',
            'finances': 'finances',
            'settings': 'settings'
        };
        
        const page = pageMap[filename] || 'home';
        console.log('Mapped to page:', page);
        return page;
    }

    // Set active page in navigation
    setActivePage() {
        if (!this.sidebarLoaded) {
            console.log('Sidebar not loaded yet, skipping active page setting');
            return;
        }
        
        console.log('Setting active page:', this.currentPage);
        // Remove all active classes
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current page
        const activeLink = document.querySelector(`[data-page="${this.currentPage}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            console.log('Active link set:', this.currentPage);
        } else {
            console.warn('Active link not found for page:', this.currentPage);
        }
    }

    // Bind sidebar events
    bindSidebarEvents() {
        if (!this.sidebarLoaded) {
            console.log('Sidebar not loaded yet, skipping event binding');
            return;
        }
        
        console.log('Binding sidebar events...');
        
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-link')) {
                const link = e.target.closest('.nav-link');
                const page = link.dataset.page;
                
                // Update active state
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Store current page for navigation
                sessionStorage.setItem('currentPage', page);
            }
        });

        // Handle mobile sidebar toggle
        const mobileToggle = document.querySelector('.mobile-sidebar-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                document.querySelector('.sidebar').classList.toggle('active');
            });
        }

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            const sidebar = document.querySelector('.sidebar');
            const mobileToggle = document.querySelector('.mobile-sidebar-toggle');
            
            if (window.innerWidth <= 768 && 
                sidebar && 
                sidebar.classList.contains('active') && 
                !sidebar.contains(e.target) && 
                !mobileToggle?.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });
    }

    // Load sidebar with full functionality
    async loadSidebarWithFunctionality(targetSelector) {
        // Prevent multiple initializations
        if (this.sidebarLoaded) {
            console.log('Sidebar already loaded, skipping initialization');
            return true;
        }
        
        console.log('Loading sidebar with full functionality...');
        const success = await this.loadComponentWithFallback('sidebar', targetSelector);
        
        if (success) {
            this.sidebarLoaded = true;
            
            // Wait a bit for DOM to be ready
            await new Promise(resolve => setTimeout(resolve, 100));
            
            this.setActivePage();
            this.bindSidebarEvents();
            console.log('Sidebar loaded with full functionality');
        } else {
            console.error('Failed to load sidebar component');
        }
        
        return success;
    }
}

// Initialize component loader (only once)
if (!window.componentLoader) {
    window.componentLoader = new ComponentLoader();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComponentLoader;
}
