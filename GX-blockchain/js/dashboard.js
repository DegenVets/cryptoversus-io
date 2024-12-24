const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');
const menuItems = document.querySelectorAll('.sidebar a');
const contentSections = document.querySelectorAll('.content-section');
const connectBtn = document.querySelector('.connect-btn');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

connectBtn.addEventListener('click', () => {
    console.log('Connect button clicked');
});

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const page = item.getAttribute('data-page');
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        const targetSection = document.getElementById(page);
        targetSection.classList.add('active');
        targetSection.classList.add('fade');
        menuToggle.classList.remove('active');
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
});