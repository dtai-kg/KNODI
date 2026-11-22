// Menu toggle, active-link highlight and the publications list.
// The page works without JavaScript: the links stay visible and the
// publications section shows its empty-state sentence.
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  var links = nav ? Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]')) : [];

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    links.forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  var sections = links
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  function setActive(id) {
    links.forEach(function (link) {
      var active = link.getAttribute('href') === '#' + id;
      link.classList.toggle('is-active', active);
      if (active) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function update() {
    var offset = 0;
    var header = document.querySelector('.site-header');
    if (header) {
      offset = header.offsetHeight;
    }
    var marker = window.scrollY + offset + window.innerHeight * 0.3;
    var current = null;
    sections.forEach(function (section) {
      if (section.offsetTop <= marker) {
        current = section.id;
      }
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2 && sections.length) {
      current = sections[sections.length - 1].id;
    }
    if (current) {
      setActive(current);
    } else {
      links.forEach(function (link) {
        link.classList.remove('is-active');
        link.removeAttribute('aria-current');
      });
    }
  }

  if (sections.length) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          update();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    update();
  }

  // Publications: rendered from data/publications.json.
  // Each entry: { authors, title, venue, year, doi (optional), pdf (optional) }.
  var pubContainer = document.getElementById('publications-list');

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) {
      node.className = className;
    }
    if (text !== undefined) {
      node.textContent = text;
    }
    return node;
  }

  function renderPublications(entries) {
    if (!Array.isArray(entries) || entries.length === 0) {
      return; // keep the empty-state sentence already in the HTML
    }
    var list = el('ol', 'publication-list');
    entries.forEach(function (entry) {
      var item = el('li', 'publication');
      item.appendChild(el('span', 'publication-title', entry.title || ''));
      var metaParts = [];
      if (entry.authors) { metaParts.push(entry.authors); }
      if (entry.venue) { metaParts.push(entry.venue); }
      if (entry.year) { metaParts.push(String(entry.year)); }
      item.appendChild(el('div', 'publication-meta', metaParts.join('. ') + (metaParts.length ? '.' : '')));
      if (entry.doi || entry.pdf) {
        var linksDiv = el('div', 'publication-links');
        if (entry.doi) {
          var doi = el('a', null, 'DOI');
          doi.href = /^https?:\/\//.test(entry.doi) ? entry.doi : 'https://doi.org/' + entry.doi;
          doi.target = '_blank';
          doi.rel = 'noopener';
          linksDiv.appendChild(doi);
        }
        if (entry.pdf) {
          var pdf = el('a', null, 'PDF');
          pdf.href = entry.pdf;
          pdf.target = '_blank';
          pdf.rel = 'noopener';
          linksDiv.appendChild(pdf);
        }
        item.appendChild(linksDiv);
      }
      list.appendChild(item);
    });
    pubContainer.innerHTML = '';
    pubContainer.appendChild(list);
    update();
  }

  if (pubContainer && window.fetch) {
    fetch(pubContainer.getAttribute('data-src'), { cache: 'no-cache' })
      .then(function (response) { return response.ok ? response.json() : []; })
      .then(renderPublications)
      .catch(function () { /* keep the empty-state sentence */ });
  }
})();
