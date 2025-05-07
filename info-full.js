chrome.storage.local.get("jwt", ({ jwt }) => {
  if (!jwt) {
    window.location.href = chrome.runtime.getURL("auth.html?redirect=info-full.html");
    return;
  }


chrome.storage.local.get('gmb_details', ({ gmb_details }) => {
    const box = document.getElementById('gmb_full_box');
  
    if (!gmb_details) {
      box.innerHTML = '<p style="color: gray;">No data found. Make sure you’ve visited a Google Maps business page.</p>';
      return;
    }
  
    const {
      name, address, website, phone, category,
      lat, lng, placeId, kgId, links
    } = gmb_details;
  
    box.innerHTML = `
      <div class="row"><span class="label">Name:</span> ${name}</div>
      <div class="row"><span class="label">Address:</span> ${address}</div>
      <div class="row"><span class="label">Phone:</span> ${phone}</div>
      <div class="row"><span class="label">Website:</span> <a href="http://${website}" target="_blank">${website}</a></div>
      <div class="row"><span class="label">Category:</span> ${category}</div>
      <div class="row"><span class="label">Latitude:</span> ${lat}</div>
      <div class="row"><span class="label">Longitude:</span> ${lng}</div>
      <div class="row"><span class="label">Place ID:</span> ${placeId}</div>
      <div class="row"><span class="label">KG ID:</span> ${kgId}</div>
  
      <h2>🔗 GMB Links</h2>
      <ul>
        <li><a href="${links.gmb.reviewList}" target="_blank">Review List</a></li>
        <li><a href="${links.gmb.reviewWrite}" target="_blank">Review Request</a></li>
        <li><a href="${links.gmb.panel}" target="_blank">Knowledge Panel</a></li>
        <li><a href="${links.gmb.post}" target="_blank">GMB Post</a></li>
        <li><a href="${links.gmb.questions}" target="_blank">Q&A</a></li>
        <li><a href="${links.gmb.services}" target="_blank">Services</a></li>
        <li><a href="${links.gmb.products}" target="_blank">Products</a></li>
      </ul>
  
      <h2>🌐 SEO & External Tools</h2>
      <ul>
        <li><a href="${links.seo.cache}" target="_blank">Google Cache</a></li>
        <li><a href="${links.seo.siteSearch}" target="_blank">Content Indexed</a></li>
        <li><a href="${links.seo.siteWeek}" target="_blank">Content This Week</a></li>
        <li><a href="${links.seo.pageSpeed}" target="_blank">PageSpeed</a></li>
        <li><a href="${links.seo.mobile}" target="_blank">Mobile Friendly</a></li>
        <li><a href="${links.seo.schema}" target="_blank">Schema Test</a></li>
        <li><a href="${links.seo.whois}" target="_blank">WhoIs Lookup</a></li>
        <li><a href="${links.seo.builtwith}" target="_blank">BuiltWith Tech</a></li>
        <li><a href="${links.seo.neilpatel}" target="_blank">Neil Patel Audit</a></li>
        <li><a href="${links.seo.wayback}" target="_blank">Wayback History</a></li>
      </ul>
    `;
  });
});