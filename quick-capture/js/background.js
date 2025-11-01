// Background service worker for Quick Capture

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getCurrentTab') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        const tab = tabs[0];
        sendResponse({
          url: tab.url,
          title: tab.title,
          domain: extractDomain(tab.url)
        });
      } else {
        sendResponse({ url: null, title: null, domain: null });
      }
    });
    return true; // Required for async response
  }
});

// Extract domain from URL
function extractDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch (error) {
    return null;
  }
}

