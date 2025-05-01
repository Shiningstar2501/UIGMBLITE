// (() => {
//   // ─── helpers ────────────────────────────────────────────────
//   const qs   = (sel) => document.querySelector(sel);
//   const pick = (cond, arr) => arr.find(cond);

//   // ─── 1. Original selectors (your priority) ──────────────────
//   const scrapeOriginal = () => {
//     if (!location.pathname.includes('/place/')) return null;

//     const name  = qs('h1.DUwDvf')?.innerText.trim();
//     const lines = [...document.querySelectorAll('.Io6YTe')];
//     const address = pick(el => /\d/.test(el.innerText), lines)?.innerText;
//     const website = pick(el => el.innerText.includes('.'), lines)?.innerText;
//     const phone   = pick(el => /[0-9]{5}\s?[0-9]{5}/.test(el.innerText), lines)?.innerText;
//     const category = qs('.RcCsl')?.innerText;

//     return name ? { name, address, website, phone, category } : null;
//   };

//   // ─── 2. JSON fallback ───────────────────────────────────────
//   const scrapeJSON = () => {
//     const b = window.APP_INITIAL_STATE?.[3]?.[6]?.[0];
//     if (!b) return null;
//     return {
//       name     : b[14],
//       address  : b[39]?.[2] ?? '',
//       website  : b[7]?.[0] ?? '',
//       phone    : b[178]?.[0] ?? '',
//       category : b[13]?.[0] ?? '',
//       lat      : b[9]?.[2],
//       lng      : b[9]?.[3],
//       placeId  : b[78]
//     };
//   };

//   // ─── 3. Semantic DOM fallback ───────────────────────────────
//   const scrapeDOM = () => ({
//     name     : qs("meta[itemprop='name'], h1[jsaction] > span")?.textContent.trim(),
//     address  : qs('button[data-item-id="address"]')?.textContent.trim(),
//     phone    : qs('button[data-item-id="phone"]')?.textContent.replace(/[^\d+]/g,''),
//     website  : qs('a[data-item-id="authority"]')?.textContent.trim(),
//     category : qs('button[data-item-id="business_category"]')?.textContent.trim()
//   });

//   // merge helpers (later sources override earlier if they have data)
//   const merge = (...srcs) => {
//     const out = {};
//     for (const s of srcs) if (s)
//       for (const [k, v] of Object.entries(s)) if (v) out[k] = v;
//     return out;
//   };

//   // ─── add extra fields (lat/lng, placeId, kgId, links) ───────
//   const enrich = (d) => {
//     const href = location.href;
//     d.lat      ??= href.match(/@([\d.\-]+),/)?.[1];
//     d.lng      ??= href.match(/@[\d.\-]+,([\d.\-]+)/)?.[1];
//     d.placeId  ??= href.match(/!1s([^!]+)!/)?.[1];
//     d.kgId = d.kgId ??
//       [...document.links].find(a => a.href.includes('/g/'))?.href.split('/g/')[1]?.split('?')[0];

//     const g = 'https://www.google.com';
//     d.links = {
//       gmb: {
//         reviewList  : `${g}/local/reviews?placeid=${d.placeId}`,
//         reviewWrite : `${g}/local/writer/review?placeid=${d.placeId}`,
//         panel       : `${g}/search?kgmid=/g/${d.kgId}`,
//         post        : `${g}/search?kgmid=/g/${d.kgId}&uc=5#lpstate=pid:-1`,
//         questions   : `${g}/search?kgmid=/g/${d.kgId}&uc=5#pqa=d,2`,
//         services    : `${g}/localservices/prolist?src=2&q=${encodeURIComponent(d.name)}`,
//         products    : `${g}/search?kgmid=/g/${d.kgId}#lpc=lpc`
//       },
//       seo: {
//         cache      : `${g}/search?q=cache:${d.website}`,
//         siteSearch : `${g}/search?q=site:${d.website}`,
//         siteWeek   : `${g}/search?q=site:${d.website}&as_qdr=w`,
//         pageSpeed  : `https://developers.google.com/speed/pagespeed/insights/?url=http://${d.website}`,
//         mobile     : `https://search.google.com/test/mobile-friendly?url=http://${d.website}`,
//         schema     : `https://search.google.com/test/rich-results?url=http://${d.website}`,
//         whois      : `https://whois.domaintools.com/${d.website}`,
//         builtwith  : `https://builtwith.com/${d.website}`,
//         neilpatel  : `https://app.neilpatel.com/en/seo_analyzer/site_audit?domain=${d.website}`,
//         wayback    : `https://web.archive.org/web/*/${d.website}`
//       }
//     };
//     return d;
//   };

//   const dispatch = (d) =>
//     chrome.runtime.sendMessage({ type:'GMB_DETAILS', data:d }).catch(()=>{});

//   const run = () => {
//     if (!location.pathname.includes('/place/')) return;

//     const details = enrich(
//       merge(scrapeOriginal(), scrapeJSON(), scrapeDOM())
//     );

//     if (!details.name) {
//       console.warn('GMB scraper: no data found');
//       return;
//     }

//     // no floating panel → just send data for the Popup Info tab
//     dispatch(details);
//   };

//   // run on first load & on SPA URL change inside Maps
//   let lastURL = location.href;
//   setInterval(() => {
//     if (location.href !== lastURL) {
//       lastURL = location.href;
//       setTimeout(run, 1200);
//     }
//   }, 1000);
//   setTimeout(run, 1500);
// })();












/*  ==== legacy wrapper - now fully disabled =====================

(() => {
  // (Almost everything was already commented out, but the wrapper
  // still executed and its buildPanel() contained a bare
  // chrome.runtime.sendMessage which caused the error.)
  //
  // All legacy code stays here for reference but can’t run because
  // the entire IIFE is inside this block comment.
})();

=================================================================*/

/*  ==== current, lightweight scraper & dispatcher ============== */
(() => {
  // helpers
  const qs   = (sel) => document.querySelector(sel);
  const pick = (cond, arr) => arr.find(cond);

  // 1 — original selector set
  const scrapeOriginal = () => {
    if (!location.pathname.includes('/place/')) return null;
    const name  = qs('h1.DUwDvf')?.innerText.trim();
    const lines = [...document.querySelectorAll('.Io6YTe')];
    const address = pick(el => /\d/.test(el.innerText), lines)?.innerText;
    const website = pick(el => el.innerText.includes('.'), lines)?.innerText;
    const phone   = pick(el => /[0-9]{5}\s?[0-9]{5}/.test(el.innerText), lines)?.innerText;
    const category = qs('.RcCsl')?.innerText;
    return name ? { name, address, website, phone, category } : null;
  };

  // 2 — JSON fallback
  const scrapeJSON = () => {
    const b = window.APP_INITIAL_STATE?.[3]?.[6]?.[0];
    return !b ? null : {
      name     : b[14],
      address  : b[39]?.[2] ?? '',
      website  : b[7]?.[0] ?? '',
      phone    : b[178]?.[0] ?? '',
      category : b[13]?.[0] ?? '',
      lat      : b[9]?.[2],
      lng      : b[9]?.[3],
      placeId  : b[78]
    };
  };

  // 3 — semantic DOM fallback
  const scrapeDOM = () => ({
    name     : qs("meta[itemprop='name'], h1[jsaction] > span")?.textContent.trim(),
    address  : qs('button[data-item-id="address"]')?.textContent.trim(),
    phone    : qs('button[data-item-id="phone"]')?.textContent.replace(/[^\d+]/g,''),
    website  : qs('a[data-item-id="authority"]')?.textContent.trim(),
    category : qs('button[data-item-id="business_category"]')?.textContent.trim()
  });

  const merge = (...srcs) => {
    const out = {};
    for (const s of srcs) if (s)
      for (const [k, v] of Object.entries(s)) if (v) out[k] = v;
    return out;
  };

  const enrich = (d) => {
    const href = location.href;
    d.lat      ??= href.match(/@([\d.\-]+),/)?.[1];
    d.lng      ??= href.match(/@[\d.\-]+,([\d.\-]+)/)?.[1];
    d.placeId  ??= href.match(/!1s([^!]+)!/)?.[1];
    d.kgId     ??= [...document.links]
                    .find(a => a.href.includes('/g/'))?.href.split('/g/')[1]?.split('?')[0];

    const g = 'https://www.google.com';
    d.links = {
      gmb: {
        reviewList  : `${g}/local/reviews?placeid=${d.placeId}`,
        reviewWrite : `${g}/local/writer/review?placeid=${d.placeId}`,
        panel       : `${g}/search?kgmid=/g/${d.kgId}`,
        post        : `${g}/search?kgmid=/g/${d.kgId}&uc=5#lpstate=pid:-1`,
        questions   : `${g}/search?kgmid=/g/${d.kgId}&uc=5#pqa=d,2`,
        services    : `${g}/localservices/prolist?src=2&q=${encodeURIComponent(d.name)}`,
        products    : `${g}/search?kgmid=/g/${d.kgId}#lpc=lpc`
      },
            seo: {
              cache      : `${g}/search?q=cache:${d.website}`,
              siteSearch : `${g}/search?q=site:${d.website}`,
              siteWeek   : `${g}/search?q=site:${d.website}&as_qdr=w`,
              pageSpeed  : `https://developers.google.com/speed/pagespeed/insights/?url=http://${d.website}`,
              mobile     : `https://search.google.com/test/mobile-friendly?url=http://${d.website}`,
              schema     : `https://search.google.com/test/rich-results?url=http://${d.website}`,
              whois      : `https://whois.domaintools.com/${d.website}`,
              builtwith  : `https://builtwith.com/${d.website}`,
              neilpatel  : `https://app.neilpatel.com/en/seo_analyzer/site_audit?domain=${d.website}`,
              wayback    : `https://web.archive.org/web/*/${d.website}`
            }
    };
    return d;
  };

  const dispatch = (d) =>
    chrome.runtime.sendMessage({ type:'GMB_DETAILS', data:d }).catch(()=>{});

  const run = () => {
    if (!location.pathname.includes('/place/')) return;
    const details = enrich(merge(scrapeOriginal(), scrapeJSON(), scrapeDOM()));
    if (!details.name) return;
    dispatch(details);
  };

  // first load & SPA URL changes
  let last = location.href;
  setInterval(() => {
    if (location.href !== last) {
      last = location.href;
      setTimeout(run, 1200);
    }
  }, 1000);
  setTimeout(run, 1500);
})();
