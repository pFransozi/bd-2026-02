const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const themeToggle = document.querySelector('.theme-toggle');

const applyTheme = (theme) => {
  const isDark = theme === 'dark';
  document.body.classList.toggle('theme-dark', isDark);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Ativar modo claro' : 'Ativar modo noturno');
    themeToggle.querySelector('.theme-icon').textContent = isDark ? '☀' : '☾';
    themeToggle.querySelector('.theme-text').textContent = isDark ? 'Modo claro' : 'Modo noturno';
  }
};

const savedTheme = localStorage.getItem('banco-dados-theme');
applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
  localStorage.setItem('banco-dados-theme', nextTheme);
  applyTheme(nextTheme);
});

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('[data-dialog-target]').forEach((button) => {
  button.addEventListener('click', () => {
    const dialog = document.getElementById(button.dataset.dialogTarget);
    if (dialog?.showModal) dialog.showModal();
  });
});

document.querySelectorAll('.image-dialog').forEach((dialog) => {
  dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
});
