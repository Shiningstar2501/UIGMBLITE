chrome.storage.local.get("scrapedReviews", (data) => {
  const reviews = data.scrapedReviews;
  const monthMap = {};

  reviews.forEach(review => {
    let month = estimateMonthFromDate(review.dateText);
    if (!monthMap[month]) {
      monthMap[month] = { total: 0, sum: 0 };
    }
    monthMap[month].total += 1;
    monthMap[month].sum += review.rating;
  });

  const labels = Object.keys(monthMap).sort();
  const totalReviews = labels.map(label => monthMap[label].total);
  const avgRatings = labels.map(label => (monthMap[label].sum / monthMap[label].total).toFixed(2));

  const ctx = document.getElementById('reviewChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Total Reviews',
          data: totalReviews,
          borderWidth: 2
        },
        {
          label: 'Average Rating',
          data: avgRatings,
          borderWidth: 2
        }
      ]
    }
  });
});

// Dummy estimation function
function estimateMonthFromDate(text) {
  const now = new Date();
  if (text.includes("week")) return `${now.getFullYear()}-${now.getMonth() + 1}`;
  if (text.includes("month")) {
    let monthsAgo = parseInt(text.split(' ')[0]);
    let date = new Date();
    date.setMonth(date.getMonth() - monthsAgo);
    return `${date.getFullYear()}-${date.getMonth() + 1}`;
  }
  if (text.includes("year")) {
    let yearsAgo = parseInt(text.split(' ')[0]);
    let date = new Date();
    date.setFullYear(date.getFullYear() - yearsAgo);
    return `${date.getFullYear()}-${date.getMonth() + 1}`;
  }
  return `${now.getFullYear()}-${now.getMonth() + 1}`;
}
