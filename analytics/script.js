(function () {
  const script =
    document.currentScript || document.querySelector('script[data-analytics-url]');
  if (!script) {
    return;
  }

  const endpoint = script.dataset.analyticsUrl;
  if (!endpoint) {
    return;
  }

  const trackUrl = `${endpoint.replace(/\\/$/, '')}/track`;

  const payload = {
    path: window.location.pathname,
    referrer: document.referrer,
    title: document.title
  };

  const send = () => {
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], {
        type: 'application/json'
      });
      navigator.sendBeacon(trackUrl, blob);
      return;
    }

    fetch(trackUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      keepalive: true
    });
  };

  if (document.readyState === 'complete') {
    send();
  } else {
    window.addEventListener('load', send, { once: true });
  }
})();
