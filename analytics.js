/* Google Analytics 4 for the press kit.
 *
 * Set MEASUREMENT_ID to the "G-XXXXXXXXXX" of the GA4 web data stream for
 * happycode.studio. Until a real id is set nothing loads and no request is
 * made, so shipping this file with the placeholder tracks nobody.
 *
 * Events, on top of the automatic page_view:
 *   file_download  — press-kit.zip, the gameplay clip, the vector logo
 *   asset_view     — a screenshot or brand image opened in its own tab
 *   outbound_click — App Store, GitHub, Facebook, the privacy policy
 *   contact_click  — the mailto: press address
 *   nav_click      — the in-page header links
 */
(function () {
  var PLACEHOLDER = 'G-XXXXXXXXXX';
  var MEASUREMENT_ID = window.GA_MEASUREMENT_ID || PLACEHOLDER;
  // The placeholder is all A-Z, so it satisfies the shape check on its own —
  // reject it by identity or the unconfigured page ships hits to a dead id.
  if (MEASUREMENT_ID === PLACEHOLDER) return;
  if (!/^G-[A-Z0-9]{6,}$/.test(MEASUREMENT_ID)) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID);

  var tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
  document.head.appendChild(tag);

  // GA's own file_download list covers archives and video but not images, so
  // an opened screenshot is reported separately rather than inflating downloads.
  var DOWNLOAD = /\.(zip|mp4|mov|pdf|svg)$/i;
  var IMAGE = /\.(png|webp|jpe?g|gif)$/i;

  function label(a) {
    // aria-label first: a tile whose caption, badge and glyph are separate
    // nodes reads back as one run-on string otherwise.
    return (a.getAttribute('aria-label') || a.textContent || '')
      .trim().replace(/\s+/g, ' ').slice(0, 100);
  }

  // Delegated and in the capture phase: the page's runtime re-renders its own
  // DOM, so a listener bound to individual anchors would not survive.
  document.addEventListener('click', function (ev) {
    var el = ev.target;
    var a = el && el.closest ? el.closest('a[href]') : null;
    if (!a) return;

    var raw = a.getAttribute('href') || '';
    var url;
    try { url = new URL(a.href, location.href); } catch (e) { return; }
    var text = label(a);

    if (raw.charAt(0) === '#') {
      gtag('event', 'nav_click', { section: raw.slice(1), link_text: text });
      return;
    }
    if (url.protocol === 'mailto:') {
      gtag('event', 'contact_click', { link_url: a.href, link_text: text });
      return;
    }

    var name = decodeURIComponent(url.pathname.split('/').pop() || '');
    var hit = name.match(DOWNLOAD);
    if (hit) {
      gtag('event', 'file_download', {
        file_name: name,
        file_extension: hit[1].toLowerCase(),
        link_url: a.href,
        link_text: text
      });
      return;
    }
    if (IMAGE.test(name)) {
      gtag('event', 'asset_view', { asset_name: name, link_url: a.href });
      return;
    }
    if (url.host !== location.host) {
      gtag('event', 'outbound_click', {
        link_url: a.href, link_domain: url.host, link_text: text
      });
    }
  }, true);
})();
