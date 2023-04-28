window.addEventListener('DOMContentLoaded', (e) => {
    const modalsettings = document.getElementById('settingsmodal');
    const settings_closeButton = document.querySelector('.close-settings');
    const settings_button = document.getElementById('settings-button');
    const settings_clock = document.getElementById('settings-clock');
    const settings_mistakes = document.getElementById('settings-mistakes');
    const timer_wrapper = document.querySelector('.timer');
    const mistakes_count = document.getElementById('mistakes-count');
    const username = 'Test_User';

    // Opens settings modal window
    function settings_openModal() {
        modalsettings.style.display = 'block';
    }

    // Closes settings modal window
    function settings_closeModal() {
        modalsettings.style.display = 'none';
    }
  
    // Get initial settings values from DB
    function get_settings() {
      fetch('game_settings/' + username)
      .then(response => response.json())
      .then(data => {
        // Set the clock checkbox
        settings_clock.checked = data[0][1];
        
         // Set the mistakes checkbox
        settings_mistakes.checked = data[0][2];
        
        // Set visibility of the timer and mistakes counter if on the Main page
        if (timer_wrapper) timer_wrapper.style.visibility = settings_clock.checked ? "visible" : "hidden";
        if (mistakes_count) mistakes_count.style.visibility = settings_mistakes.checked ? "visible" : "hidden";
      })
      .catch(error => console.error(error));
    }
  
    // Update settings values to DB
    function update_settings() {     
      const data = {
          Show_Clock: settings_clock.checked,
          Show_Mistakes_Counter: settings_mistakes.checked
      };

      fetch('game_settings/' + username, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => response.text())
      .then(result => {
        // Set visibility of the timer and mistakes counter if on the Main page
        if (timer_wrapper) timer_wrapper.style.visibility = settings_clock.checked ? "visible" : "hidden";
        if (mistakes_count) mistakes_count.style.visibility = settings_mistakes.checked ? "visible" : "hidden";
      })
      .catch(error => console.error(error));
    }

    // Add event listener to open settings modal window on click
    if (settings_button) settings_button.addEventListener('click', settings_openModal);

    // Add event listener to close settings modal window
    if (settings_closeButton) settings_closeButton.addEventListener('click', settings_closeModal);
  
    // Add event listener to settings clock change
    if (settings_clock) settings_clock.addEventListener('change', function(e) {
      update_settings();
    });
  
    // Add event listener to settings mistakes change
    if (settings_mistakes) settings_mistakes.addEventListener('change', function(e) {
      update_settings();
    });
  
    // get the initial settings from the db
    get_settings();
}) 