window.addEventListener('DOMContentLoaded', (e) => {
    const modalsettings = document.getElementById('settingsmodal');
    const settings_closeButton = document.querySelector('.close-settings');
    const settings_button = document.getElementById('settings-button'); 

    // Opens settings modal window
    function settings_openModal() {
        console.log("Openmodal clicked") 
        modalsettings.style.display = 'block';
    }

    // Closes settings modal window
    function settings_closeModal() {
        modalsettings.style.display = 'none';
    }

    // Add event listener to open settings modal window on click
    settings_button.addEventListener('click', settings_openModal);

    // Add event listener to close settings modal window
    settings_closeButton.addEventListener('click', settings_closeModal);
}) 