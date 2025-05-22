// post-analysis.js

function prepareChartData(posts) {
    const dateCount = {};
    let totalChars = 0;
  
    posts.forEach(post => {
      const d = new Date(post.date);
      if (isNaN(d)) return;
      const key = d.toISOString().split('T')[0];
      totalChars += post.text.length;
      dateCount[key] = (dateCount[key] || 0) + 1;
    });
  
    const sorted = Object.keys(dateCount).sort();
    const dailyCounts = [], cumulative = [];
    let runningTotal = 0;
  
    sorted.forEach(date => {
      const count = dateCount[date];
      runningTotal += count;
      dailyCounts.push({ date, count });
      cumulative.push({ date, total: runningTotal });
    });
  
    return {
      dailyCounts,
      cumulative,
      avgChars: (totalChars / posts.length).toFixed(1),
      avgFreq: (sorted.length / posts.length).toFixed(1),
      totalPosts: posts.length
    };
  }
  
  function renderChart(data) {
    const ctx = document.getElementById("postChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.dailyCounts.map(d => d.date),
        datasets: [
          {
            label: "Posts per Day",
            data: data.dailyCounts.map(d => d.count),
            backgroundColor: "rgba(59,130,246,0.5)",
            yAxisID: "y"
          },
          {
            label: "Cumulative Posts",
            data: data.cumulative.map(d => d.total),
            type: "line",
            borderColor: "rgba(37,99,235,1)",
            yAxisID: "y1",
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, position: "left" },
          y1: { beginAtZero: true, position: "right", grid: { drawOnChartArea: false } }
        }
      }
    });
  
    document.getElementById("summary").innerHTML = `
      <p><strong>Total Posts:</strong> ${data.totalPosts}</p>
      <p><strong>Post Frequency:</strong> 1 post every ${data.avgFreq} days</p>
      <p><strong>Avg Characters per Post:</strong> ${data.avgChars}</p>
    `;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("load_posts").addEventListener("click", () => {
      chrome.storage.local.get("gmbPostData", ({ gmbPostData }) => {
        if (gmbPostData && gmbPostData.length > 0) {
          const chartData = prepareChartData(gmbPostData);
          renderChart(chartData);
        } else {
          document.getElementById("summary").textContent = "No posts found."    ;
        }
      });
    });
  });
  