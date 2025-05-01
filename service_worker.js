// Unified service worker for GMB Toolkit
chrome.runtime.onInstalled.addListener(() => {
  console.log("GMB Toolkit installed/updated");
});

chrome.runtime.onMessage.addListener((msg, sender, sendResp) => {
  if (msg.type === "TP_RANKINGS") {
    chrome.storage.local.set({ tp_rankings: msg.data });
    chrome.tabs.query({ url: "*://*/pages/teleport.html*" }, (tabs) => {
      tabs.forEach((t) => chrome.tabs.sendMessage(t.id, { type: "TP_RANKINGS_PUSH", data: msg.data }));
    });
  }

  if (msg.type === "GMB_DETAILS") {
    chrome.storage.local.set({ gmb_details: msg.data });
  }

  if (msg.type === "REV_REVIEWS") {
    chrome.storage.local.set({ rev_reviews: msg.data });
  }
});
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'rankings') {
    chrome.storage.local.set({ businessRankings: msg.payload });
    // Forward to any Teleport page that might be open
    chrome.tabs.query({ url: chrome.runtime.getURL('pages/teleport.html') }, (tabs) => {
      tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, { type: 'rankingsPush', data: msg.payload }));
    });
  }
});
