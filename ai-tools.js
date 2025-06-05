// ai-tools.js
const GEMINI_API_KEY = "AIzaSyDpYUehnolHnCDl-8DJeYAvzTAkwQHRCnk";
const TOOL_LABELS = {
  "gmb-post": "Create a Google My Business post for",
  "facebook-post": "Create a Facebook post for",
  "category": "Find categories for",
  "service": "List services for",
  "review-response": "Write a review response for",
  "qa": "Generate common questions and answers for"
};

const resultBox = document.getElementById("result");

// 1. Check if user is logged in
chrome.storage.local.get("jwt", ({ jwt }) => {
  if (!jwt) {
    window.location.href = chrome.runtime.getURL("auth.html?redirect=ai-tools.html");
  }
});

// 2. Attach event listeners to all tool cards
const cards = document.querySelectorAll(".tool-card");
cards.forEach(card => {
  card.addEventListener("click", () => handleToolClick(card.dataset.tool));
});

function handleToolClick(toolId) {
  resultBox.value = "🔄 Getting business name...";
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.sendMessage(tab.id, { action: "get_business_name" }, async (response) => {
      const name = response?.name || "a business";
      const prompt = TOOL_LABELS[toolId] + " " + name;
      resultBox.value = `🧠 Sending prompt: ${prompt}`;

      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await res.json();
        resultBox.value = data.candidates?.[0]?.content?.parts?.[0]?.text || "❌ No response from Gemini";
      } catch (e) {
        resultBox.value = "❌ Error: " + e.message;
      }
    });
  });
}
