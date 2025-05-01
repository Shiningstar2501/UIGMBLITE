// const $ = (q) => document.querySelector(q);
// console.log("$",$);

// // tab navigation
// for (const btn of document.querySelectorAll('nav button')) {
//   btn.onclick = () => {
//     document.querySelector('nav button.active').classList.remove('active');
//     btn.classList.add('active');
//     document.querySelector('section.active').classList.remove('active');
//     document.getElementById(btn.dataset.tab).classList.add('active');
//   };
// }

// // Teleport
// document.getElementById('tp_go').onclick = () => {
//   const qEl = document.getElementById('tp_query');
//   const query = qEl.value.trim();
//   if (!query) {
//     alert('Enter a search query');
//     return;
//   }
//   chrome.storage.local.set({ tp_query: query }, () => {
//     chrome.tabs.create({ url: chrome.runtime.getURL('pages/teleport.html') });
//     window.close();
//   });
// };

// // GMB info refresher
// const refreshGmb = () => {
//   chrome.storage.local.get('gmb_details', ({ gmb_details }) => {
//     document.getElementById('gmb_box').textContent = gmb_details ? JSON.stringify(gmb_details, null, 2) : '…waiting for data';
//   });
// };
// refreshGmb();

// // Reviews
// /* Reviews tab -------------------------------------------------*/
// document.getElementById('rev_go').onclick = () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
//     // Make sure we’re on a Maps “place” URL
//     if (!/https:\/\/.*google\..*\/maps\/place\//.test(tab.url)) {
//       alert('Open a Google Maps business page first.');
//       return;
//     }

//     // Send scrape request and ignore “Receiving end does not exist” races
//     chrome.tabs.sendMessage(tab.id, { action: 'scrape_reviews' })
//       .catch(() => {});
//   });
// };

// let revChart;
// const drawChart = (monthly) => {
//   if (!window.Chart) return;
//   const ctx = document.getElementById('rev_chart');
//   if (revChart) revChart.destroy();
//   revChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: monthly.map(m => m.month),
//       datasets: [
//         {
//           label: 'Total reviews',
//           data: monthly.map(m => m.count),
//           borderWidth: 1
//         },
//         {
//           label: 'Avg rating',
//           data: monthly.map(m => m.avg.toFixed(2)),
//           borderWidth: 1
//         }
//       ]
//     },
//     options: { responsive: true, maintainAspectRatio: false }
//   });
// };

// chrome.runtime.onMessage.addListener((m) => {
//   if (m.type === 'REV_CHART_DATA') {
//     drawChart(m.data);
//   }
// });


// chrome.runtime.onMessage.addListener((m)=>{
//   if(m.type==='GMB_DETAILS'){
//      chrome.storage.local.set({gmb_details:m.data}, refreshGmb);
//   }
// });



// // 🔄 Auto-update the Info tab when new data arrives
// chrome.runtime.onMessage.addListener((m) => {
//   if (m.type === 'GMB_DETAILS') {
//     chrome.storage.local.set({ gmb_details: m.data }, refreshGmb);
//   }
// });



const $ = q => document.querySelector(q);

// Tab navigation (Tailwind-based)
for (const btn of document.querySelectorAll('nav .tab')) {
  btn.onclick = () => {
    // 1️⃣ Reset all tabs to inactive
    document.querySelectorAll('nav .tab').forEach(t => {
      t.classList.remove('bg-blue-600', 'text-white');
      t.classList.add('text-gray-700');
    });
    // 2️⃣ Highlight the clicked tab
    btn.classList.add('bg-blue-600', 'text-white');
    btn.classList.remove('text-gray-700');
    // 3️⃣ Hide all sections
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    // 4️⃣ Show the linked section
    document.getElementById(btn.dataset.tab).classList.remove('hidden');
  };
}

// Teleport
document.getElementById('tp_go').onclick = () => {
  const qEl = document.getElementById('tp_query');
  const query = qEl.value.trim();
  if (!query) {
    alert('Enter a search query');
    return;
  }
  chrome.storage.local.set({ tp_query: query }, () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('pages/teleport.html') });
    window.close();
  });
};

// GMB info refresher
const refreshGmb = () => {
  chrome.storage.local.get('gmb_details', ({ gmb_details }) => {
    document.getElementById('gmb_box').textContent =
      gmb_details ? JSON.stringify(gmb_details, null, 2) : '…waiting for data';
  });
};
refreshGmb();

// Reviews
document.getElementById('rev_go').onclick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!/https:\/\/.*google\..*\/maps\/place\//.test(tab.url)) {
      alert('Open a Google Maps business page first.');
      return;
    }
    chrome.tabs.sendMessage(tab.id, { action: 'scrape_reviews' }).catch(() => {});
  });
};

// Chart rendering
let revChart;
const drawChart = (monthly) => {
  if (!window.Chart) return;
  const ctx = document.getElementById('rev_chart');
  if (revChart) revChart.destroy();
  revChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: monthly.map(m => m.month),
      datasets: [
        { label: 'Total reviews', data: monthly.map(m => m.count), borderWidth: 1 },
        { label: 'Avg rating',   data: monthly.map(m => m.avg.toFixed(2)), borderWidth: 1 }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
};

chrome.runtime.onMessage.addListener((m) => {
  if (m.type === 'REV_CHART_DATA') {
    drawChart(m.data);
  }
});

chrome.runtime.onMessage.addListener((m) => {
  if (m.type === 'GMB_DETAILS') {
    chrome.storage.local.set({ gmb_details: m.data }, refreshGmb);
  }
});
