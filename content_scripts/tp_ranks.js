(() => {
  const scrape = () => {
    const cards = [...document.querySelectorAll('.Nv2PK')];
    const rankings = cards.map((c, i) => ({
      rank: i + 1,
      name: c.querySelector('.qBF1Pd')?.textContent.trim() || '—'
    }));

    // ➜ persist for Teleport
    chrome.storage.local.set({ tp_rankings: rankings });

    // ➜ live push for open Teleport tab
    chrome.runtime.sendMessage({ type: 'TP_RANKINGS', data: rankings });

    console.table(rankings);
  };
  setTimeout(scrape, 3000);
})();
