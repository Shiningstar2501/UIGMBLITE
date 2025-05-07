// // /* global L, chrome */
// // document.addEventListener('DOMContentLoaded', () => {
// //   const start = [28.61, 77.23];
// //   const map = L.map('map').setView(start, 13);

// //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //     attribution: '© OpenStreetMap contributors'
// //   }).addTo(map);

// //   const markerIcon = L.icon({
// //     iconUrl: chrome.runtime.getURL('../libs/marker-icon.png'),
// //     shadowUrl: chrome.runtime.getURL('../libs/marker-shadow.png'),
// //     iconSize: [25, 41],
// //     iconAnchor: [12, 41]
// //   });

// //   const marker = L.marker(start, { draggable: true, icon: markerIcon }).addTo(map);
// //   let coords = { lat: start[0], lng: start[1] };
// //   marker.on('dragend', () => { coords = marker.getLatLng(); });

// //   // 🔁 Restore saved query
// //   chrome.storage.local.get('tp_query', ({ tp_query }) => {
// //     document.getElementById('query').value = tp_query || '';
// //   });

// //   // ✅ Run search using new button and query input
// //   document.getElementById('searchBtn').addEventListener('click', () => {
// //     const query = document.getElementById('query').value.trim();
// //     if (!query) return alert("Please enter a search query first.");

// //     chrome.storage.local.set({ tp_query: query }); // Save for next time
// //     const { lat, lng } = coords;
// //     const url = `https://www.google.com/maps/search/${encodeURIComponent(query)}/@${lat},${lng},15z`;
// //     chrome.tabs.create({ url });
// //   });

// //   // Rankings
// //   // const listEl = document.getElementById('list');
// //   // const resultsEl = document.getElementById('results');
// //   // const render = (arr) => {
// //   //   if (!arr?.length) return;
// //   //   listEl.innerHTML = arr.map(r => `<li><b>${r.rank}.</b> ${r.name}</li>`).join('');
// //   //   resultsEl.hidden = false;
// //   // };
// //   const listEl = document.getElementById('list');
// //   const resultsEl = document.getElementById('results');
// //   const statusEl = document.getElementById('status');
  
// //   const render = (arr) => {
// //     if (!arr?.length) {
// //       statusEl.textContent = 'No rankings found.';
// //       return;
// //     }
  
// //     statusEl.textContent = '✅ Rankings received:';
// //     listEl.innerHTML = arr.map(r => `<li><b>#${r.rank}</b> — ${r.name}</li>`).join('');
// //     resultsEl.hidden = false;
// //   };

// //   chrome.storage.local.get('tp_rankings', ({ tp_rankings }) => render(tp_rankings));
// //   chrome.runtime.onMessage.addListener((m) => {
// //     if (m.type === 'TP_RANKINGS_PUSH') render(m.data);
// //   });
// //   chrome.storage.onChanged.addListener((chg, area) => {
// //     if (area === 'local' && chg.tp_rankings?.newValue) render(chg.tp_rankings.newValue);
// //   });
// // });





// /* global L, chrome */
// document.addEventListener('DOMContentLoaded', () => {
//   const start = [28.61, 77.23];
//   const map = L.map('map').setView(start, 13);

//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '© OpenStreetMap contributors'
//   }).addTo(map);

//   const markerIcon = L.icon({
//     iconUrl: chrome.runtime.getURL('../libs/marker-icon.png'),
//     shadowUrl: chrome.runtime.getURL('../libs/marker-shadow.png'),
//     iconSize: [25, 41],
//     iconAnchor: [12, 41]
//   });

//   let coords = { lat: start[0], lng: start[1] };

//   const marker = L.marker(start, { draggable: true, icon: markerIcon }).addTo(map);

//   // ✅ Update lat/lng on drag
//   marker.on('dragend', () => {
//     const pos = marker.getLatLng();
//     coords.lat = pos.lat;
//     coords.lng = pos.lng;
//     console.log("📍 Marker moved to:", coords.lat, coords.lng);
//   });

//   // Restore previous query if available
//   chrome.storage.local.get('tp_query', ({ tp_query }) => {
//     document.getElementById('query').value = tp_query || '';
//   });

//   // ✅ Button to teleport (uses updated coords)
//   document.getElementById('searchBtn').addEventListener('click', () => {
//     const query = document.getElementById('query').value.trim();
//     if (!query) return alert("Please enter a search term.");

//     chrome.storage.local.set({ tp_query: query });

//     const { lat, lng } = coords;
//     console.log("🚀 Teleporting to:", lat, lng);

//     const url = `https://www.google.com/maps/search/${encodeURIComponent(query)}/@${lat},${lng},15z`;
//     chrome.tabs.create({ url });
//   });

//   // Optional: Show ranking updates if you're injecting them
//   const listEl = document.getElementById('list');
//   const resultsEl = document.getElementById('results');
//   const statusEl = document.getElementById('status');

//   const render = (arr) => {
//     if (!arr?.length) {
//       statusEl.textContent = 'No rankings found.';
//       return;
//     }

//     statusEl.textContent = '✅ Rankings received:';
//     listEl.innerHTML = arr.map(r => `<li><b>#${r.rank}</b> — ${r.name}</li>`).join('');
//     resultsEl.hidden = false;
//   };

//   chrome.storage.local.get('tp_rankings', ({ tp_rankings }) => render(tp_rankings));
//   chrome.runtime.onMessage.addListener((m) => {
//     if (m.type === 'TP_RANKINGS_PUSH') render(m.data);
//   });
//   chrome.storage.onChanged.addListener((chg, area) => {
//     if (area === 'local' && chg.tp_rankings?.newValue) render(chg.tp_rankings.newValue);
//   });
// });



/* global L, chrome */
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get("jwt", ({ jwt }) => {
    if (!jwt) {
      window.location.href = chrome.runtime.getURL("auth.html?redirect=teleport.html");
      return;
    }
  const start = [28.61, 77.23];
  const map = L.map('map').setView(start, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const markerIcon = L.icon({
    iconUrl: chrome.runtime.getURL('../libs/marker-icon.png'),
    shadowUrl: chrome.runtime.getURL('../libs/marker-shadow.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

  let coords = { lat: start[0], lng: start[1] };

  const marker = L.marker(start, { draggable: true, icon: markerIcon }).addTo(map);

  // ✅ Drag marker to update coordinates
  marker.on('dragend', () => {
    const pos = marker.getLatLng();
    coords.lat = pos.lat;
    coords.lng = pos.lng;
    console.log("📍 Marker dragged to:", coords.lat, coords.lng);
  });

  // ✅ Click on map to move marker
  map.on('click', (e) => {
    coords.lat = e.latlng.lat;
    coords.lng = e.latlng.lng;
    marker.setLatLng([coords.lat, coords.lng]);
    console.log("📍 Marker moved by map click to:", coords.lat, coords.lng);
  });

  // ✅ Restore saved query
  chrome.storage.local.get('tp_query', ({ tp_query }) => {
    document.getElementById('query').value = tp_query || '';
  });

  // ✅ Run teleport with latest coords
  document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('query').value.trim();
    if (!query) return alert("Please enter a search term.");

    chrome.storage.local.set({ tp_query: query });

    const { lat, lng } = coords;
    console.log("🚀 Teleporting to:", lat, lng);

    const url = `https://www.google.com/maps/search/${encodeURIComponent(query)}/@${lat},${lng},15z`;
    chrome.tabs.create({ url });
  });

  // Optional: Ranking results display
  const listEl = document.getElementById('list');
  const resultsEl = document.getElementById('results');
  const statusEl = document.getElementById('status');

  const render = (arr) => {
    if (!arr?.length) {
      statusEl.textContent = 'No rankings found.';
      return;
    }

    statusEl.textContent = '✅ Rankings received:';
    listEl.innerHTML = arr.map(r => `<li><b>#${r.rank}</b> — ${r.name}</li>`).join('');
    resultsEl.hidden = false;
  };

  chrome.storage.local.get('tp_rankings', ({ tp_rankings }) => render(tp_rankings));
  chrome.runtime.onMessage.addListener((m) => {
    if (m.type === 'TP_RANKINGS_PUSH') render(m.data);
  });
  chrome.storage.onChanged.addListener((chg, area) => {
    if (area === 'local' && chg.tp_rankings?.newValue) render(chg.tp_rankings.newValue);
  });
})});
