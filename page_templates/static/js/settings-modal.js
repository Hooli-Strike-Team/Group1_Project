/* Algorithm:
 *  1. Initialize settings
 *  2. Send requests to fetch/update user settings
 *  3. Update UI based on received user settings data
 */

// When DOM is fully loaded, initialize settings and retrieve user settings
window.addEventListener('DOMContentLoaded', (e) => {
    // Declare variables to hold DOM elements
    const modalsettings = document.getElementById('settingsmodal');
    const settings_closeButton = document.querySelector('.close-settings');
    const settings_button = document.getElementById('settings-button');
    const settings_clock = document.getElementById('settings-clock');
    const settings_mistakes = document.getElementById('settings-mistakes');
    const timer_wrapper = document.querySelector('.timer');
    const mistakes_count = document.getElementById('mistakes-count');
    const username = 'Test_User';

    // Open settings modal window
    function settings_openModal() {
        modalsettings.style.display = 'block';
    }

    // Close settings modal window
    function settings_closeModal() {
        modalsettings.style.display = 'none';
    }

    // Fetch user settings and update UI
    function get_settings() {
        // Send request to fetch user settings
        fetch('game_settings/' + username)
            .then(response => response.json())
            .then(data => {
                if(data.length > 0) {
                  // Update UI with fetched settings
                  settings_clock.checked = data[0][1];
                  settings_mistakes.checked = data[0][2];
                  if (timer_wrapper) timer_wrapper.style.visibility = settings_clock.checked ? "visible" : "hidden";
                  if (mistakes_count) mistakes_count.style.visibility = settings_mistakes.checked ? "visible" : "hidden";
                }
            })
            .catch(error => console.error(error));
    }

    // Update settings on server and update UI accordingly
    function update_settings() {
        const data = {
            Show_Clock: settings_clock.checked,
            Show_Mistakes_Counter: settings_mistakes.checked
        };

        // Send request to server to update user settings
        fetch('game_settings/' + username, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.text())
            .then(result => {
                // Update UI based on new settings
                if (timer_wrapper) timer_wrapper.style.visibility = settings_clock.checked ? "visible" : "hidden";
                if (mistakes_count) mistakes_count.style.visibility = settings_mistakes.checked ? "visible" : "hidden";
            })
            .catch(error => console.error(error));
    }

    // Add event listeners for opening and closing settings modal window
    if (settings_button) settings_button.addEventListener('click', settings_openModal);
    if (settings_closeButton) settings_closeButton.addEventListener('click', settings_closeModal);

    // Add event listeners for updating user settings when settings checkboxes change
    if (settings_clock) settings_clock.addEventListener('change', function (e) {
        update_settings();
    });
    if (settings_mistakes) settings_mistakes.addEventListener('change', function (e) {
        update_settings();
    });

    // Retrieve initial user settings
    get_settings();
})