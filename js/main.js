(function() {
  var style = document.createElement('style');
  style.innerHTML = `
    .lazy-load-js, .lazy-load-img {
      opacity: 0;
      transition: opacity 0.8s ease;
    }
    .lazy-load-js.is-visible, .lazy-load-img.is-visible {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);
})();

document.addEventListener('DOMContentLoaded', function() {
  // Sélectionner les sections à fade-in ET les images à fade-in
  var lazyEls = Array.prototype.slice.call(document.querySelectorAll('.lazy-load-js'));
  var lazyImgs = Array.prototype.slice.call(document.querySelectorAll('img.lazy-load-img'));

  if ('IntersectionObserver' in window) {
    // Traitement pour sections et images
    var observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          setTimeout(function() {
            entry.target.classList.add('is-visible');
            // Pour les images, on déclenche le chargement si l'attribut "data-src" existe
            if (entry.target.tagName === 'IMG' && entry.target.dataset.src) {
              entry.target.src = entry.target.dataset.src;
            }
          }, 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      // Le % de visibilité déclenchant le fade-in
      threshold: 0.2
    });

    lazyEls.forEach(function(el) {
      observer.observe(el);
    });
    lazyImgs.forEach(function(img) {
      observer.observe(img);
    });
  } else {
    // Fallback : fade-in direct & chargement immédiat images
    lazyEls.forEach(function(el) {
      el.classList.add('is-visible');
    });
    lazyImgs.forEach(function(img) {
      img.classList.add('is-visible');
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  }
});
