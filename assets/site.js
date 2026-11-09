// Portfolio interactions: theme toggle, news toggle, publication list and filter, section highlight.
(function () {
  var root = document.documentElement;

  /* ---- theme toggle ---- */
  var toggle = document.querySelector('.theme-toggle');
  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  if (toggle) toggle.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* ---- news: show all / fewer ---- */
  var newsList = document.getElementById('news-list');
  var newsBtn = document.getElementById('news-toggle');
  if (newsBtn && newsList) newsBtn.addEventListener('click', function () {
    var open = newsList.classList.toggle('expanded');
    newsBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    newsBtn.textContent = open ? 'Show fewer' : 'Show all news';
  });

  /* ---- publications ---- */
  var ME = 'L. Salsabil';
  var PUBS = [
    { y: 2026, first: true, t: 'End-to-End Contextualized URL Extraction from Scholarly Papers', a: 'L. Salsabil, R. R. Obadage, B. Banerjee, S. Alam, W. A. Ingram, E. A. Fox, J. Wu', v: 'ACM/IEEE Joint Conference on Digital Libraries (JCDL 2026)', u: 'https://doi.org/10.1145/3805696.3846039' },
    { y: 2026, first: true, t: 'Toward Preserving Open Access Datasets and Software in Scholarly Documents', a: 'L. Salsabil', v: 'Doctoral Consortium, JCDL 2026', u: 'https://doi.org/10.1145/3805696.3847135' },
    { y: 2026, t: 'URL Extraction from Scholarly Documents: A Cross-Format Comparative Analysis', a: 'R. R. Obadage, L. Salsabil, S. Alam, W. A. Ingram, B. Banerjee, E. A. Fox, J. Wu', v: 'ACM/IEEE Joint Conference on Digital Libraries (JCDL 2026)', u: 'https://doi.org/10.1145/3805696.3846023' },
    { y: 2026, t: 'A Longitudinal Panel of Open Access Data and Software URLs from PLOS Publications', a: 'W. A. Ingram, S. Peloquin, C. Dommanige, L. Salsabil, R. R. Obadage, B. Banerjee, S. Alam, J. Wu, E. A. Fox', v: 'ACM/IEEE Joint Conference on Digital Libraries (JCDL 2026)', u: 'https://doi.org/10.1145/3805696.3848484' },
    { y: 2025, first: true, t: 'Context-Based URL Classification for Open Access Datasets and Software in Scholarly Documents', a: 'L. Salsabil, R. R. Obadage, B. Banerjee, Y. Abeysinghe, S. Alam, M. Färber, W. A. Ingram, E. A. Fox, J. Wu', v: 'ACM/IEEE Joint Conference on Digital Libraries (JCDL 2025)', u: 'https://doi.org/10.1109/JCDL67857.2025.00031' },
    { y: 2025, t: 'Toward Robust URL Extraction for Open Science: A Study of arXiv File Formats and Temporal Trends', a: 'R. R. Obadage, L. Salsabil, S. Alam, B. Banerjee, W. A. Ingram, E. A. Fox, J. Wu', v: 'Web Archiving and Digital Libraries Workshop (WADL@HT 2025)', u: 'https://arxiv.org/abs/2509.04759' },
    { y: 2024, first: true, t: 'Toward Automatically Improving Metadata Quality of Electronic Theses and Dissertations at Scale', a: 'L. Salsabil, J. Wu, W. A. Ingram, E. A. Fox', v: 'IEEE International Conference on Big Data (BigData 2024)' },
    { y: 2024, first: true, t: 'ETD-MS v2.0: A Proposed Extended Standard for Metadata of Electronic Theses and Dissertations', a: 'L. Salsabil, J. Wu, E. A. Fox, W. A. Ingram, A. Pavani', v: '27th International Symposium on Electronic Theses and Dissertations (ETD 2024)', u: 'https://docs.ndltd.org/metadata/etd2024/15/index.html' },
    { y: 2024, t: 'ETDPC: A Multimodality Framework for Classifying Pages in Electronic Theses and Dissertations', a: 'M. H. Choudhury, L. Salsabil, W. A. Ingram, E. A. Fox, J. Wu', v: 'AAAI Conference on Artificial Intelligence (AAAI 2024, IAAI track)' },
    { y: 2024, t: 'Building Datasets to Support Information Extraction and Structure Parsing from Electronic Theses and Dissertations', a: 'W. A. Ingram, J. Wu, S. Y. Kahu, J. A. Manzoor, B. Banerjee, A. Ahuja, …, L. Salsabil', v: 'International Journal on Digital Libraries, 25(2)', u: 'https://doi.org/10.1007/s00799-024-00395-4' },
    { y: 2023, award: 'Best Short Paper', t: 'MetaEnhance: Metadata Quality Improvement for Electronic Theses and Dissertations of University Libraries', a: 'M. H. Choudhury, L. Salsabil, H. R. Jayanetti, J. Wu, W. A. Ingram, E. A. Fox', v: 'ACM/IEEE Joint Conference on Digital Libraries (JCDL 2023)', u: 'https://doi.org/10.1109/JCDL57899.2023.00019' },
    { y: 2023, t: "It's Not Just GitHub: Identifying Data and Software Sources Included in Publications", a: 'E. Escamilla, L. Salsabil, M. Klein, J. Wu, M. C. Weigle, M. L. Nelson', v: 'Theory and Practice of Digital Libraries (TPDL 2023)' },
    { y: 2022, first: true, t: 'A Study of Computational Reproducibility using URLs Linking to Open Access Datasets and Software', a: 'L. Salsabil, J. Wu, M. H. Choudhury, W. A. Ingram, E. A. Fox, S. M. Rajtmajer, C. L. Giles', v: 'Companion Proceedings of The Web Conference (WWW 2022)', u: 'https://doi.org/10.1145/3487553.3524658' },
    { y: 2022, t: 'Theory Entity Extraction for Social and Behavioral Sciences Papers using Distant Supervision', a: 'X. Wei, L. Salsabil, J. Wu', v: 'ACM Symposium on Document Engineering (DocEng 2022)', u: 'https://dl.acm.org/doi/10.1145/3558100.3563855' }
  ];

  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  var host = document.getElementById('pubs');
  function render(filter) {
    if (!host) return;
    var list = PUBS.filter(function (p) { return filter === 'first' ? p.first : true; });
    var html = '', year = null;
    list.forEach(function (p) {
      if (p.y !== year) {
        if (year !== null) html += '</ol>';
        year = p.y;
        html += '<h3 class="pub-year">' + year + '</h3><ol class="pubs">';
      }
      var title = p.u ? '<a href="' + p.u + '">' + esc(p.t) + '</a>' : esc(p.t);
      var authors = esc(p.a).replace(ME, '<strong>' + ME + '</strong>');
      html += '<li><span class="pub-title">' + title + '</span>' +
        '<span class="pub-authors">' + authors + '</span>' +
        '<span class="pub-venue">' + esc(p.v) + (p.award ? '<span class="award">' + p.award + '</span>' : '') + '</span></li>';
    });
    host.innerHTML = html + '</ol>';
  }
  render('all');
  document.querySelectorAll('.chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      document.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
      chip.setAttribute('aria-pressed', 'true');
      render(chip.getAttribute('data-filter'));
    });
  });

  /* ---- highlight the section in view ---- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  if ('IntersectionObserver' in window && links.length) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && byId[e.target.id]) {
          links.forEach(function (a) { a.removeAttribute('aria-current'); });
          byId[e.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(byId).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }
})();
