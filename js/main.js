import { loadContent, initializeContentLoader } from './contentloader.js';

document.addEventListener('DOMContentLoaded', () => {

    // Initialize elements
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    const menuItems = document.querySelectorAll('.submenu a');
    const contentSections = document.querySelectorAll('.content-section');
    const connectBtn = document.querySelector('.connect-btn');

        // Add logo click handler
        const logoLink = document.querySelector('.logo-link');
        logoLink?.addEventListener('click', async (event) => {
            event.preventDefault();
            const page = logoLink.getAttribute('data-page');
            if (page) {
                console.log('Loading dashboard page:', page);
                await loadContent(page);
                document.querySelectorAll('.content-section').forEach(section => {
                    section.classList.remove('active');
                });
                const targetSection = document.getElementById('all');
                if (targetSection) {
                    targetSection.classList.add('active');
                    targetSection.classList.add('fade');
                }
                // Close menu on mobile if open
                const menuToggle = document.querySelector('.menu-toggle');
                const sidebar = document.querySelector('.sidebar');
                const overlay = document.querySelector('.overlay');
                menuToggle?.classList.remove('active');
                sidebar?.classList.remove('active');
                overlay?.classList.remove('active');
            }
        });

        // Menu toggle functionality
        menuToggle?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            sidebar?.classList.toggle('active');
            overlay?.classList.toggle('active');
        });

            // Overlay click handler
    overlay?.addEventListener('click', () => {
        menuToggle?.classList.remove('active');
        sidebar?.classList.remove('active');
        overlay?.classList.remove('active');
    });

        // Connect button handler
        connectBtn?.addEventListener('click', () => {
            console.log('Connect button clicked');
        });

            // Submenu toggle functionality
    const menuToggles = document.querySelectorAll('.menu-toggle-btn');

    menuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
    
            const submenuId = this.getAttribute('data-submenu');
            const submenu = document.getElementById(submenuId);
            const submenuWrapper = this.closest('.menu-item');
    
            // Toggle active classes
            this.classList.toggle('active');
            if (submenu) {
                submenu.classList.toggle('active');
                submenuWrapper?.classList.toggle('expanded');
                
                // Remove fixed height for mobile
                if (submenu.classList.contains('active')) {
                    submenu.style.maxHeight = 'none';
                } else {
                    submenu.style.maxHeight = '0px';
                }
                
                // Close other submenus
                document.querySelectorAll('.submenu.active').forEach(other => {
                    if (other.id !== submenuId) {
                        other.classList.remove('active');
                        other.style.maxHeight = '0px';
                        const otherToggle = document.querySelector(`[data-submenu="${other.id}"]`);
                        const otherWrapper = other.closest('.menu-item');
                        otherToggle?.classList.remove('active');
                        otherWrapper?.classList.remove('expanded');
                    }
                });
            }
        });
    });

        // Menu items click handlers
        menuItems.forEach(item => {
            item.addEventListener('click', async (event) => {
                event.preventDefault();
                const page = item.getAttribute('data-page');
                if (page) {
                    console.log('Loading page:', page);
                    await loadContent(page);
                    contentSections.forEach(section => {
                        section.classList.remove('active');
                    });
                    const targetSection = document.getElementById(page);
                    if (targetSection) {
                        targetSection.classList.add('active');
                        targetSection.classList.add('fade');
                    }
                    menuToggle?.classList.remove('active');
                    sidebar?.classList.remove('active');
                    overlay?.classList.remove('active');
                }
            });
        });


    // Handle clicks outside menu
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.menu-item') && !e.target.closest('.menu-toggle')) {
            document.querySelectorAll('.submenu.active').forEach(submenu => {
                submenu.classList.remove('active');
                submenu.style.maxHeight = '0px';
                const toggle = document.querySelector(`[data-submenu="${submenu.id}"]`);
                const wrapper = submenu.closest('.menu-item');
                if (toggle) {
                    toggle.classList.remove('active');
                }
                if (wrapper) {
                    wrapper.classList.remove('expanded');
                }
            });
        }
    });

    // Gear menu functionality. Ends at init content loader
document.addEventListener('DOMContentLoaded', () => {
    // Gear menu functionality
    const gearToggle = document.querySelector('.gear-toggle');
    const gearSubmenu = document.querySelector('.gear-submenu');
    const sidebar = document.querySelector('.sidebar');

    if (gearToggle && gearSubmenu) {
        gearToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Close any open submenus in the main menu first
            document.querySelectorAll('.submenu.active').forEach(submenu => {
                submenu.classList.remove('active');
                submenu.style.maxHeight = '0px';
                const toggle = document.querySelector(`[data-submenu="${submenu.id}"]`);
                const wrapper = submenu.closest('.menu-item');
                if (toggle) {
                    toggle.classList.remove('active');
                }
                if (wrapper) {
                    wrapper.classList.remove('expanded');
                }
            });

            // Toggle gear submenu
            gearToggle.classList.toggle('active');
            gearSubmenu.classList.toggle('active');
        });
    }

    // Main menu submenu toggle functionality
    const menuToggles = document.querySelectorAll('.menu-toggle-btn');

    menuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
    
            // Close gear submenu first
            if (gearSubmenu && gearSubmenu.classList.contains('active')) {
                gearSubmenu.classList.remove('active');
                gearToggle.classList.remove('active');
            }

            const submenuId = this.getAttribute('data-submenu');
            const submenu = document.getElementById(submenuId);
            const submenuWrapper = this.closest('.menu-item');
    
            // Toggle active classes
            this.classList.toggle('active');
            if (submenu) {
                submenu.classList.toggle('active');
                submenuWrapper?.classList.toggle('expanded');
                
                // Set max-height for animation
                if (submenu.classList.contains('active')) {
                    submenu.style.maxHeight = submenu.scrollHeight + "px";
                } else {
                    submenu.style.maxHeight = '0px';
                }
                
                // Close other submenus
                document.querySelectorAll('.submenu.active').forEach(other => {
                    if (other.id !== submenuId) {
                        other.classList.remove('active');
                        other.style.maxHeight = '0px';
                        const otherToggle = document.querySelector(`[data-submenu="${other.id}"]`);
                        const otherWrapper = other.closest('.menu-item');
                        otherToggle?.classList.remove('active');
                        otherWrapper?.classList.remove('expanded');
                    }
                });
            }
        });
    });

    // Global click handler
    document.addEventListener('click', (e) => {
        // Only handle clicks outside both menu systems
        if (!e.target.closest('.menu-item') && 
            !e.target.closest('.menu-toggle') && 
            !e.target.closest('.gear-menu')) {
            
            // Close gear submenu
            if (gearSubmenu) {
                gearSubmenu.classList.remove('active');
                gearToggle?.classList.remove('active');
            }

            // Close main menu submenus
            document.querySelectorAll('.submenu.active').forEach(submenu => {
                submenu.classList.remove('active');
                submenu.style.maxHeight = '0px';
                const toggle = document.querySelector(`[data-submenu="${submenu.id}"]`);
                const wrapper = submenu.closest('.menu-item');
                if (toggle) {
                    toggle.classList.remove('active');
                }
                if (wrapper) {
                    wrapper.classList.remove('expanded');
                }
            });
        }
    });

    // Prevent submenu closing when clicking inside gear submenu
    if (gearSubmenu) {
        gearSubmenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
});

        // Initialize content loader
        try {
            initializeContentLoader();
        } catch (error) {
            console.error('Error initializing content loader:', error);
        }
    });

    try {
        initializeContentLoader();
        
        // Load dashboard content by default
        await loadContent('dashboard');
    } catch (error) {
        console.error('Error during initialization:', error);
    }