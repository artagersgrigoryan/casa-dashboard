// Sidebar Component JavaScript
class SidebarManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.sidebarLoaded = false;
        console.log('SidebarManager initialized for page:', this.currentPage);
        this.init();
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

    // Initialize sidebar
    init() {
        console.log('Initializing sidebar...');
        this.loadSidebar();
        this.restoreSidebarState();
    }

    // Load sidebar content
    async loadSidebar() {
        console.log('Loading sidebar from components/sidebar.html...');
        const sidebarContainer = document.querySelector('.sidebar-container');
        
        if (!sidebarContainer) {
            console.error('Sidebar container not found!');
            return;
        }
        
        console.log('Sidebar container found, loading content...');
        
        try {
            // Try to load from component file first
            const response = await fetch('components/sidebar.html');
            if (response.ok) {
                const html = await response.text();
                console.log('Sidebar HTML loaded from component, length:', html.length);
                sidebarContainer.innerHTML = html;
                this.sidebarLoaded = true;
                this.setActivePage();
                console.log('About to bind events...');
                this.bindEvents();
                this.restoreSidebarState();
                console.log('Sidebar component loaded successfully');
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error loading sidebar component:', error);
            console.log('Creating sidebar fallback...');
            this.createSidebarFallback();
        }
    }

    // Create sidebar fallback if fetch fails
    createSidebarFallback() {
        console.log('Creating sidebar fallback...');
        const sidebarContainer = document.querySelector('.sidebar-container');
        
        if (sidebarContainer) {
            console.log('Sidebar container found for fallback');
            const fallbackHTML = `
                <aside class="sidebar">
                    <div class="sidebar-header">
                        <h1>
                            <i class="fas fa-building"></i>
                            <span class="sidebar-title" data-translate="nav.title">Property Management</span>
                        </h1>
                    </div>
                    
                    <nav class="sidebar-nav">
                        <ul class="nav-menu">
                            <li class="nav-item">
                                <a href="home.html" class="nav-link" data-page="home">
                                    <i class="fas fa-th-large"></i>
                                    <span class="nav-text" data-translate="nav.dashboard">Dashboard</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="customers.html" class="nav-link" data-page="customers">
                                    <i class="fas fa-users"></i>
                                    <span class="nav-text" data-translate="nav.customers">Customers</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="properties.html" class="nav-link" data-page="properties">
                                    <i class="fas fa-building"></i>
                                    <span class="nav-text" data-translate="nav.properties">Properties</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="employees.html" class="nav-link" data-page="employees">
                                    <i class="fas fa-user-tie"></i>
                                    <span class="nav-text" data-translate="nav.employees">Employees</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="maintenance.html" class="nav-link" data-page="maintenance">
                                    <i class="fas fa-tools"></i>
                                    <span class="nav-text" data-translate="nav.maintenance">Maintenance</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="finances.html" class="nav-link" data-page="finances">
                                    <i class="fas fa-chart-line"></i>
                                    <span class="nav-text" data-translate="nav.finances">Finances</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="settings.html" class="nav-link" data-page="settings">
                                    <i class="fas fa-cog"></i>
                                    <span class="nav-text" data-translate="nav.settings">Settings</span>
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
                    
                    <!-- Collapse Button - positioned to overlay main content -->
                    <button class="sidebar-collapse-btn" id="sidebarCollapseBtn" aria-label="Toggle sidebar">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                </aside>
            `;
            
            sidebarContainer.innerHTML = fallbackHTML;
            this.sidebarLoaded = true;
            this.setActivePage();
            console.log('About to bind events for fallback...');
            this.bindEvents();
            console.log('Sidebar fallback created successfully');
        } else {
            console.error('Sidebar container not found for fallback!');
        }
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
    bindEvents() {
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

        // Handle sidebar collapse toggle
        const collapseBtn = document.getElementById('sidebarCollapseBtn');
        console.log('Looking for collapse button:', collapseBtn);
        if (collapseBtn) {
            console.log('Collapse button found, adding click listener');
            collapseBtn.addEventListener('click', () => {
                console.log('Collapse button clicked!');
                this.toggleSidebar();
            });
        } else {
            console.error('Collapse button not found!');
            // Debug: check if sidebar exists and what's in it
            const sidebar = document.querySelector('.sidebar');
            console.log('Sidebar element:', sidebar);
            if (sidebar) {
                console.log('Sidebar HTML:', sidebar.innerHTML);
                console.log('Sidebar contains collapse button:', sidebar.querySelector('.sidebar-collapse-btn'));
            }
        }

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

    // Toggle sidebar collapse state
    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const isCollapsed = sidebar.classList.contains('collapsed');
        
        if (isCollapsed) {
            sidebar.classList.remove('collapsed');
            localStorage.setItem('sidebarCollapsed', 'false');
            console.log('Sidebar expanded');
        } else {
            sidebar.classList.add('collapsed');
            localStorage.setItem('sidebarCollapsed', 'true');
            console.log('Sidebar collapsed');
        }
    }

    // Restore sidebar state from localStorage
    restoreSidebarState() {
        const sidebar = document.querySelector('.sidebar');
        const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        
        if (isCollapsed) {
            sidebar.classList.add('collapsed');
            console.log('Sidebar state restored: collapsed');
        }
    }

    // Refresh sidebar (useful for dynamic updates)
    refresh() {
        console.log('Refreshing sidebar...');
        this.loadSidebar();
    }

    // Get sidebar HTML (for direct inclusion)
    static getSidebarHTML() {
        return `
            <aside class="sidebar">
                <div class="sidebar-header">
                    <h1>
                        <i class="fas fa-building"></i>
                        <span class="sidebar-title" data-translate="nav.title">Property Management</span>
                    </h1>
                </div>
                
                <nav class="sidebar-nav">
                    <ul class="nav-menu">
                        <li class="nav-item">
                            <a href="home.html" class="nav-link" data-page="home">
                                <i class="fas fa-th-large"></i>
                                <span class="nav-text" data-translate="nav.dashboard">Dashboard</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="customers.html" class="nav-link" data-page="customers">
                                <i class="fas fa-users"></i>
                                <span class="nav-text" data-translate="nav.customers">Customers</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="properties.html" class="nav-link" data-page="properties">
                                <i class="fas fa-building"></i>
                                <span class="nav-text" data-translate="nav.properties">Properties</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="employees.html" class="nav-link" data-page="employees">
                                <i class="fas fa-user-tie"></i>
                                <span class="nav-text" data-translate="nav.employees">Employees</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="maintenance.html" class="nav-link" data-page="maintenance">
                                <i class="fas fa-tools"></i>
                                <span class="nav-text" data-translate="nav.maintenance">Maintenance</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="finances.html" class="nav-link" data-page="finances">
                                <i class="fas fa-chart-line"></i>
                                <span class="nav-text" data-translate="nav.finances">Finances</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="settings.html" class="nav-link" data-page="settings">
                                <i class="fas fa-cog"></i>
                                <span class="nav-text" data-translate="nav.settings">Settings</span>
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
                
                <!-- Collapse Button - positioned to overlay main content -->
                <button class="sidebar-collapse-btn" id="sidebarCollapseBtn" aria-label="Toggle sidebar">
                    <i class="fas fa-chevron-left"></i>
                </button>
            </aside>
        `;
    }
}

// Initialize sidebar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing SidebarManager...');
    window.sidebarManager = new SidebarManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SidebarManager;
}
