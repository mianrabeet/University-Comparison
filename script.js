(function () {
  var grid = document.getElementById('dossier-grid');
  if (!grid) return;
  var cards = Array.prototype.slice.call(grid.querySelectorAll('.dossier-card'));
  var filterButtons = document.querySelectorAll('.filter-btn');
  var sortSelect = document.getElementById('dossier-sort');
  var activeFilter = 'all';

  function applyFilter() {
    cards.forEach(function (card) {
      var status = card.getAttribute('data-status');
      var show = activeFilter === 'all' || status === activeFilter;
      card.classList.toggle('is-hidden', !show);
    });
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      applyFilter();
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      var key = sortSelect.value;
      var sorted = cards.slice().sort(function (a, b) {
        if (key === 'name') {
          return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
        }
        var av = parseInt(a.getAttribute('data-' + key), 10) || 0;
        var bv = parseInt(b.getAttribute('data-' + key), 10) || 0;
        return av - bv;
      });
      sorted.forEach(function (card) { grid.appendChild(card); });
    });
  }
})();
