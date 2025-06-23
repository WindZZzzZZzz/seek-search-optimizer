function applyFilters() {
  const allJobCards = document.querySelectorAll('[data-search-sol-meta]');

  chrome.storage.sync.get(['hideApplied', 'hideViewed'], (result) => {
    allJobCards.forEach(card => {
      const dateEl = card.querySelector('[data-automation="jobListingDate"]');
      if (!dateEl) return;

      const dateText = (dateEl.innerText || dateEl.textContent).toLowerCase();

      card.classList.remove("hidden-job");

      const shouldHide = (result.hideApplied && dateText.includes("applied")) || 
                        (result.hideViewed && dateText.includes("viewed"));

      if (shouldHide) {
        card.classList.add("hidden-job");
      }
    });
  });
  
}

// Run initial filters from saved settings
applyFilters()
// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'applyFilters') {
    applyFilters();
  }
});

const observer = new MutationObserver(() => {
  applyFilters();
});

const target = document.querySelector('main') || document.body;
if (target) {
  observer.observe(target, {
    childList: true,
    subtree: true
  });
}
