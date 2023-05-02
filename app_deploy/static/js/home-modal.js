// Show modal window when page loads
document.getElementById('loggedInModal').style.display = 'block';

// Hides modal window
function hideModal(event) {
  // Get modal element by ID
  var modal = document.getElementById('loggedInModal');
  // Get content of modal
  var content = document.querySelector('.modal-content');
  
  // Check if element that was clicked is either modal background or not a 
  // child of content
  if (event.target == modal || !content.contains(event.target)) {
    // Hide modal
    modal.style.display = 'none';
  }
}
