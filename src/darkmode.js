let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('#darkmode-toggle');

const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    document.getElementById('darkmode-toggle').classList.add('dark');
    localStorage.setItem('darkMode', 'enabled');
}
const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkMode', null);
    document.getElementById('darkmode-toggle').classList.remove('dark');
}
if (darkMode === 'enabled') {
    enableDarkMode();
}
darkModeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode');
    if (darkMode !== 'enabled') {
        enableDarkMode();
        console.log('Dark mode enabled');
    } else {
        disableDarkMode();
        console.log('Dark mode disabled');
    }    
});