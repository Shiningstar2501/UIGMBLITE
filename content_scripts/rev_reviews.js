chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scrape_reviews") {
      if (window.location.href.includes("google.com/maps")) {
          scrapeFromGoogleMaps();
      } else if (window.location.href.includes("google.com/search")) {
          scrapeFromGoogleSearch();
      } else {
          console.error('Unknown page type for scraping.');
      }
  }
});

// ============================
// Scrape from Google Maps
// ============================
async function scrapeFromGoogleMaps() {
  console.log('Scraping from Google Maps...');

  // Step 1: Click "See All Reviews" if it exists
  // let seeAllButton = document.querySelector('button[jsaction="pane.reviewChart.moreReviews"]');
  let seeAllButton = document.querySelector('button[aria-label^="Reviews for"]');
  console.log("seeAllButton",seeAllButton);
  if (seeAllButton) {
      console.log('Clicking "See All Reviews"...');
      
      seeAllButton.click();
      await wait(3000); // Wait for reviews panel to open
  } else {
      console.log('No "See All Reviews" button found.');
  }

  // Step 2: Find the scroll container
  let scrollContainer = await waitForElement('.m6QErb.DxyBCb.kA9KIf.dS8AEf', 10);
  console.log("scrollContainer",scrollContainer);
  if (!scrollContainer) {
      console.error('Cannot find reviews panel.');
      return;
  }

  // Step 3: Scroll to load reviews
  await autoScroll(scrollContainer, 30);

  // Step 4: Scrape reviews
  const reviews = scrapeReviewsFromPage();
  console.log(`Scraped ${reviews.length} reviews.`);

  // Step 5: Save and open report
  chrome.storage.local.set({ scrapedReviews: reviews }, () => {
      console.log('Saved reviews. Opening report...');
      chrome.runtime.sendMessage({ action: "scraping_done", reviews: reviews }); 
  });
}

// ============================
// Scrape from Google Search (Business Panel)
// ============================
async function scrapeFromGoogleSearch() {
  console.log('Scraping from Google Search Business Profile...');
  // sendStatusUpdate('Scraping from Google Search Business Profile...');

  // Step 1: Click the reviews link/button
  let reviewsButton = document.querySelector('a[data-hveid][href*="reviews"]') || document.querySelector('span:contains("Google reviews")');
  if (reviewsButton) {
      console.log('Clicking Reviews Button...');
      // sendStatusUpdate('Clicking Reviews Button...');
      reviewsButton.click();
      await wait(3000); // Wait for reviews panel to open
  } else {
      console.error('Reviews button not found on search page.');
      // sendStatusUpdate('Reviews button not found on search page.');
      return;
  }

  // Step 2: Now scraping is almost same like Maps
  let scrollContainer = await waitForElement('.m6QErb.DxyBCb.kA9KIf.dS8AEf', 10);
  if (!scrollContainer) {
      console.error('Cannot find reviews panel.');
      // sendStatusUpdate('Cannot find reviews panel.');
      return;
  }

  await autoScroll(scrollContainer, 30);

  const reviews = scrapeReviewsFromPage();
  console.log(`$Scraped {reviews.length} reviews.`);
  // sendStatusUpdate(`$Scraped {reviews.length} reviews.`);
  chrome.runtime.sendMessage({ action: "scraping_done", reviews: reviews });
}


// ============================
// Common Functions
// ============================

// Scrape reviews from the currently loaded page
function scrapeReviewsFromPage() {
  const reviews = [];
  const reviewBlocks = document.querySelectorAll('.jftiEf');

  reviewBlocks.forEach(block => {
      const ratingElement = block.querySelector('.kvMYJc');
      const dateElement = block.querySelector('.rsqaWe');

      if (ratingElement && dateElement) {
          const rating = parseFloat(ratingElement.getAttribute('aria-label').match(/\d(\.\d)?/)[0]);
          const dateText = dateElement.innerText;
          reviews.push({ rating, dateText });
      }
  });

  return reviews;
}

// Scroll inside container
async function autoScroll(container, scrollTimes = 20) {
  for (let i = 0; i < scrollTimes; i++) {
      container.scrollBy(0, 500);
      await wait(500);
  }
}

// Wait helper
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Wait for an element to appear
async function waitForElement(selector, maxTries = 10) {
  for (let i = 0; i < maxTries; i++) {
      let element = document.querySelector(selector);
      if (element) return element;
      await wait(500);
  }
  return null;
}