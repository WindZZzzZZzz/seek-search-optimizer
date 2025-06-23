function sendFilterUpdate() {
  const hideApplied = document.getElementById('hideAppliedCheckbox').checked;
  const hideViewed = document.getElementById('hideViewedCheckbox').checked;

  chrome.storage.sync.set({ hideApplied, hideViewed });

  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.sendMessage(tab.id, {
      action: 'applyFilters'
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const hideAppliedCheckbox = document.getElementById('hideAppliedCheckbox');
  const hideViewedCheckbox = document.getElementById('hideViewedCheckbox');

  // Load saved values
  chrome.storage.sync.get(['hideApplied', 'hideViewed'], (result) => {
    hideAppliedCheckbox.checked = result.hideApplied || false;
    hideViewedCheckbox.checked = result.hideViewed || false;
  });

  // Listen for changes
  hideAppliedCheckbox.addEventListener('change', sendFilterUpdate);
  hideViewedCheckbox.addEventListener('change', sendFilterUpdate);
});


