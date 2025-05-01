
// //   let lat = 28.61, lng = 77.23;

// //   const map = L.map('map').setView([lat, lng], 13);
// //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// //   const customIcon = L.icon({
// //     iconUrl: 'marker-icon.jpg', // or 'images/marker-icon.png' if it's in a subfolder
// //     iconSize: [30, 40],         // width, height in pixels
// //     iconAnchor: [15, 40],       // where the icon points to the location
// //     popupAnchor: [0, -40]       // where the popup appears in relation
// //   });
  
// //   const marker = L.marker([lat, lng], {
// //     icon: customIcon,
// //     draggable: true
// //   }).addTo(map);
  

// //   marker.on('dragend', () => {
// //     const pos = marker.getLatLng();
// //     lat = pos.lat;
// //     lng = pos.lng;
// //     console.log("lat updated to -->", lat);
// //     console.log("lng updated to -->", lng);
// //   });


// //   map.on('click', (e) => {
// //     lat = e.latlng.lat;
// //     lng = e.latlng.lng;
// //     marker.setLatLng([lat, lng]);
// //   });

// //   // Restore search query if set
// //   chrome.storage.local.get("searchQuery", (data) => {
// //     if (data.searchQuery) {
// //       document.getElementById("query").value = data.searchQuery;
// //     }
// //   });

// //   document.getElementById("searchBtn").addEventListener("click", () => {
// //     const query = document.getElementById("query").value;
// //     const gmapUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}/@${lat},${lng},14z`;
// //     window.open(gmapUrl, "_blank");
// //   });

// // // After DOM is ready
// // // chrome.storage.local.get("businessRankings", (data) => {
// // //   if (data.businessRankings && Array.isArray(data.businessRankings)) {
// // //     const listEl = document.getElementById("rankingList");
// // //     listEl.innerHTML = ""; // clear old results
// // //     data.businessRankings.forEach(item => {
// // //       const li = document.createElement("li");
// // //       li.textContent = item;
// // //       listEl.appendChild(li);
// // //     });
// //   // }
// // // });
// // function updateRankingList(rankings) {
// //   const listEl = document.getElementById("rankingList");
// //   listEl.innerHTML = ""; // clear old results
// //   rankings.forEach(item => {
// //     const li = document.createElement("li");
// //     li.textContent = item;
// //     listEl.appendChild(li);
// //   });
// // }

// // // Load existing rankings if already present
// // chrome.storage.local.get("businessRankings", (data) => {
// //   if (data.businessRankings && Array.isArray(data.businessRankings)) {
// //     updateRankingList(data.businessRankings);
// //   }
// // });

// // // Listen for updates to rankings
// // chrome.storage.onChanged.addListener((changes, area) => {
// //   if (area === "local" && changes.businessRankings) {
// //     updateRankingList(changes.businessRankings.newValue);
// //   }
// // });
// let lat = 28.61, lng = 77.23;

// const map = L.map('map').setView([lat, lng], 13);
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// const customIcon = L.icon({
//   iconUrl: 'marker-icon.jpg', // or 'images/marker-icon.png' if it's in a subfolder
//   iconSize: [30, 40],         // width, height in pixels
//   iconAnchor: [15, 40],       // where the icon points to the location
//   popupAnchor: [0, -40]       // where the popup appears in relation
// });

// const marker = L.marker([lat, lng], {
//   icon: customIcon,
//   draggable: true
// }).addTo(map);


// marker.on('dragend', () => {
//   const pos = marker.getLatLng();
//   lat = pos.lat;
//   lng = pos.lng;
//   console.log("lat updated to -->", lat);
//   console.log("lng updated to -->", lng);
// });


// map.on('click', (e) => {
//   lat = e.latlng.lat;
//   lng = e.latlng.lng;
//   marker.setLatLng([lat, lng]);
// });

// // Restore search query if set
// chrome.storage.local.get("searchQuery", (data) => {
//   if (data.searchQuery) {
//     document.getElementById("query").value = data.searchQuery;
//   }
// });

// document.getElementById("searchBtn").addEventListener("click", () => {
//   const query = document.getElementById("query").value;
//   const gmapUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}/@${lat},${lng},14z`;
//   window.open(gmapUrl, "_blank");
// });

// // After DOM is ready
// // chrome.storage.local.get("businessRankings", (data) => {
// //   if (data.businessRankings && Array.isArray(data.businessRankings)) {
// //     const listEl = document.getElementById("rankingList");
// //     listEl.innerHTML = ""; // clear old results
// //     data.businessRankings.forEach(item => {
// //       const li = document.createElement("li");
// //       li.textContent = item;
// //       listEl.appendChild(li);
// //     });
// // }
// // });
// function updateRankingList(rankings) {
// const listEl = document.getElementById("rankingList");
// listEl.innerHTML = ""; // clear old results
// rankings.forEach(item => {
//   const li = document.createElement("li");
//   li.textContent = item;
//   listEl.appendChild(li);
// });
// }

// // Load existing rankings if already present
// chrome.storage.local.get("businessRankings", (data) => {
// if (data.businessRankings && Array.isArray(data.businessRankings)) {
//   updateRankingList(data.businessRankings);
// }
// });

// // Listen for updates to rankings
// chrome.storage.onChanged.addListener((changes, area) => {
// if (area === "local" && changes.businessRankings) {
//   updateRankingList(changes.businessRankings.newValue);
// }
// });



/* global L, chrome */
document.addEventListener('DOMContentLoaded', () => {
    /* ---------- Leaflet map ---------- */
    const start = [28.61, 77.23];
    const map   = L.map('map').setView(start, 13);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  
    /* marker with local icon */
    const markerIcon = L.icon({
      iconUrl   : chrome.runtime.getURL('../libs/marker-icon.png'),
      shadowUrl : chrome.runtime.getURL('../libs/marker-shadow.png'),
      iconSize  : [25, 41],
      iconAnchor: [12, 41]
    });
    const marker = L.marker(start, { draggable:true, icon:markerIcon }).addTo(map);
    let coords   = { lat: start[0], lng: start[1] };
    marker.on('dragend', () => { coords = marker.getLatLng(); });
  
    /* ---------- Run-search button ---------- */
    document.getElementById('run').addEventListener('click', () => {
      chrome.storage.local.get('tp_query', ({ tp_query }) => {
        const query = encodeURIComponent(tp_query || '');
        const { lat, lng } = coords;
        const url = `https://www.google.com/maps/search/${query}/@${lat},${lng},15z`;
        chrome.tabs.create({ url });    // open in NEW tab, keep Teleport open
      });
    });
  
    /* ---------- Ranking list renderer ---------- */
    const listEl    = document.getElementById('list');
    const resultsEl = document.getElementById('results');
  
    const render = (arr) => {
      if (!arr?.length) return;
      listEl.innerHTML = arr.map(r => `<li><b>${r.rank}.</b> ${r.name}</li>`).join('');
      resultsEl.hidden = false;
    };
  
    // show existing list if already stored
    chrome.storage.local.get('tp_rankings', ({ tp_rankings }) => render(tp_rankings));
  
    // live pushes from service-worker
    chrome.runtime.onMessage.addListener((m) => {
      if (m.type === 'TP_RANKINGS_PUSH') render(m.data);
    });
  
    // stay in sync if storage key changes later
    chrome.storage.onChanged.addListener((chg, area) => {
      if (area === 'local' && chg.tp_rankings?.newValue) render(chg.tp_rankings.newValue);
    });
  });
  