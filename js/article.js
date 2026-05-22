// Article-specific hooks stay small so the final React handoff can map them to component state.
(function () {
  document.querySelectorAll('.article-toc a').forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.article-toc a').forEach((item) => item.classList.remove('is-active'));
      link.classList.add('is-active');
    });
  });
})();
