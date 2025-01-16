// CSS class for fade animation
const FADE_DURATION = 300; // milliseconds

const PAGE_MAPPINGS = {
    // Dashboard
    'dashboard': './static/dashboard.htm',

    // Profile section
    'profile-inbox': './static/profile/inbox.htm',
    'profile-settings': './static/profile/settings.htm',
    'profile-security': './static/profile/security.htm',
    'profile-preferences': './static/profile/preferences.htm',
    
    // Portfolio section
    'portfolio': './static/portfolio/wallet.htm',
    'portfolio-award': './static/portfolio/awards.htm',
    'portfolio-status': './static/portfolio/rank.htm',
    'portfolio-preferences': './static/portfolio/wallet.htm',
    
    // Market section
    'market': './static/market/market.htm',
    'market-settings': './static/market/issues.htm',
    'market-security': './static/market/bugs.htm',
    'market-preferences': './static/market/wanted.htm',
    
    // Work Tickets section
    'tickets-active': './static/tickets/active.htm',
    'tickets-completed': './static/tickets/completed.htm',
    'tickets-create': './static/tickets/create.htm',
    
    // Settings section
    'settings-general': './static/settings/general.htm',
    'settings-alerts': './static/settings/alerts.htm',
    'settings-privacy': './static/settings/privacy.htm'
    
};

/**
 * Creates a loading spinner element
 * @returns {string} HTML for the loading spinner
 */
const createLoadingSpinner = () => {
    return `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading content...</p>
        </div>
    `;
};

/**
 * Creates an error message element
 * @param {string} message 
 * @returns {string} 
 */
const createErrorMessage = (message) => {
    return `
        <div class="error-container">
            <h2>Error Loading Content</h2>
            <p>${message}</p>
            <button onclick="window.location.reload()" class="retry-button">
                Retry
            </button>
        </div>
    `;
};

/**
 * Loads content into the specified container
 * @param {string} pageName 
 * @returns {Promise<void>}
 */
export const loadContent = async (pageName) => {
    const contentContainer = document.getElementById('all');
    if (!contentContainer) {
        console.error('Content container not found');
        return;
    }
    contentContainer.innerHTML = createLoadingSpinner();
    contentContainer.classList.add('fade-out');

    try {
        const pageUrl = PAGE_MAPPINGS[pageName];
        if (!pageUrl) {
            throw new Error(`No mapping found for page "${pageName}"`);
        }
        console.log(`Fetching content from: ${pageUrl}`);
        const response = await fetch(pageUrl);
        if (!response.ok) {
            throw new Error(`Failed to load page: ${response.statusText}`);
        }
        const content = await response.text();
        await new Promise(resolve => setTimeout(resolve, FADE_DURATION));
         contentContainer.innerHTML = content;
        contentContainer.classList.remove('fade-out');
        contentContainer.classList.add('fade-in');
// cleanup
        setTimeout(() => {
            contentContainer.classList.remove('fade-in');
        }, FADE_DURATION);

// pg title
        const titleElement = contentContainer.querySelector('h1');
        if (titleElement) {
            document.title = `DegenVets - ${titleElement.textContent}`;
        }
    } catch (error) {
        console.error('Content loading error:', error);
        contentContainer.innerHTML = createErrorMessage(
            'Unable to load the requested page. Please try again later.'
        );
        contentContainer.classList.remove('fade-out');
    }
};
export const initializeContentLoader = () => {
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1;
            animation: fadeIn 0.3s ease-in forwards;
        }
        
        .fade-out {
            opacity: 0;
            animation: fadeOut 0.3s ease-out forwards;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .loading-spinner {
            text-align: center;
            padding: 2rem;
            opacity: 1;
        }

        #all {
        display: block !important;
        opacity: 1 !important;
        }

        .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #5e1300;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .error-container {
            text-align: center;
            padding: 2rem;
            color: #ff0000;
        }
        
        .retry-button {
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background-color: #5e1300;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            color: #000;
        }
        
        .retry-button:hover {
            background-color: #e0a800;
        }
    `;
    document.head.appendChild(style);
};