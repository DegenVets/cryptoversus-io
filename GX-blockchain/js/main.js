import { initializeMarket } from './market.js';
import { initializeDashboard } from './dashboard.js';
import { initializeChat } from './chat.js';
import { initializeSubmenu } from './submenu.js';
import { initializeCarousel } from './carousel.js';
import { initializeChat } from './chat.js';
import {initializeForm} from './form.js';
import {initializeKit} from 'https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous';
import {initalizeShareDots} from './sharedots.js';

initializeCarousel();
initializeChat();
initializeForm();
initializeKit();
initalizeShareDots();


document.addEventListener('DOMContentLoaded', () => {
    initializeChat();
});

document.addEventListener('DOMContentLoaded', () => {
initializeDashboard();
});

document.addEventListener('DOMContentLoaded', () => {
    initializeMarket();
    });

    document.addEventListener('DOMContentLoaded', () => {
        initializeSubmenu();
    });